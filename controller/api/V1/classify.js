/**
 * @description 流水类型api
 * @author 秦志超
 */
const Router = require('koa-router')

const {Auth} = require('../../../middlewares/auth')
const {Classify} = require('../../models/classify')
const {
  CreateValidator,
  UpdateValidator,
  DeleteValidator,
  ListValidator
} = require('../../validators/classify')
const {Response} = require('../../lib/response')


const res = new Response()

const router = new Router({
  prefix: '/api/v1/classify'
})

// 创建分类
router.post('/create', new Auth(2).m, async (ctx) => {
  const v = await new CreateValidator().validate(ctx)

  const classify = await Classify.create({
    name: v.get('body.name'),
    parentId: v.get('body.parentId'),
    parentName: v.get('body.parentName'),
    sort: v.get('body.sort'),
    status: v.get('body.status'),
    recordType: v.get('body.recordType'),
  })

  ctx.response.status = 200
  ctx.body = res.json(classify)
})

// 更新分类
router.post('/update', new Auth(2).m, async (ctx) => {
  const v = await new UpdateValidator().validate(ctx)

  const classify = await Classify.update({
    id: v.get('body.id'),
    name: v.get('body.name'),
    sort: v.get('body.sort'),
    status: v.get('body.status'),
  })

  ctx.response.status = 200
  ctx.body = res.json(classify)
})

// 删除分类
router.post('/delete', new Auth(2).m, async (ctx) => {
  const v = await new DeleteValidator().validate(ctx)

  await Classify.deleteClassify({
    id: v.get('body.id'),
    name: v.get('body.name'),
    sort: v.get('body.sort'),
    status: v.get('body.status'),
  })

  ctx.response.status = 200
  ctx.body = res.success()
})

// 按流水类别获取分类列表
router.get('/list', new Auth(1).m, async (ctx) => {
  const v = await new ListValidator().validate(ctx)

  const list = await Classify.list(v.get('query.recordType'))

  ctx.response.status = 200
  ctx.body = res.json(list)
})

module.exports = router