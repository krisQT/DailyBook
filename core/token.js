const jwt = require('jsonwebtoken')

const generateToken = function (uid, role) {
  const secretKey = global.config.security.secretKey
  const expiresIn = global.config.security.expiresIn

  const token = jwt.sign(
    {
      uid,
      role
    },
    secretKey,
    {
      expiresIn
    }
  )

  return token
}

module.exports = {generateToken}