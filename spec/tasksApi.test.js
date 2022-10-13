Api = require('../lib/tasksApi.js')

require('jest-fetch-mock').enableMocks()

describe("tasks API", ()=>{
  it("returns data from the response", ()=>{

    const api = new Api 

     fetch.mockResponseOnce(JSON.stringify(
      ["this is a mocked response"]
    ));

    api.loadData((response)=>{
      expect(response[0]).toEqual("this is a mocked response")
    })

  })


})