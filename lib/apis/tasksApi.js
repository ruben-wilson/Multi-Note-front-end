class TasksAPi{

  loadData(callback){
    
    fetch('https://mulitnoteatlas-env.eba-g2x45sdw.eu-west-2.elasticbeanstalk.com/tasks')
      .then((response) => response.json())
      .then((response_json) => callback(response_json))
  }

  saveData(description, time, date){
    const input_data = {description: description, time: time, date: date}
    fetch('https://mulitnoteatlas-env.eba-g2x45sdw.eu-west-2.elasticbeanstalk.com/tasks', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input_data),
    })
      .then((response) => console.log(response))
  }

  deleteData(description){
    const input_data = {data: description}
    fetch('https://mulitnoteatlas-env.eba-g2x45sdw.eu-west-2.elasticbeanstalk.com/tasks', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input_data),
    })
      .then((response) => console.log(response))
  }

  
}

module.exports = TasksAPi