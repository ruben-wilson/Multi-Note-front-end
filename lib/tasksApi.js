class TasksAPi{

  loadData(callback){
    fetch('http://localhost:3000/tasks')
      .then((response) => response.json())
      .then((response_json) => callback(response_json))
  }

}

module.exports = TasksAPi