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
      this.createGoal(this.textInputEL.value)
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

  #setGoals(){
    this.api.loadData((response)=>{
      this.model.setGoals(response)
      this.displayAllGoals()
    })
  }
 

}

module.exports = goalsController;