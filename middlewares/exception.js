const {HttpException} = require('../core/exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'

    if (isDev && !isHttpException) {
      throw error
    }

    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.response.status = error.code
    } else {
      ctx.body = {
        msg: '服务器错误！',
        error_code: 9999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.response.status = 503
    }
  }
}

module.exports = catchError