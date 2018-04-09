const { MONGO_DB_URI = 'mongodb://localhost/test' } = process.env

module.exports = {
  mongoose: {
    uri: MONGO_DB_URI
  },
  jwt: {
    secret: '715ea43a4fa62b1dd5f88907780a6d162564f10c'
  }
}
