/**
 * @description 流水分类
 * @author 秦志超
 */

const {sequelize} = require('../../core/db')
const {Sequelize, Model, Op} = require('sequelize')

class Classify extends Model {
  /**
   * @description 创建分类 
   */
  static async create(params) {
    const {name, parentId, parentName, sort, status, recordType} = params
    const isExist = await Classify.findOne({
      where: {
        [Op.and]: [
          {name},
          {parentId}
        ]
      }
    })

    if (isExist) {
      throw new global.errors.Existing('同一层级的分类已经存在')
    }

    const classify = new Classify()
    classify.name = name
    classify.parentId = parentId
    classify.parentName = parentName
    classify.sort = sort
    classify.status = status
    classify.recordType = recordType
    classify.save()

    return classify
  }

  /**
   * @description 更新分类
   */
  static async update(params) {
    const {id, name, sort, status} = params

    const classify = await Classify.findOne({
      where: {
        id
      }
    })

    if (!classify) {
      throw new global.errors.NotFailed('分类不存在')
    }

    classify.name = name
    classify.sort = sort
    classify.status = status
    classify.save()

    // TODO: update 存在bug
    const list = await Classify.findAll({
      where: {
        parentId: id
      }
    })
    list.forEach(classifyItem => {
      classifyItem.parentName = classify.name
      classifyItem.save()
    })

    return classify
  }

  /**
   * @description 删除分类
   */
  static async deleteClassify() {

  }

  /**
   * 根据 recordType 获取所有分类
   * @param {Number} recordType 流水类型id
   */
  static async list(recordType) {
    const list = await Classify.findAll({
      where: {
        recordType,
        deleted_at: null
      },
      attributes: {
        exclude: ['deleted_at', 'updated_at']
      },
    })

    return list
  }
}

Classify.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '分类名称'
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
  recordType: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '流水类型id'
  },
}, {
  sequelize,
  modelName: 'classify',
  tableName: 'classify'
})

module.exports = {Classify}