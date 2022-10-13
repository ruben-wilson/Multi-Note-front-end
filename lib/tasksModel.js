class TasksModel{
  constructor(){
    this.tasks = []
  }


  setTasks(tasks_array){
    this.tasks = tasks_array
  }

  allTasks(){
    console.log(this.tasks)
    return this.tasks;
  }
}

module.exports = TasksModel;