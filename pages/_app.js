import App, {Container} from 'next/app'
import React from 'react'

export default class MyApp extends App {
    /**
     * APP的getInitialProps三个参数, Component要初始化渲染的组件 默认是Index.js
     * Component.getInitialProps 调用 Index.js 的静态getInitalProps方法把ctx传入
     * @param Component
     * @param router
     * @param ctx
     * @returns {Promise<{pageProps}>}
     */
    static async getInitialProps ({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        console.log('MyApp getInitialProps');
        return {pageProps}
    }

    constructor() {
        super();
    }

    componentDidCatch(error, info) {
        console.error(error);
    }

    render () {
        //Component这里是index.js
        //props这里是{posts: [{title: 12, body: '12'}]}
        const {Component, pageProps} = this.props
        return <Container>
            <Component {...pageProps} />
        </Container>
    }
}