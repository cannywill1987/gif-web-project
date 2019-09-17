import React from 'react'
import {ThemeContext2} from '../../commons/ThemeContext2';

class ThemeTogglerButton2 extends React.Component {
    static contextType = ThemeContext2;

    constructor(props) {
        super(props);
    }
    // Theme Toggler 按钮不仅仅只获取 theme 值，它也从 context 中获取到一个 toggleTheme 函数
    render() {
        console.log("ThemeTogglerButton2:" + this.context);
        return (
                    <button>
                        {/*// onClick={toggleTheme}*/}
                        {/*// style={{backgroundColor: theme.background}}>*/}

                        Toggle Theme
                    </button>
        );
    }
}

export default ThemeTogglerButton2;