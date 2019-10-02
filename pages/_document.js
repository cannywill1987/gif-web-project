import Document, { Head, Main, NextScript } from 'next/document'
// import { renderToString } from 'react-dom/server'

import { ServerStyleSheet } from 'styled-components'
import {GlobalStyle} from '../styles/global-styles';

export default class SiteDocument extends Document {
    render () {
        // console.log('SiteDocument render()');
        const sheet = new ServerStyleSheet()
        //这是服务端用的 ServerStyleSheet
        const main = sheet.collectStyles(<Main />)
        const styleTags = sheet.getStyleElement()
        return (
            <html>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {styleTags}
            </Head>
            <body>
                <div>
                    <Main />
                </div>
                {/*<div>copyright &copy; 简单教程，简单编程</div>*/}
                <NextScript />
                <GlobalStyle />
            </body>
            </html>
        )
    }
}