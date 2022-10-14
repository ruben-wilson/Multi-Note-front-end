class TaskView{
  constructor(api, model){
    this.api = api,
    this.model = model
    this.body = document.querySelector('body')


    this.tasksContainerEL = document.querySelector('#tasksContainer')
    

    this.tasksContainerEL.addEventListener('click', (e)=>{
  
        let xPosition = e.clientX
        let yPosition = e.clientY

        let translatedPosition = `translate3d(${xPosition}px, ${yPosition}px, 0)`
        console.log(translatedPosition)
        this.taskEL = document.querySelector('#tasks')
        if(this.move){
          this.taskEL.style.transform = translatedPosition
          this.move = false;
        }
        this.taskSelected = true;
        this.#setTaskEventListeners()
    })

  


    this.#setTasks()
 
    this.textInputEL = document.querySelector("#tasks-input")

    this.addTaskEL = document.querySelector('#add-task')
    this.addTaskEL.addEventListener("click", () => {
      this.api.saveData(this.textInputEL.value)
      this.createTask(this.textInputEL.value)
    })

   
  }

  createTask(text){
     const div = document.createElement('div');
     div.textContent = text;
     div.className = 'tasks'
     div.id = 'tasks'
     this.tasksContainerEL.append(div);
     this.textInputEL.value = ''
  }

  displayAllTasks(){
    for(const e of this.model.allTasks()){
      const div = document.createElement('div');
      div.textContent = e.description;
      div.className = 'tasks'
      div.id = 'tasks'
      this.tasksContainerEL.append(div);
    }
  }

  #setTasks(){
    this.api.loadData((Response)=>{
      this.model.setTasks(Response)
      this.displayAllTasks()
    })

    
  }
 
  #setTaskEventListeners(){
    this.taskEL.addEventListener('dblclick', ()=>{
      this.move = true;
    })
    // this.taskEL.addEventListener('mousedown', (e)=>{
    //   this.taskEL.addEventListener('mouseup', (e)=>{
    //     this.move = true;
    //     let xPosition = e.clientX
    //     let yPosition = e.clientY

    //     let translatedPosition = `translate3d(${xPosition}px, ${yPosition}px, 0)`
    //     this.taskEL.style.transform = translatedPosition
    //   })
    // })
  }

}

module.exports = TaskView;