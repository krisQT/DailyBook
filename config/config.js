module.exports = {
  environment: 'dev',
  security: {
    secretKey: 'DailyBook@Key',
    expiresIn: 60 * 60
  },  
  mydql: {
    dbName: 'daily_book',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'qinzhichao940620'
  },
  redis: {
    port: 6379,
    host: '127.0.0.1',
    password: 'qinzhichao940620'
  }
}   