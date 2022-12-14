const TasksController = require('./lib/controllers/tasksController.js')
const TaskMenuController = require('./lib/controllers/tasksMenuController.js')
const TaskApi = require('./lib/apis/tasksApi.js')
const TasksModel = require('./lib/models/tasksModel.js')

const DropBoxView = require('./lib/controllers/dropboxview.js')

const DefaultApi = require('./lib/apis/defaultsApi.js')
const DefaultController = require('./lib/controllers/defaultsController.js')

const GoalsController = require('./lib/controllers/goalsController.js')
const GoalApi = require('./lib/apis/goalsApi.js')
const GoalsModel = require('./lib/models/goalsModel.js')

const taskApi = new TaskApi
const taskModel = new TasksModel
const taskMenu = new TaskMenuController

const goalApi = new GoalApi
const goalModel = new GoalsModel

const defaultApi = new DefaultApi

const tasksController = new TasksController(taskApi, taskModel, taskMenu)
const goalsController = new GoalsController(goalApi, goalModel)
const defaultsController = new DefaultController(defaultApi)

const dropboxView = new DropBoxView

