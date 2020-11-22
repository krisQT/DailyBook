import { queryRecordType, queryClassify, createClassify, updateClassify, deleteClassify } from '../service';
import { buildTree, buildFirstLevel } from '../../../utils/utils'

const Model = {
  namespace: 'classifyList',

  state: {
    // 分类列表
    list: [],
    // 一级分类
    firstLevelList: [],
    // 流水类型
    recordTypeList: []
  },

  effects: {
    *fetch({payload}, { call, put }) {
      const response = yield call(queryClassify, {recordType: payload})
      
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? buildTree(response) : []
      })

      yield put({
        type: 'queryFirstLevelList',
        payload: Array.isArray(response) ? buildFirstLevel(response) : []
      })
    },
    
    *fetchRecordType({ payload, callback }, { call, put }) {
      const response = yield call(queryRecordType)
      
       yield put({
         type: 'queryRecordTypeList',
         payload: Array.isArray(response) ? response : []
       })

       if (callback) callback(response[0].id);
    },

    *submit({payload, callback}, {call}) {
      let excuetor
      if (payload.id) {
        excuetor = updateClassify
      } else {
        excuetor = createClassify
      }
      
      try {
        yield call(excuetor, payload)
        if (callback) callback();
      } catch (error) {
        console.log('error', error)
      }
    },

    *deleteClassify({payload, callback}, {call}) {
      try {
        yield call(deleteClassify, payload.id)
        if (callback) callback()
      } catch (error) {
        console.log('error', error)
      }
    }
  },

  reducers: {
    queryList(state, action) {
      return {...state, list: action.payload}
    },
    
    queryFirstLevelList(state, action) {
      return {...state, firstLevelList: [{id: 0, name: '无'}].concat(action.payload)}
    },

    queryRecordTypeList(state, action) {
      action.payload.forEach(item => {
        item.label = item.recordTypeName
        item.value = item.id
      })
      return {...state, recordTypeList: action.payload}
    }
  }
}

export default Model