import React, {Component} from 'react'
import {getDetailListByCid} from '../../apis'
import WaterfallLayout from "../../components/WaterfallLayout"
import _ from "lodash"
import styles from "./styles.scss";
import {connect} from 'react-redux';

class IndexPage extends Component {
    state = {
        pageInit: false,
    };

    constructor(props) {
        super(props)
        // console.log(props);
        console.log(process.browser);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.isInit) {
            return {
                isInit: _.get(nextProps.getDetailListByCid, "status", -1) === 0, //必须要这样判断 因为有可能prefetchAPI还没执行完就执行了 数据请求成功证明有数据下次不需要请求
                getDetailListByCid: _.get(nextProps.getDetailListByCid, "data", {}), //个人排名
            };
        }
        return null;
    }


    // 在componentDidUpdate中进行异步操作，驱动数据的变化
    componentDidUpdate() {
    }

    componentDidMount() {
    }

    onToggleShowModal(e) {
    }

    render() {
        const {getDetailListByCid = []} = this.state;
        let datasToShow = [];
        _.forEach(getDetailListByCid, function (item) {
            datasToShow.push({url:"http://smallgif.520qiubite.com/80-" + item.imgUrlBigQiniu,width:parseInt(item.width),height: parseInt(item.height), color: "#" + (parseInt(Math.random() * 16777215)).toString(16)});
            // total.push({url:item.imgUrlSmallQiniu,width:item.width,height: item.height})
        })

        const defaultProps = {
            columns: 2,
            columnWidth: 340,
            gutter: 5,
            items: datasToShow 
        };
        return (
            <>
                <div className={styles["example"]}></div>
                <WaterfallLayout {...defaultProps}/>
            </>
        )
    }
}

IndexPage.getInitialProps = async ({req}) => {
    const res = await getDetailListByCid()
    if (res) {
        return {
            getDetailListByCid:res.data
        };
    } else {
        return {};
    }
}

//链接方式 下面的key如datas其实就是props
const mapState = (state) => ({
})

//下面这个更像是click执行的函数
const mapDispatch = (dispatch) => ({})

// export default connect(mapState, mapDispatch)(IndexPage)
export default IndexPage;