/**
 * @description 流水账户
 * @author 秦志超
 */

const {sequelize} = require('../../core/db')
const {Sequelize, Model, Op} = require('sequelize')

class Account extends Model {
    /**
   * @description 创建账户
   */
  static async create(params) {
    const {name, parentId, parentName, sort, status} = params
    const isExist = await Account.findOne({
      where: {
        [Op.and]: [
          {name},
          {parentId}
        ]
      }
    })

    if (isExist) {
      throw new global.errors.Existing('同一层级的账户已经存在')
    }

    const account = new Account()
    account.name = name
    account.parentId = parentId
    account.parentName = parentName
    account.sort = sort
    account.status = status
    account.save()

    return account
  }

  /**
   * @description 更新账户
   */
  static async update(params) {
    const {id, name, sort, status} = params

    const account = await Account.findOne({
      where: {
        id
      }
    })

    if (!account) {
      throw new global.errors.NotFailed('分类不存在')
    }

    account.name = name
    account.sort = sort
    account.status = status
    account.save()

    // TODO: update 存在bug
    const list = await Account.findAll({
      where: {
        parentId: id
      }
    })
    list.forEach(accountItem => {
      accountItem.parentName = account.name
      accountItem.save()
    })

    return account
  }

  /**
   * @description 删除账户
   */
  static async deleteAccount() {
    // 需要判断是否绑定用户，是否产生流水
  }

  /**
   * 根据 recordType 获取所有分类
   */
  static async list() {
    const list = await Account.findAll({
      where: {
        deleted_at: null
      },
      attributes: {
        exclude: ['deleted_at', 'updated_at']
      },
    })

    return list
  }
}

Account.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '账户名称'
  },
  parentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '父类id'
  },
  parentName: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '父类名'
  },
  sort: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '排序'
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    comment: '状态'
  },
}, {
  sequelize,
  modelName: 'account',
  tableName: 'account'
})

module.exports = {Account}
