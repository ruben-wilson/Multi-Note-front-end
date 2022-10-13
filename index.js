const View = require('./lib/tasksView.js')
const Api = require('./lib/tasksApi.js')
const Model = require('./lib/tasksModel.js')

const api = new Api
const model = new Model

const tasksView = new View(api, model)
