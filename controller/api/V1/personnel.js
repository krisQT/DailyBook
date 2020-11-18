/**
 * @description 流水相关成员api
 * @author 秦志超
 */
const Router = require('koa-router')

const {CreateValidator, UpdateValidator, DeleteValidator} = require('../../validators/personnel')

const {Auth} = require('../../../middlewares/auth')
const {Personnel} = require('../../models/personnel')
const {Response} = require('../../lib/response')

const res = new Response()

const router = new Router({
  prefix: '/api/v1/personnel'
})

// 创建成员
router.post('/create' , async (ctx) => {
  console.log(ctx)
  const v = await new CreateValidator().validate(ctx)
  
  const personnel = await Personnel.create({
    name: v.get('body.name'),
    sort: v.get('body.sort'),
    status: v.get('body.status')
  })

  ctx.response.status = 200
  ctx.body = res.json(personnel)
})

// 更新
router.post('/update', new Auth(2).m , async (ctx) => {
  const v = await new UpdateValidator().validate(ctx)
  
  const personnel = await Personnel.update({
    id:  v.get('body.id'),
    name: v.get('body.name'),
    sort: v.get('body.sort'),
    status: v.get('body.status')
  })

  ctx.response.status = 200
  ctx.body = res.json(personnel)
})

//获取所有成员
router.get('/list', new Auth(1).m, async (ctx) => {
  const list = await Personnel.list(ctx.request.body.status)

  ctx.response.status = 200
  ctx.body = res.json(list)
})

// 删除成员
router.delete('/:id', new Auth(2).m, async (ctx) => {
  const v = await new DeleteValidator().validate(ctx)

  await Personnel.deletePerSonnel(v.get('path.id'))

  ctx.response.status = 200
  ctx.body = res.success()
})

module.exports = router
