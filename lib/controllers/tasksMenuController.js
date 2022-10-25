class TasksMenu{
  constructor(){
    this.page = document.querySelector('.page')
  }

  createMenu(){
    const containerDiv = document.createElement('div')
    containerDiv.id = 'testContainer'

    const inputEL = document.createElement('input')
    inputEL.type = 'text'
    inputEL.id = 'tasksInput'

    const dateInputEl = document.createElement('input')
    dateInputEl.id = 'tasksDate'
    dateInputEl.type = 'date'

    const timeInputEl = document.createElement('input')
    timeInputEl.id = 'tasksTime'
    timeInputEl.type = 'time'

    const buttonEl = document.createElement('button')
    buttonEl.id = 'createTask'
    buttonEl.innerText = 'create task'

    containerDiv.append(inputEL, dateInputEl, timeInputEl, buttonEl)
    this.page.append(containerDiv)
  }

  submitMenu(callback){
    const createTaskEl = document.querySelector('#createTask')

    createTaskEl.addEventListener('click', ()=>{
      const task = {
      description: document.querySelector('#tasksInput').value,
      date: document.querySelector('#tasksDate').value,
      time: document.querySelector('#tasksTime').value
    }
      callback(task)
    })
  }


}

module.exports = TasksMenu