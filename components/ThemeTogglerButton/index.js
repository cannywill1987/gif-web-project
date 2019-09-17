import React from 'react'
import {ThemeContext} from '../../commons/ThemeContext';

/**
 * 用于测试ThemeContext
 * @returns {*}
 * @constructor
 */
function ThemeTogglerButton() {
    // Theme Toggler 按钮不仅仅只获取 theme 值，它也从 context 中获取到一个 toggleTheme 函数
    return (
        <ThemeContext.Consumer>
            {({theme, toggleTheme}) => {
               console.log('ThemeTogglerButton' + theme);
               return <button
                    onClick={toggleTheme}
                    style={{backgroundColor: theme.background}}>

                    Toggle Theme
                </button>
            }}
        </ThemeContext.Consumer>
    );
}

export default ThemeTogglerButton;