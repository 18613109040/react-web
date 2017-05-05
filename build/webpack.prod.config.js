const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')

const theme = require('../client/assets/theme');
const styleExtractor = new ExtractTextPlugin('css/styles.css',{allChunks:true});
const libExtractor = new ExtractTextPlugin('css/lib.css',{allChunks:true});
let clientConfig, serverConfig


function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
        .filter(filename => !filename.includes('.bin'))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`
            return externals
        }, {})
}

clientConfig = {
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: './client',
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'superagent'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: 'chunk.[name].[chunkhash:8].js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', 'stage-0'],
                plugins: [
                	["transform-runtime"],
                	["transform-class-properties"],
                	['add-module-exports'],
                  ["import", [{ "style": true, "libraryName": "antd-mobile" }]]
                ],
                env: {
                        production: {
                            presets: ["react-optimize"]
                        }
                   },
                cacheDirectory: true
            }
        },  
        { test: /\.css$/i,
        	exclude: /^node_modules$/,
        	loader:styleExtractor.extract('style', 'css!') 
        },
        {
	        test  : /\.scss$/,
	        exclude: /^node_modules$/,
	        loader:  styleExtractor.extract('style', 'css!sass')
	      },{
        	test  : /\.less$/,
        	exclude: /^node_modules$/,
        	loader:  libExtractor.extract('style', "css!less")
        },
        { test: /\.(svg)$/i, 
        	loader: 'svg-sprite',
        	include: [
        		require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
          	path.resolve(__dirname, 'assets/img'),  // 自己私人的 svg 存放目录
      		]},
      	{
        	test  : /\.(jpe?g|png|gif|woff|eot|svg|ttf)$/,
        	loader: `url?limit=1&name=img/[sha512:hash:base64:7].[ext]`
      	}, {
          test: /\.json$/,
          loader: 'json'
        }, {
          test: /\.html$/,
          loader: 'html?minimize=false'
        }]
    },
    postcss: [autoprefixer({browsers: ['> 5%']})],
    resolve: {extensions: ['', '.js', '.json', '.scss']},
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        styleExtractor,
       	libExtractor,
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new HtmlWebpackPlugin({
            filename: '../../views/prod/index.html',
            template: './views/tpl/index.tpl.html',
            chunksSortMode: 'none'
        }),
        new ExtractTextPlugin('[name].[contenthash:8].css', {allChunks: true})
    ]
}

serverConfig = {
    context: path.resolve(__dirname, '..'),
    entry: {server: './server/server.prod'},
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', 'stage-0'],
                plugins: ['add-module-exports'],
                cacheDirectory: true
            }
        },  {
            test: /\.json$/,
            loader: 'json'
        }]
    },
    externals: getExternals(),
    resolve: {extensions: ['', '.js', '.json', '.scss']},
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
    ]
}

module.exports = [clientConfig, serverConfig]
