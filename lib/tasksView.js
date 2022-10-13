class TaskView{
  constructor(api, model){
    this.api = api,
    this.model = model
    this.body = document.querySelector('body')

    this.#setTasks()
 
    this.textInputEL = document.querySelector("#tasks-input")

    // this.addTaskEL = document.querySelector('#add-task')
    // this.addTaskEL.addEventListener("click", ()=>{
    //   this.createTask(this.textInputEL.value)
    // })
  }

  displayAllTasks(){
    for(const e of this.model.allTasks()){
      const div = document.createElement('div');
      div.textContent = e;
      div.className = 'task'
      this.body.append(div);
    }
  }

  #setTasks(){
    this.api.loadData((Response)=>{
      this.model.setTasks(Response)
    })

    
  }

}

module.exports = TaskView;