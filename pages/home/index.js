import React, {Component} from 'react'
import {getDetailListByCid} from '../../apis'
import WaterfallLayout from "../../components/WaterfallLayout"
import Nav from "../../components/Nav"
import Cookies from 'js-cookie'
import Head from 'next/head'


import _ from "lodash"
import {connect} from 'react-redux';
import {actionCreators} from './redux';



class IndexPage extends Component {
    state = {
        pageInit: false,
    };

    constructor(props) {
        super(props)
        this.onClickGoToDetailPage = this.onClickGoToDetailPage.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.isInit) {
            debugger;
            return {
                isInit: _.get(nextProps.getDetailListByCid, "success", false), //必须要这样判断 因为有可能prefetchAPI还没执行完就执行了 数据请求成功证明有数据下次不需要请求
                getDetailListByCid: _.get(nextProps.getDetailListByCid, "data", {}), //个人排名
            };
        }
        return null;
    }


    // 在componentDidUpdate中进行异步操作，驱动数据的变化
    componentDidUpdate() {
    }

    componentDidMount() {
        // scroll event

    }

    componentWillUnmount() {

    }

    onToggleShowModal(e) {
    }

    onClickGoToDetailPage(id) {
        // Router.push('/detail')
        // Router.push({
        //     pathname: '/detail',
        //     query: {
        //         id: id
        //     }
        // })

    }

    async onClick() {
        this.page += 1;
        const res = await getDetailListByCid({cid:29, page:this.page, beginId: 137412})
        this.setState({
            getDetailListByCid: _.concat(this.state.getDetailListByCid, _.get(res, "data.data", []))
        }, function () {
            debugger;
        })
    }

    page = 1;

    render() {
        const {getDetailListByCid = []} = this.state;
        let datasToShow = [];
        _.forEach(getDetailListByCid, function (item) {
            datasToShow.push({
                id: item.id,
                url: "http://smallgif.520qiubite.com/80-" + item.imgUrlBigQiniu,
                width: parseInt(item.width),
                height: parseInt(item.height),
                content: item.contents || "",
                // title: item
                color: "#" + (parseInt(Math.random() * 16777215)).toString(16)
            });
        })
        getDetailListByCid && getDetailListByCid.length && Cookies.set('id', getDetailListByCid[getDetailListByCid.length-1].id);;
        const defaultProps = {
            columns: 4,
            columnWidth: 240,
            gutter: 20,
            items: datasToShow,
        };
        console.log(datasToShow);
        return (
            <>
                <Head>
                    <title>My page title</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Nav />
                <WaterfallLayout marginTop={10} stypeProps={{margin: "0 auto"}} {...defaultProps} onClickItem={(id)=>{this.onClickGoToDetailPage(id)}} onEndReach={(e) => {
                    this.onClick()
                }}/>
            </>
        )
    }
}

IndexPage.getInitialProps = async ({req}) => {
    let beginId = 1;
    if (req) {
        beginId = req.ctx.cookies.get("id") || 1;
    }
    const res = await getDetailListByCid({cid:29, page:1, beginId: beginId})
    if (res) {
        return {
            getDetailListByCid: res.data
        };
    } else {
        return {};
    }
}

//链接方式 下面的key如datas其实就是props
const mapState = (state) => ({})

//下面这个更像是click执行的函数
const mapDispatch = (dispatch) => ({
    requestDetail() {
        dispatch(actionCreators.requestDetail());
    },
})

// export default connect(mapState, mapDispatch)(IndexPage)
export default connect(mapState, mapDispatch)(IndexPage);