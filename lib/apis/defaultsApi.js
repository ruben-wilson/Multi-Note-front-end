class DefaultsGoal{

  loadData(callback){
    fetch('https://multinote-backend.herokuapp.com/defaults')
    .then((response) => response.json())
    .then((response_json) => callback(response_json))
  }

  saveData(input){
    const input_data = {data: input}
    fetch('https://multinote-backend.herokuapp.com/defaults', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input_data),
    })
      .then((response) => console.log(response))
  }

  resetData(){
    const data = {data: 'null'};
    fetch('https://multinote-backend.herokuapp.com/defaults', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
      .then((response) => console.log(response))
  }



} 

module.exports = DefaultsGoal