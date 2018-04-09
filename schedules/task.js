module.exports = {
  cron: '*/5 * * * * *',
  run (fireDate) {
    console.log('run task at:', fireDate.toString())
  }
}
