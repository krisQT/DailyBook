
const {Rule, LinValidator} = require('../../core/lin-validator-v2')
const {Classify} = require('../models/classify')

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
    this.recordType = [
      new Rule('isInt', 'recordType不能为空', {min: 1})
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
    const classify = await Classify.findOne({
      where: {
        email: id
      }
    })
    if (!classify) {
      throw new Error('未找到该分类')
    }
  }
}

class ListValidator extends LinValidator {
  constructor() {
    super()
    this.recordType = [
      new Rule('isLength', 'recordType不能为空', {min: 1})
    ]
  }
}

module.exports = {
  CreateValidator,
  UpdateValidator,
  ListValidator,
  DeleteValidator
}