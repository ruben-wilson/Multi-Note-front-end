const datesFormatter = require('../Components/defaultDatesFormatter.js')

class DefaultController{
  constructor(Api){
    this.api = Api
    this.page = document.querySelector('.page')
    this.datesFormatter = new datesFormatter

    this.data = []

    this.#setDefaults()

    this.createDefaultEL = document.querySelector('#createDefaults')
    this.createDefaultEL.addEventListener('click', ()=>{
      this.#createPreWorkDefault(()=>{
        this.api.resetData()

        this.startTimeEl = document.querySelector('#preWork-StartTime')
        this.endTimeEl = document.querySelector('#preWork-EndTime')
        this.#saveData( this.datesFormatter.returnTimeRange(this.startTimeEl.value, this.endTimeEl.value, 'preWork', 'Pre-Work Time') )

          this.#createWorkDefault(()=>{

            this.startTimeEl = document.querySelector('#Work-StartTime')
            this.endTimeEl = document.querySelector('#Work-EndTime')
            this.#saveData( this.datesFormatter.returnTimeRange(this.startTimeEl.value, this.endTimeEl.value, 'work', 'Work Time') )

              this.#createPostWorkDefault(()=>{

                this.startTimeEl = document.querySelector('#postWork-StartTime')
                this.endTimeEl = document.querySelector('#postWork-EndTime')
                this.#saveData( this.datesFormatter.returnTimeRange(this.startTimeEl.value, this.endTimeEl.value, 'postWork', 'After Work Time') )
                console.log(this.data)
                this.api.saveData(this.data)
                this.#setDefaultRange()
          })
        })
      })
    })
  }
  
  #saveData(data){
    this.data = this.data.concat(data)
  }

  #setDefaultRange(){
    for(const e of this.data){
      this.#createDefault(e.description, e.type, e.time)
    }
  }

  #createDefault(text, type, time){
     const div = document.createElement('div');
     div.textContent = text;
     div.draggable = true;
     div.className = 'defaults'
     div.id = type
     time = time.replace(':', '')
     const boxEl = document.querySelector(`#box${time.slice(0, -2)}00`)
     boxEl.append(div);
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

  #setDefaults(){
    this.api.loadData((response_data) => {
      this.data = response_data
      this.#setDefaultRange()
    })
  }


}

module.exports = DefaultController