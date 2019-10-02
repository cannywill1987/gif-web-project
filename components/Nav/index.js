import React from 'react'
import styles from './style/index.scss'

class Nav extends React.Component {
    constructor(props) {
        super(props)
    }

    // 在componentDidUpdate中进行异步操作，驱动数据的变化
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    render() {
        return (
            <a href={"/home"}>
                <div className={styles["nav"]}>
                    <div className={styles["container"]}>
                        <img src="http://pics.520qiubite.com/gif_bg_logo.jpg" className={styles["logo"]}/>
                    </div>
                </div>
            </a>
        )
    }
}

export default Nav