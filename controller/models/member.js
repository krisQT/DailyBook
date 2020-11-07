/**
 * @description 用户管理
 * @author 秦志超
 */
const moment = require('moment')
const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db')
const {Sequelize, Model, Op} = require('sequelize')


class Member extends Model {
  /**
   * @description 创建用户
   * 
   * @param {String} params.email
   * @param {String} params.nickname
   * @param {String} params.password
   * @param {Number} params.role 1、普通用户， 2、管理员
   */
  static async create(params) {
    const {email, password, nickname, role} = params

    const isExist = await Member.findAll({
      where: {
        [Op.or]: [
          {email},
          {nickname} 
        ]
      },
      raw: true
    })

    if (isExist.length) {
      throw new global.errors.Existing('用户已存在')
    }
    
    const member = new Member()
    member.nickname = nickname
    member.email = email
    member.password = password
    member.role = role
    member.save()

    return {
      email: member.email,
      nickname: member.nickname
    }
  }

  /**
   * @description 验证用户
   * 
   * @param {String} params.email
   * @param {String} params.nickname
   * @param {String} params.password
   */
  static async verify(params) {
    const {email, password, nickname} = params

    let conditon = []
    email ? conditon.push({ email }) : ''
    nickname ? conditon.push({ nickname }) : ''

    const member = await Member.findOne({
      where: {
        [Op.or]: conditon
      }
    })

    if (!member) {
      throw new global.errors.AuthFailed('账号不存在')
    }

    // TODO: 验证密码是否正确
    // const correct = bcrypt.compareSync(plainPassword, member.password);

    // if (!correct) {
    //   throw new global.errs.AuthFailed('账号不存在或者密码不正确')
    // }
    if (password !== member.password) {
      throw new global.errors.AuthFailed('密码错误')
    }

    return member
  }

  /**
   * @description 获取用户详情
   * 
   * @param {Number} id 用户id
   */
  static async detail(id) {
    const member = await Member.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ['password','deleted_at', 'updated_at']
      },
    })

    if (!member) {
      throw new global.errors.NotFailed('无法获取用户信息')
    }

    return member
  }

  /**
   * @description 用户列表
   * 
   * @param {Number} pageNum 页数
   * @param {Number} pageSize 每页数量
   */
  static async list(params) {
    const {pageNum, pageSize} = params

    const memberList = await Member.findAndCountAll({
      order: [
        ['id', 'DESC']
      ],
      where: {
        deleted_at: null
      },
      attributes: {
        exclude: ['deleted_at', 'updated_at']
      },
      limit: pageSize,
      offset: pageSize * (pageNum - 1)
    })

    return memberList
  }
}

Member.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '昵称'
  },
  email: {
    type: Sequelize.STRING(128),
    unique: true,
    allowNull: false,
    comment: '邮箱'
  },
  password: {
    type: Sequelize.STRING,
    // TODO: 加密方式
    // set(val) {
    //   // 加密
    //   const salt = bcrypt.genSaltSync(10);
    //   // 生成加密密码
    //   const psw = bcrypt.hashSync(val, salt);
    //   this.setDataValue("password", psw);
    // }
    allowNull: false,
    comment: '密码'
  },
  role: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    comment: '角色'
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  modelName: 'member',
  tableName: 'member'
})

module.exports = {
  Member
}