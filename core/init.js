const Router = require('koa-router')
const requireDirectory = require('require-directory')

class Init {
  static init(app) {
    Init.app = app
    Init.initConfig()
    Init.initRouter()
    Init.initHttpException()
  }

  /**
   * 初始化全局错误处理
   */
  static initHttpException() {
    const errors = require('./exception')
    global.errors = errors
  }

  /**
   * 初始化全局配置
   */
  static initConfig() {
    const configPath = `${process.cwd()}/config/config.js`
    const config = require(configPath)
    global.config = config
  }

  /**
   * 初始化所有接口路由
   */
  static initRouter() {
    const routerPath = `${process.cwd()}/controller/api`
    
    requireDirectory(module, routerPath, {
      visit: (router) => {
        if (router instanceof Router) {
          Init.app.use(router.routes())
        }
      }
    })
  }
}

module.exports = Init