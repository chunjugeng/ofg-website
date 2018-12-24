const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');//单独打包css
const autoprefixer = require('autoprefixer');
const CleanPlugin = require('clean-webpack-plugin');
const pkg = require('./package.json');
const dist = getPath('./dist');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const port = pkg.dev.port;


function getPath(dir) {
    return path.resolve(__dirname, dir);
}
let config = {
    mode: process.env.NODE_ENV,
    devtool: isDev ? 'source-map' : false,
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'classnames', 'styled-components'],
        main: ['babel-polyfill', getPath('./src/main')]
    },
    output: {
        path: dist,
        chunkFilename: '[name].[chunkhash].js',
        filename: isDev ? '[name].js' : '[name].[chunkhash].js',
        publicPath: isDev ? '/' : `//h5-test.fastdhan.in/official-website`
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    plugins: [                                         
                        ['import',{libraryName: "antd", style: 'css'}]   //按需加载样式
                    ]                                                   
                }
            },
            {
                test: /\.(css|less)$/,
                use: [
                    { loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        // options: {
                        //     javascriptEnabled: true,
                        //     importLoaders: 1
                        // }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            // javascriptEnabled: true,
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                                    flexbox: 'no-2009'
                                })
                            ]
                        }
                    },
                    {
                        loader: 'less-loader', 
                        options: {
                            javascriptEnabled: true,
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: './images/[name].[hash:8].[ext]',
                        limit: isProd ? 1000 : 1
                    }
                }
            },
            {
                test: /\.(ttf|otf|woff|woff2|eot)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: './fonts/[name].[ext]',
                        limit: 8192
                    }
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                type: 'javascript/auto'
            }
        ]
    },
    plugins: [
        new CleanPlugin([dist]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            favicon: path.resolve('favicon.ico'),
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '~': path.resolve(__dirname, './src')
        }
    },
    optimization: {
		splitChunks: {
            chunks: 'all',
        }
    }
}
if (isDev) {
    config.devServer = {
        disableHostCheck: true,
		contentBase: dist,
        host: '0.0.0.0',
        port: port,
        hot: true,
        useLocalIp: true
    }
}

module.exports = config;