const Default_setter = require('../lib/Components/defaultDatesFormatter')

describe('default setter', () => {
  it('it takes a string', ()=>{ 
    default_setter = new Default_setter()
      
    expect(default_setter.returnTimeRange('', '')).toEqual([])
  })
    it('it takes twp strings', ()=>{
      
      default_setter = new Default_setter
    expect(default_setter.returnTimeRange('06:00', '08:00')).toEqual(['06:00', '07:00', '08:00'])
  })
  it('it takes twp strings and returns numbers between', ()=>{
    
    default_setter = new Default_setter
    expect(default_setter.returnTimeRange('06:00', '08:00')).toEqual(['06:00', '07:00', '08:00'])
  })
  it('it takes twp strings and returns numbers between', ()=>{
    
    default_setter = new Default_setter
    expect(default_setter.returnTimeRange('01:00', '09:00')).toEqual(['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00'])
  })
  it('it takes twp strings and returns numbers between', ()=>{
    
    default_setter = new Default_setter
    expect(default_setter.returnTimeRange('08:00', '09:30')).toEqual(['08:00', '09:00'])
  })
  it('it takes twp strings and returns numbers between', ()=>{
    
    default_setter = new Default_setter
    expect(default_setter.returnTimeRange('08:00', '11:00')).toEqual(['08:00', '09:00', '10:00', '11:00'])
  })
  it('it takes two strings and returns numbers between', ()=>{
    
    default_setter = new Default_setter
    expect(default_setter.returnTimeRange('00:00', '03:00')).toEqual(['00:00', '01:00', '02:00', '03:00'])
  })
  it('it takes two strings and returns numbers between', ()=>{
    
    default_setter = new Default_setter
    expect(default_setter.returnTimeRange('20:00', '23:00')).toEqual(['20:00', '21:00', '22:00', '23:00'])
  })
  it('it takes two strings and returns numbers between', ()=>{
    
    default_setter = new Default_setter
    expect(default_setter.returnTimeRange('22:00', '00:00')).toEqual(['22:00', '23:00', '00:00'])
  })
  it('it takes two strings and returns numbers between', ()=>{
    
    default_setter = new Default_setter
    expect(default_setter.returnTimeRange('22:00', '00:00')).toEqual(['22:00', '23:00', '00:00'])
    expect(default_setter.returnTimeRange('20:00', '23:00')).toEqual(['20:00', '21:00', '22:00', '23:00'])
    expect(default_setter.returnTimeRange('00:00', '03:00')).toEqual(['00:00', '01:00', '02:00', '03:00'])
  })
})
