const TaskView = require('./lib/components/tasksView.js')
const Api = require('./lib/tasksApi.js')
const Model = require('./lib/tasksModel.js')
const DropBoxView = require('./lib/components/dropboxView.js')

const api = new Api
const model = new Model

const tasksView = new TaskView(api, model)
const dropboxView = new DropBoxView

