module.exports = {
  port: 3000,
  session: {            // express-session 的配置信息
    secret: 'blog',
    key: 'blog',
    maxAge: 2592000000
  },
  mysql: {
  	host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'nodejs'
  }
}