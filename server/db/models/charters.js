
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const uuid = require('uuid');
const { createDateAsUTC } = require('./index')
const {pool} = require('../connection')

// GET — /Charters | getCharters()
// GET — /Charters/:uuid_charter | getcharterById()
// POST — Charters | createcharter()
// PUT — /Charters/:uuid_charter | updatecharter() 
// DELETE — /Charters/:uuid_charter | deletecharter()


const getCharters = (request, response) => {
    pool.query('SELECT * FROM public."Charters" where status = 1 ORDER BY id_charter ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
 
  
const getCharterById = (request, response) => {
  const uuid_charter = request.params.uuid_charter
  pool.query('SELECT * FROM public."Charters" WHERE uuid_charter = $1', [uuid_charter], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCharterByIdFE = (request, response) => {
  const uuid_charter = request.params.uuid_charter
  

  pool.query(`SELECT Ch.*, public."Hotels".data as Hotel, public."Clients".data as Cliente, ta.data as TravelAgency`
            +` FROM public."Charters" as Ch `
            +` join public."Clients" on (Ch.data->>'uuid_cliente')::uuid = public."Clients".uuid_client`
            +` join public."Hotels" on (Ch.data->>'uuid_hotel')::uuid = public."Hotels".uuid_hotel`
            +` join public."TravelAgencies" as ta on (Ch.data->>'uuid_agencia')::uuid = ta."uuid_travelA"`
            +` Where Ch.uuid_charter = $1`, [uuid_charter], (error, results) => {
              
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  
  const createCharter = (request, response) => {
    if(request.body.hasOwnProperty('data')){
      const { data} = request.body
      const uuidValue = uuid.v4()
      const dateValue = createDateAsUTC();
      const id = new Date().getTime()%10000000;
      
      pool.query('INSERT INTO public."Charters" (uuid_charter, id_charter, data, created_at, updated_at, status) VALUES ($1, $2, $3, $4, $5, $6)', 
      [uuidValue, id, data, dateValue, dateValue, 1], (error, results) => {
        if (error) {
          throw error
        } 
        response.status(201).send(
            {
                "uuid_charter": uuidValue,
                "id_charter": id,
                data, 
                "created_at": dateValue,
                "updated_at": dateValue 
            }
            )
      })
    }else{
      throw "data is missing"
    }
  }
  
  const updateCharter = (request, response) => {
    const uuid = request.params.uuid_charter
    if(request.body.hasOwnProperty('data')){
        const { data } = request.body

        const dateValue = createDateAsUTC();
            
        pool.query(
        'UPDATE  public."Charters" set data = $1, updated_at = $2  where uuid_charter = $3', 
        [data, dateValue, uuid],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(
                {
                    "uuid_charter": uuid,
                    "id_charter": 1,
                    data,
                    "updated_at": dateValue
                }
            )
        }
        )
    }else{
        throw "data  is missing"
    }
  }

  
  const deleteCharter = (request, response) => {
    const uuid = request.params.uuid_charter
    
    const dateValue = createDateAsUTC();
  
    pool.query('UPDATE public."Charters" set status = $1 , updated_at = $2  where uuid_charter = $3', 
    [0, dateValue, uuid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send({
        "uuid_charter": uuid,
        "id_charter": 1,
        "updated_at": dateValue
       })
    })
  }

  const getClientCharters = (request, response) => {
    const uuid_client = request.params.uuid_client
    
    pool.query(`SELECT Re.* `
            +` FROM public."Charters" as Re `
            +` WHERE Re.data->>'uuid_cliente' = $1`, [uuid_client], (error, results) => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(200).json(results.rows)
    })
  }
  
  module.exports = {
    getCharters,
    getCharterById,
    getCharterByIdFE,
    createCharter,
    updateCharter,
    deleteCharter,
    getClientCharters
  }