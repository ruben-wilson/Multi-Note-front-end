class DefaultController{
  constructor(){
    this.page = document.querySelector('.page')

    this.createDefaultEL = document.querySelector('#createDefaults')
    this.createDefaultEL.addEventListener('click', ()=>{
      this.#createPreWorkDefault(()=>{
        this.#createWorkDefault(()=>{
          this.#createPostWorkDefault(()=>{
            console.log('suck it magggit')
          })
        })
      })
    })
  }
  

  #createPreWorkDefault(callback){
      console.log('1')
      this.containerDiv = document.createElement('div')
      this.containerDiv.id = 'testContainer'

      const startLabelEl = document.createElement('small')
      startLabelEl.textContent = 'start of preWorkTime'
       
      const startTimeEl = document.createElement('input')
      startTimeEl.type = 'time'
      startTimeEl.id = 'preWork-StartTime'

      const endLabelEl = document.createElement('small')
      endLabelEl.textContent = 'end of preWorkTime'

      const endTimeEl = document.createElement('input')
      endTimeEl.type = 'time'
      endTimeEl.id = 'preWork-EndTime'

      const preButtonEl = document.createElement('button')
      preButtonEl.id = 'setDefault-preWork'
      preButtonEl.innerText = 'set preWorkTime'

      this.containerDiv.append(startLabelEl, startTimeEl, endLabelEl, endTimeEl, preButtonEl)
      this.page.append(this.containerDiv)

     preButtonEl.addEventListener('click', (callback))
  }

  #createWorkDefault(callback){
     console.log('2')
      this.containerDiv.remove()

      this.containerDiv = document.createElement('div')
      this.containerDiv.id = 'testContainer'

      const startLabelEl = document.createElement('small')
      startLabelEl.textContent = 'start of WorkTime'
       
      const startTimeEl = document.createElement('input')
      startTimeEl.type = 'time'
      startTimeEl.id = 'Work-StartTime'

      const endLabelEl = document.createElement('small')
      endLabelEl.textContent = 'end of WorkTime'

      const endTimeEl = document.createElement('input')
      endTimeEl.type = 'time'
      endTimeEl.id = 'Work-EndTime'

      const workButtonEl = document.createElement('button')
      workButtonEl.id = 'setDefault-Work'
      workButtonEl.innerText = 'set WorkTime'

      this.containerDiv.append(startLabelEl, startTimeEl, endLabelEl, endTimeEl, workButtonEl)
      this.page.append(this.containerDiv)

     workButtonEl.addEventListener('click', (callback))
  }

  #createPostWorkDefault(callback){
     console.log('3')
      this.containerDiv.remove()
      this.containerDiv = document.createElement('div')
      this.containerDiv.id = 'testContainer'

      const startLabelEl = document.createElement('small')
      startLabelEl.textContent = 'start of Post-WorkTime'
       
      const startTimeEl = document.createElement('input')
      startTimeEl.type = 'time'
      startTimeEl.id = 'postWork-StartTime'

      const endLabelEl = document.createElement('small')
      endLabelEl.textContent = 'end of postWorkTime'

      const endTimeEl = document.createElement('input')
      endTimeEl.type = 'time'
      endTimeEl.id = 'postWork-EndTime'

      const postButtonEl = document.createElement('button')
      postButtonEl.id = 'setDefault-Work'
      postButtonEl.innerText = 'set post-WorkTime'

      this.containerDiv.append(startLabelEl, startTimeEl, endLabelEl, endTimeEl, postButtonEl)
      this.page.append(this.containerDiv)

     postButtonEl.addEventListener('click', (callback))
  }


}

module.exports = DefaultController