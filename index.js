const TasksController = require('./lib/controllers/tasksController.js')
const TaskApi = require('./lib/apis/tasksApi.js')
const TasksModel = require('./lib/models/tasksModel.js')

const DropBoxView = require('./lib/controllers/dropboxview.js')

const GoalsController = require('./lib/controllers/goalsController.js')
const GoalApi = require('./lib/apis/goalsApi.js')
const GoalsModel = require('./lib/models/goalsModel.js')

const taskApi = new TaskApi
const taskModel = new TasksModel

const goalApi = new GoalApi
const goalModel = new GoalsModel

const tasksController = new TasksController(taskApi, taskModel)

const goalsController = new GoalsController(goalApi, goalModel)

const dropboxView = new DropBoxView

