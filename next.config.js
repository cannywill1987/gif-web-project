// next.config.js
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css');
const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
const webpack = require('webpack');
const path = require("path");
const SRC_PATH = path.resolve(__dirname + "/");
const srcPath = path.resolve(__dirname);
// console.log(__dirname);
const WithSass = withSass({
    /* config options here */
    cssModules: true,
    // postcssLoaderOptions: {
    //     parser: true,
    //     config: {
            // ctx: {
            //     theme: JSON.stringify(process.env.REACT_APP_THEME)
            // }
        // }
    // },
    webpack(config, { dev, isServer, buildId, defaultLoaders }) {
        // 编译时常量
        config.plugins.push(new webpack.DefinePlugin({
            'process.dev': JSON.stringify(!!dev),
            'process.browser': JSON.stringify(!isServer),
            'process.server': JSON.stringify(!!isServer),
            'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV || 'local'),
            'process.env.BUILD_MODE': JSON.stringify(process.env.BUILD_MODE || config.mode || 'export'),
            'process.env.ROUTER_BASE': JSON.stringify(config.routerBase),
            'process.env.CDN_PREFIX': JSON.stringify(config.cdnPrefix)
        }));
        // 约束和调整 webpack 行为
        if (!isServer) {
            // console.log(config.module.rules);
            config.module.rules.forEach(rule => {
                // 不严谨，假定 test 一定是正则 "/\.scss$/"
                if (/\\\.(css|less|scss|sass)\$\//.test(rule.test + '') && Array.isArray(rule.use)) {
                    // console.log("22222222222");
                    const postcssLoaderIndex = rule.use.findIndex(x => x && x.loader === 'postcss-loader');
                    if (postcssLoaderIndex !== -1) {
                        // 已存在 postcss-loader
                        // 目前理解是，存在 postcss-loader，实现该 rule 与其他 rule 共用了配置对象，不再操作
                    }
                    else {
                        // console.log("11111111");
                        const cssLoaderIndex = rule.use.findIndex(x => x && x.loader === 'css-loader');
                        if (cssLoaderIndex !== -1) {
                            // console.log("4444444444");
                            rule.use[cssLoaderIndex].options.importLoaders++;
                            rule.use.splice(cssLoaderIndex + 1, 0, {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        require('postcss-flexbugs-fixes'),
                                        require('autoprefixer')({
                                        }),
                                        require('cssnano')({
                                            preset: 'default'
                                        })
                                    ]
                                }
                            });
                        }
                    }
                }
            });
        }
        return config
    },
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]__[hash:base64]'
    },
    //感觉下面这个没起作用
    resolve: {
        root: path.resolve(SRC_PATH),
        alias: {
            "~": SRC_PATH,
            "@": SRC_PATH,
            "@common": path.join(srcPath, "legacy", "common"), // 仅作历史业务支持，请勿在业务使用
        },
    },
})

// 加了这个就可以支持 import './style/test.css';这种写法了
const WithCss = withCSS(WithSass);
module.exports = WithCss;