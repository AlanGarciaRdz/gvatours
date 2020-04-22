
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const uuid = require('uuid');
const { createDateAsUTC } = require('./index');
const {pool} = require('../connection')

// GET — /TravelA | getTravelA()
// GET — /TravelA/:uuid_travelA | getTravelAById()
// POST — TravelA | createTravelA()
// PUT — /TravelA/:uuid_travelA | updateTravelA()
// DELETE — /TravelA/:uuid_travelA | deleteTravelA()
const getTravelA = (request, response) => {
    pool.query('SELECT * FROM public."TravelAgencies" where status = 1', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  

const getTravelAById = (request, response) => {
  const uuid_travelA = request.params.uuid_travelA

  pool.query('SELECT * FROM public."TravelAgencies" WHERE "uuid_travelA" = $1', [uuid_travelA], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  
  const createTravelA = (request, response) => {
    if(request.body.hasOwnProperty('data')){
      const { data } = request.body
      const uuidValue = uuid.v4()
      const dateValue = createDateAsUTC();
      pool.query('INSERT INTO public."TravelAgencies" ("uuid_travelA", "id_travelA", data, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)', 
      [uuidValue, new Date().getTime()%10000000, data, 1, dateValue, dateValue], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(
            {
                "uuid_travelA": uuidValue,
                "id_travelA": 1,
                data,
                "created_at": dateValue,
                "updated_at": dateValue
            }
            )
      })
    }else{
      throw "data missing"
    }
  }
  
  const updateTravelA = (request, response) => {
    const uuid = request.params.uuid_travelA
    const {data} = request.body
    const dateValue = createDateAsUTC();
        
    pool.query(
      'UPDATE  public."TravelAgencies" set data = $1 , updated_at = $2  where "uuid_travelA" = $3', 
      [data, dateValue, uuid],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(
          {
          "uuid_travelA": uuid,
          "id_travelA": 1,
          data,
          "updated_at": dateValue
         }
      )
      }
    )
  }

  
  const deleteTravelA = (request, response) => {
    const uuid = request.params.uuid_travelA
    
    const dateValue = createDateAsUTC();
  
    pool.query('UPDATE public."TravelAgencies" set status = $1 , updated_at = $2  where "uuid_travelA" = $3', 
    [0, dateValue, uuid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send({
        "uuid_travelA": uuid,
        "id_travelA": 1,
        "updated_at": dateValue
       })
    })
  }
  
  module.exports = {
    getTravelA,
    getTravelAById,
    createTravelA,
    updateTravelA,
    deleteTravelA,
  }