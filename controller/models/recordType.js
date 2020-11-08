/**
 * @description 流水类型
 * @author 秦志超
 */

const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')


class RecordType extends Model {
  /**
   * 创建类型
   * @param {recordTypeName} 流水类型名称 
   */
  static async create(recordTypeName) {
    const isExist = await RecordType.findOne({
      where: {
        recordTypeName
      }
    })

    if (isExist) {
      throw new global.errors.Existing('流水类型已存在')
    }

    const recordType = new RecordType()
    recordType.recordTypeName = recordTypeName
    recordType.save();

    return recordType
  }

  /**
   * 获取所有类型
   */
  static async list() {
    const list = await RecordType.findAll({
      attributes: {
        exclude: ['deleted_at', 'updated_at', 'created_at']
      },
    })

    return list
  }
}

RecordType.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  recordTypeName: {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true,
    comment: '类型名称'
  },
}, {
  sequelize,
  modelName: 'recordType',
  tableName: 'recordType'
})

module.exports = {RecordType}