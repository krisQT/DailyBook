/**
 * @description 流水类型api
 * @author 秦志超
 */
const Router = require('koa-router')

const {CreateValidator} = require('../../validators/recordType')

const {Auth} = require('../../../middlewares/auth')
const {RecordType} = require('../../models/recordType')
const {Response} = require('../../lib/response')

const res = new Response()

const router = new Router({
  prefix: '/api/v1/recordType'
})

// 创建流水类型
router.post('/create', new Auth(2).m , async (ctx) => {
  const v = await new CreateValidator().validate(ctx)
  
  const recordType = await RecordType.create(v.get('body.recordTypeName'))

  ctx.response.status = 200
  ctx.body = res.json(recordType)
})

//获取所有流水类型
router.get('/list', new Auth(1).m, async (ctx) => {
  const list = await RecordType.list()

  ctx.response.status = 200
  ctx.body = res.json(list)
})

module.exports = router
