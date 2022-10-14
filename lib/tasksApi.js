class TasksAPi{

  loadData(callback){
    fetch('http://localhost:3000/tasks')
      .then((response) => response.json())
      .then((response_json) => callback(response_json))
  }

  saveData(input){
    const input_data = {data: input}
    fetch('http://localhost:3000/tasks', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input_data),
    })
      .then((response) => console.log(response))
  }
}

module.exports = TasksAPi