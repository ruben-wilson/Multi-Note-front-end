
class default_setter{

  constructor(){
    this.num1 = null
    this.num2 = null
  }

  returnTimeRange(string1, string2, type, description){
    this.num1 = parseInt(string1.replace(':', ''))
    this.num2 = parseInt(string2.replace(':', ''))
    let range;
 
    if(this.num2 == 0){
        range = (2400 - this.num1)/100
      }else{
        range = (this.num2 - this.num1)/100
      }

   let times_array = this.#makeRangeOfInts(range)
    
   let times_as_string = []
   times_array.forEach( num => { this.#stringTimeToIntTime(times_as_string, num)})

   let correct_time_format = []
   times_as_string.forEach( time => { this.#ConvertMidnightToZeros(correct_time_format, time) })

   
   let output = []
   correct_time_format.forEach( time => {  output.push({time: time, type: type, description: description})   })

   return output
  }

  #makeRangeOfInts(range){
      let array = []
      for(let i = 0; i <= range; i ++){
      let time = `${this.num1}`
      array.push(time)
      this.num1 += 100;
    }
    return array
  }

  #stringTimeToIntTime(times_as_string, num){
    if(num < 1000){
        if(num == 0){
        num.toString()
        let time = '00:00'
        times_as_string.push(time)
        }else{
        num.toString()
        let time = `0${num.at(0)}:${num.substring(1,3)}`
        times_as_string.push(time)
        }
      }else{
        num.toString()
        let time = `${num.substring(0,2)}:${num.substring(2,4)}`
        times_as_string.push(time)
      }
  }

  #ConvertMidnightToZeros(output_array, time){
    if(time === '24:00'){
      time = '00:00'
      output_array.push(time)
    }else{
      output_array.push(time)
    }
  }

  
}


module.exports = default_setter