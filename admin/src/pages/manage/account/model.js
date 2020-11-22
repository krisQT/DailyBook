import { queryAccount, createAccount, updateAccount, deleteAccount } from '../service';
import { buildTree, buildFirstLevel } from '../../../utils/utils'

const Model = {
  namespace: 'accountList',

  state: {
    // 账户类型列表
    list: [],
    // 一级账户类型列
    firstLevelList: [],
  },

  effects: {
    *fetch({payload}, { call, put }) {
      const response = yield call(queryAccount, {recordType: payload})
      
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? buildTree(response) : []
      })

      yield put({
        type: 'queryFirstLevelList',
        payload: Array.isArray(response) ? buildFirstLevel(response) : []
      })
    },

    *submit({payload, callback}, {call}) {
      let excuetor
      if (payload.id) {
        excuetor = updateAccount
      } else {
        excuetor = createAccount
      }
      
      try {
        yield call(excuetor, payload)
        if (callback) callback();
      } catch (error) {
        console.log('error', error)
      }
    },

    *deleteAccount({payload, callback}, {call}) {
      try {
        yield call(deleteAccount, payload.id)
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
  }
}

export default Model