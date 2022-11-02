const Model = require('../lib/models/tasksModel.js')

describe("tasks model", ()=>{
  it("starts with an empty array", ()=>{
    const model = new Model

    expect(model.allTasks()).toEqual([])
  })

  it("the setTasks() function loads an array of tasks into it", ()=>{
    const model = new Model

    tasks = ['task1', 'make more imaginative tasks', 'get a life']

    model.setTasks(tasks)

    expect(model.allTasks()).toEqual(tasks)
  })
})