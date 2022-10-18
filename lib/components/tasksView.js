

class TaskView{
  constructor(api, model){
    this.api = api,
    this.model = model
    this.body = document.querySelector('body')
    // this.containerEL = document.querySelector('#testContainer')
    this.containerEL = document.querySelector('#testBox')

    this.move = false;
    this.taskCounter = 0
    this.divName;

    this.#setTasks()
 
    this.textInputEL = document.querySelector("#tasks-input")
    this.addTaskEL = document.querySelector('#add-task')
    this.addTaskEL.addEventListener("click", () => {
      this.api.saveData(this.textInputEL.value)
      this.createTask(this.textInputEL.value)
    })

   
  }

  createTask(text){
     this.taskCounter += 1
     const div = document.createElement('div');
     div.textContent = text;
     div.draggable = true;
     div.className = 'tasks'
     div.id = `task${this.taskCounter}`
     div.addEventListener('dragstart', this.#dragStart)
     this.containerEL.append(div);
     this.textInputEL.value = ''
  }

  displayAllTasks(){
    for(const e of this.model.allTasks()){
      this.createTask(e.description)
    }
  }

  #setTasks(){
    this.api.loadData((Response)=>{
      this.model.setTasks(Response)
      this.displayAllTasks()
    })

    
  }
 
  #dragStart(e) {
    console.log(e.dataTransfer.setData('text/plain', e.target.id))
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

}

module.exports = TaskView;