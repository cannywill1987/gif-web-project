// ./pages/index.js
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import dynamic from 'next/dynamic'

import Layout from '../layouts/Main';
import {ThemeContext, themes} from '../common/ThemeContext'
import {ThemeContext2} from '../common/ThemeContext2'
// import {getPosts} from '../api/posts'
import Post from '../components/Post'
import ThemeTogglerButton from '../components/ThemeTogglerButton'
// import ModalContainer from '../components/ModalContainer'
// import SiteDocument from '../pages/_document'
// import ThemeTogglerButton3 from "../components/ThemeTogglerButton3";
// import { Link } from '../routes'
const ModalContainer = dynamic(import('../components/ModalContainer'), {
    ssr: false
})
// class SharePanel extends React.PureComponent {
//     render() {
//         console.log("SharePanel is:" + SharePanel);
//         return ReactDOM.createPortal(this.props.children, document.body);
//     }
// }

class IndexPage extends Component {
    state = {
        pageInit: false,
    };

    constructor() {
        super()
        this.toggleTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }));
        };
        this.state = {
            theme: 'Hello',
            toggleTheme: this.toggleTheme,
            showModal: false
        }

        this.onToggleShowModal = this.onToggleShowModal.bind(this);
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        const {type} = nextProps;
        // 当传入的type发生变化的时候，更新state
        if (type !== prevState.type) {
            return {
                type,
            };
        }
        // 否则，对于state不进行任何操作
        return {type:true};
    }


    // 在componentDidUpdate中进行异步操作，驱动数据的变化
    componentDidUpdate() {
        console.log('componentDidUpdate');
        // this._loadAsyncData({...this.state});
    }

        componentDidMount() {
        this.setState({
            pageInit: true,
        });
    }

    onToggleShowModal(e) {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    render() {
        const {pageInit} = this.state;
        const {posts, type} = this.props;
        return (
            <ThemeContext.Provider value={this.state}>
                <ThemeContext2.Provider value='red'>
                    {/*<ThemeTogglerButton3/>*/}
                    {/*<ThemeTogglerButton2 />*/}
                    <button onClick={this.onToggleShowModal}>显示modal</button>
                    <ThemeTogglerButton/>
                    <Layout>
                        <ul>
                            {posts.map((p, inx) => {
                                return <Post key={inx} post={p}/>
                            })}
                        </ul>
                    </Layout>
                    {/*{this.state.showModal ? <ModalContainer></ModalContainer> : null}*/}
                    {`type is ${type}`}
                    {this.state.showModal &&
                    <ModalContainer>
                        123445646546
                    </ModalContainer>
                    }
                </ThemeContext2.Provider>
            </ThemeContext.Provider>

        )
    }
}

// const IndexPage = ({posts}) => {
//     return (
//         <ThemeContext.Provider>
//             <Layout>
//                 <ul>
//                     {posts.map((p, inx) => {
//                         return <Post key={inx} post={p}/>
//                     })}
//                 </ul>
//             </Layout>
//         </ThemeContext.Provider>
//     )
// }

IndexPage.getInitialProps = async ({req}) => {
    // const res = await getPosts()
    // const json = await res.json()
    // return { posts: json }
    return {posts: [{title: 12, body: '12'}]};
}

export default IndexPage
