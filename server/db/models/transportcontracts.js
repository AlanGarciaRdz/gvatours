
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const uuid = require('uuid');
const { createDateAsUTC } = require('./index');
const {pool} = require('../connection')

// GET — /TransportC | getTransportC()
// GET — /TransportC/:uuid_contract | getTransportCById()
// POST — TransportC | createTransportC()
// PUT — /TransportC/:uuid_contract | updateTransportC()
// DELETE — /TransportC/:uuid_contract | deleteTransportC()
const getTransportC = (request, response) => {
    pool.query('SELECT * FROM public."transport_contracts" where status = 1', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  

const getTransportCById = (request, response) => {
  const uuid_contract = request.params.uuid_contract

  pool.query('SELECT * FROM public."transport_contracts" WHERE uuid_contract = $1', [uuid_contract], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  
  const createTransportC = (request, response) => {
    if(request.body.hasOwnProperty('data') && request.body.hasOwnProperty('data_vehicle')){
      const { data, data_vehicle } = request.body
      const uuidValue = uuid.v4()
      const dateValue = createDateAsUTC();
      pool.query('INSERT INTO public."transport_contracts" (uuid_contract, id_contract, data, data_vehicle, created_at, updated_at, status) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
      [uuidValue, new Date().getTime()%10000000, data, data_vehicle, dateValue, dateValue, 1], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(
            {
                "uuid_contract": uuidValue,
                "id_TransportC": 1,
                data,
                data_vehicle,
                "created_at": dateValue,
                "updated_at": dateValue
            }
            )
      })
    }else{
      throw "data missing"
    }
  }
  
  const updateTransportC = (request, response) => {
    const uuid = request.params.uuid_contract
    if(request.body.hasOwnProperty('data') && request.body.hasOwnProperty('data_vehicle')){
        const { data, data_vehicle } = request.body

        const dateValue = createDateAsUTC();
            
        pool.query(
        'UPDATE  public."transport_contracts" set data = $1, data_vehicle = $2,  updated_at = $3  where "uuid_contract" = $4', 
        [data, data_vehicle, dateValue, uuid],
        (error, results) => {
            if (error) {
            throw error
            }
            response.status(200).send(
            {
            "uuid_contract": uuid,
            "id_TransportC": 1,
            data,
            "updated_at": dateValue
            }
        )
        }
        )
    }else {
        throw "data, data_vehicle"
    }
  }

  
  const deleteTransportC = (request, response) => {
    const uuid = request.params.uuid_contract
    
    const dateValue = createDateAsUTC();
  
    pool.query('UPDATE public."transport_contracts" set status = $1 , updated_at = $2  where "uuid_contract" = $3', 
    [0, dateValue, uuid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send({
        "uuid_contract": uuid,
        "id_TransportC": 1,
        "updated_at": dateValue
       })
    })
  }
  
  module.exports = {
    getTransportC,
    getTransportCById,
    createTransportC,
    updateTransportC,
    deleteTransportC,
  }