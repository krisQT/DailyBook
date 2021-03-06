const {Rule, LinValidator} = require('../../core/lin-validator-v2')

class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [
      new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')
    ]
    this.password = [
      // 用户密码指定范围
      new Rule('isLength', '密码至少6个字符，最多22个字符', {
        min: 6,
        max: 22
      })
    ]
    this.repeatPassword = this.password
    this.nickname = [
      new Rule('isLength', '昵称长度必须在2~16之间', {
        min: 2,
        max: 16
      }),
    ]
  }

  validatePassword(vals) {
    if (vals.body.repeatPassword !== vals.body.password) {
      throw new Error('两次输入的密码不一致，请重新输入')
    }
  }
}

class LoginValidator extends LinValidator {
  constructor() {
    super();
    this.email = [
      new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')
    ]
    this.password = [
      // 用户密码指定范围
      new Rule('isLength', '密码至少6个字符，最多22个字符', {
        min: 6,
        max: 22
      }),
    ]
  }
}

class ListValidator extends LinValidator {
  constructor() {
    super();
    this.pageSize = [
      new Rule('isInt', 'pageSize必须是整数')
    ]
    this.pageNum = [
      new Rule('isInt', 'pageSize必须是整数')
    ]
  }
}

class IdValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', '用户id必须是整数')
    ]
  }
}

module.exports = {
  RegisterValidator,
  LoginValidator,
  ListValidator,
  IdValidator
}