import App, {Container} from 'next/app'
import React from 'react'
import store from '../redux/index'
// import {
//     createStore,
//     applyMiddleware,
//     compose
// } from "redux";
import {Provider} from 'react-redux';
// import withReduxStore from '../lib/with-redux-store'

class MyApp extends App {
    /**
     * APP的getInitialProps三个参数, Component要初始化渲染的组件 默认是Index.js
     * Component.getInitialProps 调用 Index.js 的静态getInitalProps方法把ctx传入
     * @param Component
     * @param router
     * @param ctx
     * @returns {Promise<{pageProps}>}
     */
    static async getInitialProps({Component, router, ctx}) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        // console.log('MyApp getInitialProps');
        return {pageProps}
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.Component !== prevState.Component
    //         || nextProps.pageProps !== prevState.pageProps
    //         || nextProps.router !== prevState.router) {
    //         return {
    //             Component: nextProps.Component,
    //             pageProps: nextProps.pageProps,
    //             router: nextProps.router
    //         };
    //     }
    //     return null;
    // }


    constructor() {
        super();
    }

    componentDidCatch(error, info) {
        console.error(error);
    }

    render() {
        //Component这里是index.js
        //props这里是{posts: [{title: 12, body: '12'}]}
        const {Component, pageProps, router} = this.props
        // title={RouterTitle[router.pathname]}
        return <Container>
            {/*<Layout>*/}
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
            {/*</Layout>*/}
        </Container>
    }
}

export default MyApp
