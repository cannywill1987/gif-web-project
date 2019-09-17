import React from 'react'
import {ThemeContext2} from '../../commons/ThemeContext2';
import {ThemeContext} from '../../commons/ThemeContext';
class ThemeTogglerButton3 extends React.Component {
    static contextType = ThemeContext;

    constructor(props) {
        super(props);
    }
    // Theme Toggler 按钮不仅仅只获取 theme 值，它也从 context 中获取到一个 toggleTheme 函数
    render() {
        // console.log("ThemeTogglerButton3:" + this.context);
        return (
            <ThemeContext.Consumer>
                {({theme}) => {
                    console.log('ThemeTogglerButton3' + theme);
                    return <button>

                        Toggle Theme
                    </button>
                }}
            </ThemeContext.Consumer>
        );
    }
}

export default ThemeTogglerButton3;