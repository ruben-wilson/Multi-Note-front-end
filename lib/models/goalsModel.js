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

  addGoal(goal_description){
    this.goals.push({description: goal_description, done: null})
  }

  deleteGoal(){
    this.goals.pop()
  }
}

module.exports = GoalsModel;