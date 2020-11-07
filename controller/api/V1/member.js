const Router = require('koa-router')

const {RegisterValidator, loginValidator, listValidator, idValidator} = require('../../validators/member')
const {Auth} = require('../../../middlewares/auth')
const {generateToken} = require('../../../core/token')
const {Member} = require('../../models/member')
const {Response} = require('../../lib/response')

const res = new Response()

const router = new Router({
  prefix: '/api/v1/member'
})

/**
 * 用户注册
 */
router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)

  const member = await Member.create({
    email: v.get('body.email'),
    password: v.get('body.password'),
    nickname: v.get('body.nickname'),
    role: v.get('body.role')
  })

  ctx.response.status = 200;
  ctx.body = res.json(member)
})

/**
 * 登录
 */
router.post('/login', async (ctx) => {
  const v = await new loginValidator().validate(ctx)

  const member = await Member.verify({
    email: v.get('body.email'),
    nickname: v.get('body.nickname'),
    password: v.get('body.password')
  })

  let token = generateToken(member.id, member.role)

  ctx.response.status = 200;
  ctx.body = res.json(token)
})

/**
 * 获取用户详情
 */
router.get('/:id', new Auth(1).m, async (ctx) => {
  const v = await new idValidator().validate(ctx)

  const member = await Member.detail(v.get('path.id'))

  ctx.response.status = 200;
  ctx.body = res.json(member)
})
/**
 * 用户列表
 */
router.post('/list', new Auth(2).m, async (ctx) => {
  const v = await new listValidator().validate(ctx)

  const list = await Member.list({
    pageSize: v.get('body.pageSize'),
    pageNum: v.get('body.pageNum')
  })

  ctx.response.status = 200;
  ctx.body = res.json(list)
})

module.exports = router