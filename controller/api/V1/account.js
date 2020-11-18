/**
 * @description 流水类型api
 * @author 秦志超
 */
const Router = require('koa-router')

const {Auth} = require('../../../middlewares/auth')
const {Account} = require('../../models/account')
const {
  CreateValidator,
  UpdateValidator,
  DeleteValidator,
} = require('../../validators/account')
const {Response} = require('../../lib/response')


const res = new Response()

const router = new Router({
  prefix: '/api/v1/account'
})

// 创建账户
router.post('/create', new Auth(2).m, async (ctx) => {
  const v = await new CreateValidator().validate(ctx)

  const account = await Account.create({
    name: v.get('body.name'),
    parentId: v.get('body.parentId'),
    parentName: v.get('body.parentName'),
    sort: v.get('body.sort'),
    status: v.get('body.status'),
  })

  ctx.response.status = 200
  ctx.body = res.json(account)
})

// 更新账户
router.post('/update', new Auth(2).m, async (ctx) => {
  const v = await new UpdateValidator().validate(ctx)

  const account = await Account.update({
    id: v.get('body.id'),
    name: v.get('body.name'),
    sort: v.get('body.sort'),
    status: v.get('body.status'),
  })

  ctx.response.status = 200
  ctx.body = res.json(account)
})

// 删除账户
router.post('/delete', new Auth(2).m, async (ctx) => {
  const v = await new DeleteValidator().validate(ctx)

  await Account.deleteAccount({
    id: v.get('body.id'),
    name: v.get('body.name'),
    sort: v.get('body.sort'),
    status: v.get('body.status'),
  })

  ctx.response.status = 200
  ctx.body = res.success()
})

// 按流水类别获取账户列表
router.get('/list', new Auth(1).m, async (ctx) => {
  const list = await Account.list()

  ctx.response.status = 200
  ctx.body = res.json(list)
})

module.exports = router