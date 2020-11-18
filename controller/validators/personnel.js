const {Rule, LinValidator} = require('../../core/lin-validator-v2')

class CreateValidator extends LinValidator {
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

class UpdateValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', 'id必须是正整数', {min: 1})
    ]
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
      new Rule('isInt', 'id必须是正整数', {min: 1})
    ]
  }
}

module.exports = {
  UpdateValidator,
  CreateValidator,
  DeleteValidator
}