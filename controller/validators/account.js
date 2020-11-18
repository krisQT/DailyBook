
const {Rule, LinValidator} = require('../../core/lin-validator-v2')
const {Account} = require('../models/account')

class CreateValidator extends LinValidator {
  constructor() {
    super()
    this.name = [
      new Rule('isLength', 'name不能为空', {min: 1})
    ]
    this.sort = [
      new Rule('isInt', 'sort必须是正整数', {min: 0})
    ]
    this.parentId = [
      new Rule('isInt', 'parentId必须是整数')
    ]
    this.status = [
      new Rule('isBoolean', 'status必须是布尔类型')
    ]
  }
}

class UpdateValidator extends LinValidator {
  constructor() {
    super()
    this.name = [
      new Rule('isLength', 'name不能为空', {min: 1})
    ]
    this.sort = [
      new Rule('isInt', 'sort必须是正整数', {min: 0})
    ]
    this.status = [
      new Rule('isBoolean', 'status必须是布尔类型')
    ]
  }
}

class DeleteValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', 'id不能为空', {min: 1})
    ]
  }

  async idvalidate(vals) {
    const id = vals.body.id
    const account = await Account.findOne({
      where: {
        email: id
      }
    })
    if (!account) {
      throw new Error('未找到该账号')
    }
  }
}

module.exports = {
  CreateValidator,
  UpdateValidator,
  DeleteValidator
}