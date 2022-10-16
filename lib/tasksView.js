class TaskView{
  constructor(api, model){
    this.api = api,
    this.model = model
    this.body = document.querySelector('body')
    
    this.move = false;
    this.taskCounter = 0
    this.divName;


    this.tasksContainerEL = document.querySelector('#tasksContainer')
    

    this.tasksContainerEL.addEventListener('click', (e)=>{
        let xPosition = e.clientX
        let yPosition = e.clientY

        let translatedPosition = `translate3d(${xPosition}px, ${yPosition}px, 0)`
        console.log(translatedPosition)
        if(this.move){
          this.targetEl = document.querySelector(`#${this.divName}`)
          this.targetEl.style.transform = translatedPosition
          this.move = false;
        }
        this.#setTaskEventListeners()
    })

  


    this.#setTasks()
    this.#setTaskEventListeners()
 
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
     div.className = 'tasks'
     div.id = `tasks${this.taskCounter}`
     this.tasksContainerEL.append(div);
     this.textInputEL.value = ''
  }

  displayAllTasks(){
    for(const e of this.model.allTasks()){
      this.taskCounter += 1
      const div = document.createElement('div');
      div.textContent = e.description;
      div.className = 'tasks'
      div.id = `tasks${this.taskCounter}`
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
    // for(let i = 1; i < this.taskCounter; i++){
    //   const el = document.querySelectorAll(`#tasks`)
    //   el[i].addEventListener('dblclick', (e)=>{
    //    this.#moveTask(e, el)
    // })
    // }
    this.taskELs = document.querySelectorAll('.tasks')
    console.log(this.taskELs)
    this.taskELs.forEach( task =>{
      task.addEventListener('dblclick', ()=>{
      this.move = true;
      this.divName = task.id
    })
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

 #moveTask(e, el){
   let xPosition = e.clientX
   let translatedPosition = `translate3d(${xPosition}px, ${yPosition}px, 0)`
   el.style.transform = translatedPosition
 } 

}

module.exports = TaskView;