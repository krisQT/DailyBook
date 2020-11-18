const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {
    this.level = level || 1
    // 普通用户
    Auth.USER = 1;
    // 管理员
    Auth.ADMIN = 2;
  }

  get m() {
    return async (ctx, next) => {
      const tokenToken = basicAuth(ctx.req)

      let errMsg = '无效的token'
      if (!tokenToken || !tokenToken.name) {
        errMsg = '暂未登录'
        throw new global.errors.Forbidden(errMsg)
      }

      let decode
      try {
        decode = jwt.verify(tokenToken.name, global.config.security.secretKey)
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token已过期'
        }
        throw new global.errors.Forbidden(errMsg)
      }

      if (decode.role < this.level) {
        errMsg = '权限不足'
        throw new global.errors.Forbidden(errMsg)
      }

      ctx.auth = {
        uid: decode.uid,
        role: decode.role
      }

      await next()
    }
  }
}

module.exports = {Auth}