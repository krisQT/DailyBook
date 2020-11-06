class Response {
  success(msg = 'success', errorCode = 0, code = 200) {
    return {
      msg,
      code,
      errorCode
    }
  }

  json(data, msg = 'success', errorCode = 0, code = 200) {
    return {
      data,
      msg,
      code,
      errorCode
    }
  }
}

module.exports = {Response}