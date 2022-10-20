class GoalsApi{

  loadData(callback){
    fetch('http://localhost:3000/goals')
      .then((response) => response.json())
      .then((response_json) => callback(response_json))
  }

  saveData(input){
    const input_data = {data: input}
    fetch('http://localhost:3000/goals', {
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
    console.log(description)
    fetch('http://localhost:3000/goals', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input_data),
    })
      .then((response) => console.log(response))
  }
  
}

module.exports = GoalsApi