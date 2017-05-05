const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin')
const theme = require('../client/assets/theme');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const styleExtractor = new ExtractTextPlugin('css/styles.css',{allChunks:true});
const libExtractor = new ExtractTextPlugin('css/lib.css',{allChunks:true});

module.exports = {
    devtool: 'eval-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: [
            './client',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
        ],
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
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    resolve: {
    	modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    	extensions: ['', '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', 'stage-0','react-hmre'],
                plugins: [
                	['add-module-exports'],
                	["transform-runtime", { polyfill: false }],  //使用babel-plugin-transform-runtime取代babel-polyfill，可节省大量文件体积需要注意的是，你不能使用最新的内置实例方法，例如数组的includes方法
                  ["import", [{ "style": true, "libraryName": "antd-mobile" }]]
                ],
                
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
        	test  : /\.less$/i,
        	exclude: /^node_modules$/,
        	loader: libExtractor.extract('style', `css!less?{"sourceMap":true,"modifyVars":${JSON.stringify(theme())}}`)
        },
        { test: /\.(svg)$/i, 
        	loader: 'svg-sprite',
        	include: [
        		require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
          	path.resolve(__dirname, 'assets/img'),  // 自己私人的 svg 存放目录
      		]},
      	{
        	test  : /\.(jpe?g|png|gif|woff|eot|ttf)$/,
        	loader: `url?limit=1&name=img/[sha512:hash:base64:7].[ext]`
      	}, {
          test: /\.json$/,
          loader: 'json'
        }, {
          test: /\.html$/,
          loader: 'html?minimize=false'
        }]
    },
   
    plugins: [
    		
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        libExtractor,
    		styleExtractor,
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new HtmlWebpackPlugin({
            //filename: '../views/dev/index.html',
            template: './views/tpl/index.tpl.html',
            inject: 'body' //单独webpack 
            
        }),
        new ProgressBarPlugin({summary: false}),
      
        
    ]
}
