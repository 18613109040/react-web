// Provide custom regenerator runtime and core-js
require('babel-polyfill');
const requireHacker = require('require-hacker');

// Node babel source map support
require('source-map-support').install()

// Javascript require hook
require('babel-register')({
	  
    presets: ['es2015', 'react', 'stage-0'],
    plugins: [    
    					
              ['add-module-exports']
            ]
})

// Css require hook
/*require('css-modules-require-hook')({
	 
    extensions: ['.scss','.less','.css'],
    preprocessCss: function(data, filename){
        require('node-sass').renderSync({
            data,
            file: filename
        }).css
        
        
        
    },
    camelCase: true,
    generateScopedName: '[name]__[local]__[hash:base64:8]'
})*/

// Image require hook
/*require('asset-require-hook')({
    name: '/[hash].[ext]',
    extensions: ['jpg', 'png', 'gif', 'webp','svg'],
    limit: 8000
})*/

function setupRequireHacker () {
  requireHacker.resolver((filename, module) => {
    if (filename.endsWith('/style/css')) {
      return requireHacker.resolve(`${filename}.web.js`, module)
    }
  })

  requireHacker.hook('js', filename => {
    if (
      filename.endsWith('.web.js') ||
      !filename.includes('/node_modules/') ||
      ['antd-mobile', 'rc-swipeout', 'rmc-picker'].every(p => !filename.includes(p))
    ) return

    const webjs = filename.replace(/\.js$/, '.web.js')
    if (!fs.existsSync(webjs)) return

    return fs.readFileSync(webjs, { encoding: 'utf8' })
  })

  requireHacker.hook('css', () => '')

  requireHacker.hook('svg', filename => {
    return requireHacker.to_javascript_module_source(fs.readFileSync(filename, { encoding: 'utf8' }))
  })
}

//
//requireHacker.resolver((filename, module) => {
//	
//  if (filename.endsWith('/style/css')) {
//  	
//    return requireHacker.resolve(`${filename}.web.js`, module)
//  }
//})


/*requireHacker.hook('js', filename => {
	   
    if (
      filename.endsWith('.web.js') ||
      !filename.includes('/node_modules/') ||
      ['antd-mobile', 'rc-swipeout', 'rmc-picker'].every(p => !filename.includes(p))
    ) return

    const webjs = filename.replace(/\.js$/, '.web.js')
    if (!fs.existsSync(webjs)) return

    return fs.readFileSync(webjs, { encoding: 'utf8' })
})
requireHacker.resolver((filename, module) => {
    if (filename.endsWith('/style/css')) {
      return requireHacker.resolve(`${filename}.web.js`, module)
    }
})

requireHacker.hook('svg', filename => {
    return requireHacker.to_javascript_module_source(fs.readFileSync(filename, { encoding: 'utf8' }))
  })

requireHacker.hook('css', () => '')*/


const app = require('./app.js'),
    convert = require('koa-convert'),
    webpack = require('webpack'),
    fs = require('fs'),
    path = require('path'),
    devMiddleware = require('koa-webpack-dev-middleware'),
    hotMiddleware = require('koa-webpack-hot-middleware'),
    views = require('koa-views'),
    clientRoute = require('./middlewares/clientRoute'),
    config = require('../build/webpack.dev.config'),
    port = process.env.port || 3001,
    compiler = webpack(config)


// Webpack hook event to write html file into `/views/dev` from `/views/tpl` due to server render
compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets
    let file, data
    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, key)
            data = assets[key].source()
            fs.writeFileSync(file, data)
        }
    })
    callback()
})
app.use(setupRequireHacker)
app.use(views(path.resolve(__dirname, '../views/dev'), {map: {html: 'ejs'}}))
app.use(clientRoute)

/*app.use(router.routes())
app.use(router.allowedMethods())*/
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)
app.use(convert(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
})))
app.use(convert(hotMiddleware(compiler)))
app.listen(port)
