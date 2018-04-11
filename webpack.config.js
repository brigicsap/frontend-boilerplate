const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './assets/js/app.js',
    output: {
        path: `${__dirname}/public/`,
        filename: '_js/main.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    },
                    {
                        loader: 'eslint-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                output: { path: './' }
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Shed front end boilerplate',
            template: './assets/index.html',
            filename: './index.html',
            meta: {
                viewport: 'width=device-width, initial-scale=1'
            },
            minify: {
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: '_css/[name].css',
            allChunks: true
        }),
        new StyleLintPlugin({
            files: ['**/*.s?(a|c)ss'],
            syntax: 'scss'
        }),
        new UglifyJsPlugin({
            cache: true,
            sourceMap: true,
            parallel: true
        })
    ],
    devServer: {
        contentBase: './public'
    },
    watchOptions: {
        poll: true
    }
};
