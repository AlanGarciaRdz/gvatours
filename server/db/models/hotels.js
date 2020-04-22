
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const uuid = require('uuid');
const { createDateAsUTC } = require('./index');
const {pool} = require('../connection')

// GET — /Hotel | getHotel()
// GET — /Hotel/:uuid_hotel | getHotelById()
// POST — Hotel | createHotel()
// PUT — /Hotel/:uuid_hotel | updateHotel()
// DELETE — /Hotel/:uuid_hotel | deleteHotel()
const getHotel = (request, response) => {
    pool.query('SELECT * FROM public."Hotels" where status = 1', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  

const getHotelById = (request, response) => {
  const uuid_hotel = request.params.uuid_hotel

  pool.query('SELECT * FROM public."Hotels" WHERE uuid_hotel = $1', [uuid_hotel], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  
  const createHotel = (request, response) => {
    if(request.body.hasOwnProperty('data')){
      const { data } = request.body
      const uuidValue = uuid.v4()
      const dateValue = createDateAsUTC();
      pool.query('INSERT INTO public."Hotels" ("uuid_hotel", "id_hotel", data, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)', 
      [uuidValue, new Date().getTime()%10000000, data, 1, dateValue, dateValue], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(
            {
                "uuid_hotel": uuidValue,
                "id_hotel": 1,
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
  
  const updateHotel = (request, response) => {
    const uuid = request.params.uuid_hotel
    const {data} = request.body
    const dateValue = createDateAsUTC();
    pool.query(
      'UPDATE  public."Hotels" set data = $1 , updated_at = $2  where "uuid_hotel" = $3', 
      [data, dateValue, uuid],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(
          {
          "uuid_hotel": uuid,
          "id_hotel": 1,
          data,
          "updated_at": dateValue
         }
      )
      }
    )
  }

  
  const deleteHotel = (request, response) => {
    const uuid = request.params.uuid_hotel 
    
    const dateValue = createDateAsUTC();
  
    pool.query('UPDATE public."Hotels" set status = $1 , updated_at = $2  where "uuid_hotel" = $3', 
    [0, dateValue, uuid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send({
        "uuid_hotel": uuid,
        "id_hotel": 1,
        "updated_at": dateValue
       })
    })
  }
  
  module.exports = {
    getHotel,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel,
  }