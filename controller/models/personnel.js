/**
 * @description 流水相关成员
 * @author 秦志超
 */

 
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

class Personnel extends Model {
  /**
   * 创建人员
   */
  static async create(params) {
    const {name, sort, status} = params
    const isExist = await Personnel.findOne({
      where: {
        name
      }
    })

    if (isExist) {
      throw new global.errors.Existing('成员名已存在')
    }

    const personnel = new Personnel()
    personnel.name = name
    personnel.sort = sort
    personnel.status = status
    personnel.save()

    return personnel
  }

  /**
   * 更新
   */
  static async update(params) {
    const {id, name, sort, status} = params

    const personnel = await Personnel.findOne({
      where: {
        id
      }
    })

    if (!personnel) {
      throw new global.errors.NotFailed('成员不存在')
    }

    personnel.name = name
    personnel.sort = sort
    personnel.status = status
    personnel.save()

    return personnel
  }

  /**
   * 获取所有人员
   */
  static async list(status) {
    let condition = {
      deleted_at: null
    }
    typeof status === 'undefined' ? '' : condition.status = status

    const list = await Personnel.findAll({
      where: condition,
      attributes: {
        exclude: ['deleted_at', 'updated_at', 'created_at']
      },
      order: [
        ['sort', 'ASC'],
      ]
    })

    return list
  }

  /**
   * 删除成员
   */
  static async deletePerSonnel(id) {
    const personnel = await Personnel.findOne({ 
      where: { id } 
    })

    if (!personnel) {
      throw new global.errors.NotFailed('成员不存在')
    }

    personnel.destroy()

    return
  }
}

Personnel.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true,
    comment: '类型名称'
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
  modelName: 'personnel',
  tableName: 'personnel'
})

module.exports = {Personnel}