class DefaultsGoal{

  loadData(callback){
    fetch('https://mulitnoteatlas-env.eba-g2x45sdw.eu-west-2.elasticbeanstalk.com/defaults')
    .then((response) => response.json())
    .then((response_json) => callback(response_json))
  }

  saveData(input){
    const input_data = {data: input}
    fetch('https://mulitnoteatlas-env.eba-g2x45sdw.eu-west-2.elasticbeanstalk.com/defaults', {
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
    fetch('https://mulitnoteatlas-env.eba-g2x45sdw.eu-west-2.elasticbeanstalk.com/defaults', {
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