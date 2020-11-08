const {get} = require('lodash')

let ob = {
  body: {
    status: false,
    id: 0
  }
}

value1 = get(ob, ['body', 'status'])

value2 = get(ob, ['body', 'id'])

value3 = get(ob, ['body', 'name'])

console.log(value1,value2,value3)