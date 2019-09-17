import React from "react";
import styles from "./style/index.scss";
import PropTypes from "prop-types";
import _ from "lodash";
import AvatarImage from "../../components/AvatarImage";
import { getRandomMobiles } from "../../Utility";

const imgSrcs = [
  require("./images/ic_avatar_a.png"),
  require("./images/ic_avatar_b.png"),
  require("./images/ic_avatar_c.png"),
  require("./images/ic_avatar_d.png"),
  require("./images/ic_avatar_e.png"),
];
/**
 * lzb 轮播控件
 * 文字可以上下按照一定时间间隔轮播
 */
export default class TextCarouselSwitcher extends React.Component {
  static propTypes = {
    height: PropTypes.string,
    fontSize: PropTypes.string,
    datas: PropTypes.array,
    waitTimestamp: PropTypes.number,
    color: PropTypes.string,
    language: PropTypes.string,
  };

  static defaultProps = {
    fontSize: "0.1rem",
    height: "0.4rem",
    color: "#a5a5c2",
    waitTimestamp: 1000,
    datas: [],
    language: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      marginTop: 0,
      datas: props.datas,
    };
  }

  componentDidMount() {
    this.startAnim(this);
    this.getRandomMobileMessages();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(nextProps, this.props) && _.isEqual(nextProps, this.state)) {
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate() {
    this.startAnim(this);
  }

  componentWillUnmount() {
    this.isComponentUnmount = true;
    this.timeId && clearTimeout(this.timeId);
    this.animationFrameId && cancelAnimationFrame(this.animationFrameId);
  }

  getRandomMobileMessages = async () => {
    if (this.state.datas.length > 0) return;
    let self = this;
    let randomMobiles = await getRandomMobiles(this.props.language, 15, true);
    var arr = [];
    _.forEach(randomMobiles, function(item) {
      arr.push({
        // avatar: imgSrcs[Math.floor(Math.random() * imgSrcs.length)],
        avatar: imgSrcs[1],
        content: item,
        time: self.props.t("XX分钟前抢到大礼包", { time: Math.floor(Math.random() * 9 + 1) }),
        // time: ""
      });
    });
    this.setState({ datas: arr });
  };

  isComponentUnmount = false;

  timeId = null; //主要用于停止动画

  animationFrameId = null;

  //主要用于停止动画
  animate = null;

  startPercent = 0;

  /**
   * 通过百分比来设置margin-top
   * 一轮动画结束可以把datas 第一个换到最后一个
   * 等waitTimestamp时间间隔结束后就可以执行下一轮了
   */
  startAnim = self => {
    if (self.animate) return;
    if (self.ulRef && self.ulRef.children.length > 0 && !self.animationFrameId) {
      let itemHeight = self.ulRef.children[0].clientHeight;
      const percent = self.startPercent;
      const targetPercent = 100;
      const speed = (targetPercent - percent) / 1000;
      let start = null;
      this.animate = timestamp => {
        if (self.isComponentUnmount === true) return;
        if (!start) start = timestamp; //start为参考时间
        const progress = timestamp - start; //progress是当前进行的时间戳
        const currentProgress = Math.min(parseInt(speed * progress + percent, 10), targetPercent); //当前动画执行的百分比
        if (currentProgress < targetPercent) {
          self.setState({
            marginTop: -(itemHeight / 100.0) * currentProgress, //根据百分比执行需要执行的动画
          });
          self.animationFrameId = window.requestAnimationFrame(self.animate);
        } else {
          //重置起始参考时间和百分比 执行下一轮动画
          self.startPercent = 0;
          start = null;
          self.setState({
            marginTop: 0,
            datas: _.concat(_.drop(self.state.datas), _.head(self.state.datas)),
          });
          self.timeId = setTimeout(function() {
            self.animationFrameId = window.requestAnimationFrame(self.animate);
          }, self.props.waitTimestamp);
        }
      };
      window.requestAnimationFrame(self.animate);
    }
  };

  render() {
    if (this.state.datas.length > 0) {
      const datas = _.slice(this.state.datas, 0, this.state.datas.length > 10 ? 10 : this.state.datas.length);

      return (
        <section className={styles["al-marqueeBox"]}>
          <div
            className={styles["al-marquee"]}
            style={{
              height: this.props.height,
              lineHeight: this.props.height,
              fontSize: this.props.fontSize,
              color: this.props.color,
            }}
          >
            <ul ref={el => (this.ulRef = el)} style={{ marginTop: this.state.marginTop + "px" }}>
              {datas.map(function(item, index) {
                return (
                  <li key={index}>
                    <div>
                      <img
                        src={item.avatar}
                        style={{
                          display: "block",
                          width: "0.24rem",
                          height: "0.24rem",
                          margin: "auto 0.04rem 0 0.025rem",
                          borderColor: "#b22018",
                        }}
                      />
                      {/*<img src={imgSrcs.ic_avatar_a} />*/}
                    </div>
                    <div className={styles["content"]}>{item.content + item.time}</div>
                    {/*<div className={styles["time"]}>{item.time}</div>*/}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      );
    } else {
      return null;
    }
  }
}
