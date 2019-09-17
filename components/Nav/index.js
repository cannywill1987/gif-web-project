import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Wrapper = styled.nav`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  background: #387EF5;
  a {
    padding: 0 15px;
    color: #FFF;
  }
`
class Nav extends React.Component {
    constructor(props) {
        super(props)

    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     const {type} = nextProps;
    //     // 当传入的type发生变化的时候，更新state
    //     if (type !== prevState.type) {
    //         return {
    //             type,
    //         };
    //     }
    //     // 否则，对于state不进行任何操作
    //     return {type:true};
    // }


    // 在componentDidUpdate中进行异步操作，驱动数据的变化
    componentDidUpdate() {
        console.log('componentDidUpdate');
        // this._loadAsyncData({...this.state});
    }

    render() {
        return (<Wrapper>
            <Link href='/'><a>首页</a></Link> |
            <Link href='/about' prefetch><a>关于我们</a></Link> |
            <Link href='/contact' prefetch><a>联系我们</a></Link>
        </Wrapper>)
    }
}
// const Nav = () => {
//     return (<Wrapper>
//         <Link href='/'><a>首页</a></Link> |
//         <Link href='/about' prefetch><a>关于我们</a></Link> |
//         <Link href='/contact' prefetch><a>联系我们</a></Link>
//     </Wrapper>)
// }

export default Nav