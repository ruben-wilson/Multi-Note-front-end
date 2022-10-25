class TasksModel{
  constructor(){
    this.tasks = []
  }


  setTasks(tasks_array){
    this.tasks = tasks_array
  }

  addTask(task_description, task_time, task_date){
    this.tasks.push({description: task_description, time: task_time, date: task_date})
  }

  allTasks(){
    return this.tasks;
  }
}

module.exports = TasksModel;