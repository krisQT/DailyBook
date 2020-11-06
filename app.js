const Koa = require('Koa')
const parse = require('koa-bodyparser')
const cors = require('@koa/cors')
const Init = require('./core/init')

const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(cors())
app.use(catchError)
app.use(parse())

Init.init(app)

app.listen(8080, () => {
  console.log('DailyBOOk service is listenning in 8080')
})

