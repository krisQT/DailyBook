const {Rule, LinValidator} = require('../../core/lin-validator-v2')

class CreateValidator extends LinValidator {
  constructor() {
    super()
    this.recordTypeName = [
      new Rule('isLength', 'recordTypeName不能为空', {min: 1})
    ]
  }
}

module.exports = {
  CreateValidator
}