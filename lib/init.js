const schedule = require('node-schedule')
const { load } = require('./util')

module.exports = function (app) {
  app.controllers = load('controllers')
  app.models = load('models')
  app.services = load('services')
  app.constants = load('constants')
  // init schedules
  // const schedules = load('schedules')
  // initSchedules(app, schedules)

  const { context } = app
  context.models = app.models
  context.services = app.services
  context.constants = app.constants
}

function initSchedules (app, schedules) {
  Object.values(schedules).forEach(item => {
    if (item.cron && typeof item.run === 'function') {
      schedule.scheduleJob(item.cron, item.run.bind(app))
    }
  })
}
