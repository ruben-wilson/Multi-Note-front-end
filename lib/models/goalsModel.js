class GoalsModel{
  constructor(){
    this.goals = []
  }


  setGoals(goals_array){
    this.goals = goals_array
  }

  allGoals(){
    return this.goals;
  }
}

module.exports = GoalsModel;