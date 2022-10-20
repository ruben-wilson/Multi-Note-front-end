class goalsController{
  constructor(api, model){
    this.api = api;
    this.model = model;
    
    this.goalsContainerEL = document.querySelector('.goalsContainer');

    this.#setGoals();

    this.textInputEL = document.querySelector('#input')

    this.addGoalEl = document.querySelector("#add-goal")
    this.addGoalEl.addEventListener('click', ()=>{
      this.api.saveData(this.textInputEL.value)
      this.model.addGoal(this.textInputEL.value)
      this.createGoal(this.textInputEL.value)
    })

    this.deleteGoalsEl = document.querySelector('#delete-goal-button')
    this.deleteGoalsEl.addEventListener('click', () => {
      this.deleteGoal()
      this.model.deleteGoal()
      console.log(this.model.allGoals())
    })
  }

  createGoal(text){
    const div = document.createElement('div');
    div.textContent = text;
    div.draggable = true;
    div.className = 'goals'
    div.id = 'goal'
    this.goalsContainerEL.append(div)
    this.textInputEL.value = ''
  }
  

  displayAllGoals(){
    for(const goal of this.model.allGoals()){
        this.createGoal(goal.description);
    }
  }

  deleteGoal(){
    const goals_array = this.model.allGoals()
    this.api.deleteData(goals_array.reverse()[0].description)
    console.log(goals_array.reverse()[0].description)
    let goalToDelete = document.querySelectorAll('.goals')
    goalToDelete = goalToDelete[goalToDelete.length - 1]
    goalToDelete.parentNode.removeChild(goalToDelete)
    location.reload()
  }

  #setGoals(){
    this.api.loadData((response)=>{
      this.model.setGoals(response)
      this.displayAllGoals()
    })
  }
 

}

module.exports = goalsController;