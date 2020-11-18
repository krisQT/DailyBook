import {queryPersonnel, createPersonnel, updatePersonnel, deletePersonnel} from '../service'

const Model = {
  namespace: 'personnelList',
  
  state: {
    list: [],
  },
  
  effects: {
    *fetch({}, {call, put}) {
      const response = yield call(queryPersonnel)
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : []
      })
    },

    *submit({payload, callback}, {call}) {
      let excuetor
      if (payload.id) {
        excuetor = updatePersonnel
      } else {
        excuetor = createPersonnel
      }
      
      try {
        yield call(excuetor, payload)
        if (callback) callback();
      } catch (error) {
        console.log('error', error)
      }
    },

    *deletePersonnel({payload, callback}, {call}) {
      try {
        yield call(deletePersonnel, payload.id)
        if (callback) callback();
      } catch (error) {
        console.log('error', error)
      }
    }
  },

  reducers: {
    queryList(state, action) {
      return {...state, list: action.payload}
    },

    appendList(state = {list: []}, action) {
      return {...state, list: state.list.concat(action.payload)}
    }
  }
}

export default Model
