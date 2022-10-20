class TasksModel{
  constructor(){
    this.tasks = []
  }


  setTasks(tasks_array){
    this.tasks = tasks_array
  }

  addTask(task_description){
    this.tasks.push({description: task_description, urgency: null})
  }

  allTasks(){
    return this.tasks;
  }
}

module.exports = TasksModel;