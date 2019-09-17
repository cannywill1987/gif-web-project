import Head from 'next/head'
import Wrapper from './Wrapper'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default ({ children, title = 'This is the default title' }) => {
    return (<Wrapper>
        <Head>
            <title>{ title }，简单教程，简单编程</title>
        </Head>
        <header>
            <Nav />
        </header>

        <main>
            { children }
        </main>

        <Footer>
            简单教程，编程入门第一站
        </Footer>
    </Wrapper>);
}