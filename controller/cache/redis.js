const redis = require('redis')
const config = global.config.redis

const redisClient = redis.createClient({
  host: config.host,
  port: config.port,
  password: config.password
})

redisClient.on('error', err => {
  console.log('redis error ====>')
  console.log(err)
})

/**
 * 设置 redis
 * @param {String} key 键
 * @param {String} val 值
 * @param {number} expire 过期时间
 */
function setRedis(key, val, expire = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }

  redisClient.set(key, val)
  redisClient.expire(key, expire)
}

/**
 * 获取 redis
 */
function getRedis(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val === null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  setRedis,
  getRedis
}
