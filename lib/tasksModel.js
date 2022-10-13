class TasksModel{
  constructor(){
    this.tasks = []
  }


  setTasks(tasks_array){
    this.tasks = tasks_array
  }

  allTasks(){
    return this.tasks;
  }
}

module.exports = TasksModel;