import 'babel-polyfill'
import serve from 'koa-static'
import path from 'path'
import views from 'koa-views'
import app from './app'
require('babel-register')({
    plugins: [    
    					['babel-plugin-transform-ensure-ignore',{
              	"extensions": [".less", ".css",'.scss','png','svg']
            		}
    					],
              ['add-module-exports']
            ]
})
import clientRoute from './middlewares/clientRoute'

const port = process.env.port || 3000

app.use(views(path.resolve(__dirname, '../views/prod'), {map: {html: 'ejs'}}))
app.use(serve(path.resolve(__dirname, '../dist/client')))
app.use(clientRoute)
app.listen(port)
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)
