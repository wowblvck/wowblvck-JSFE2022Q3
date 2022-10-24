const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ghpages = require('gh-pages');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
    entry: ["@babel/polyfill", path.resolve(__dirname, 'src', 'index.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
        assetModuleFilename: 'assets/[name][ext]'
    },
    devServer: {
        open: true,
        port: 3000,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new ESLintPlugin({fix: true}),
        // new WebpackObfuscator({rotateStringArray: true})
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.m?js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/i,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                              progressive: true,
                            },
                            optipng: {
                              enabled: false,
                            },
                            pngquant: {
                              quality: [0.65, 0.90],
                              speed: 4
                            },
                            gifsicle: {
                              interlaced: false,
                            },
                            webp: {
                              quality: 75
                            }
                        }
                    }
                ],
                type: 'asset/resource',
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            },
            {
                test: /\.(mp3|wav|aac)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/sounds/[name][ext]'
                }
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.target = 'browserslist';

        config.plugins.push(new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }));

        config.plugins.push(new WebpackObfuscator({
            rotateStringArray: true
        }));

        ghpages.publish('dist', {
            dest: 'gem-puzzle',
            message: 'build: gem-puzzle production'
        });
        
    } else {
        config.mode = 'development';
        config.target = 'web';
        config.devtool = 'source-map';
    }
    return config;
};
