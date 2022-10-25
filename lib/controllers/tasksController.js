

class tasksController{
  constructor(api, model, menu){
    this.api = api,
    this.model = model
    this.menuController = menu

    this.page = document.querySelector('.page')

    this.containerEL = document.querySelector('#testBox')
    this.footerContainerEl = document.querySelector('.footerContainer')

    this.taskCounter = 0

    this.#setTasks()

    this.addTaskEL = document.querySelector('#add-task')
    this.addTaskEL.addEventListener("click", () => {

      this.menuController.createMenu()

      this.menuController.onSubmitMenu((task)=>{
          this.api.saveData(task.description, task.time, task.date)
          this.model.addTask(task.description, task.time, task.date)
          this.createTask(task.description, task.time)
      }) 
    })

    this.deleteTaskEl = document.querySelector('#delete-task-button')
    this.deleteTaskEl.addEventListener('click', () => {
      this.deleteTask()
    })
   
  }

  // addTask(text, time, date){
  //    this.taskCounter += 1
  //    const div = document.createElement('div');
  //    div.textContent = text;
  //    div.draggable = true;
  //    div.className = 'tasks'
  //    div.id = `task${this.taskCounter}`
  //    div.addEventListener('dragstart', this.#dragStart)
  //    this.footerContainerEl.append(div);
  
  // }

  createTask(text, time){
     this.taskCounter += 1
     const div = document.createElement('div');
     div.textContent = text;
     div.draggable = true;
     div.className = 'tasks'
     div.id = `task${this.taskCounter}`
     div.addEventListener('dragstart', this.#dragStart)
     time = time.replace(':', '')
     const boxEl = document.querySelector(`#box${time.slice(0, -2)}00`)
     boxEl.append(div);
  }

  displayAllTasks(){
    for(const e of this.model.allTasks()){
      this.createTask(e.description, e.time)
    }
  }

  deleteTask(){
    const tasks_array = this.model.allTasks()
    this.api.deleteData(tasks_array.reverse()[0].description)
    let taskToDelete = document.querySelectorAll('.tasks')
    taskToDelete = taskToDelete[taskToDelete.length - 1]
    taskToDelete.parentNode.removeChild(taskToDelete)
    location.reload()
  }

  #setTasks(){
    this.api.loadData((Response)=>{
      this.model.setTasks(Response)
      this.displayAllTasks()
    })

    
  }
 
  #dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

}

module.exports = tasksController;