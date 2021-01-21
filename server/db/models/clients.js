
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const uuid = require('uuid');
const { createDateAsUTC } = require('./index')
const {pool} = require('../connection')
const uuid_int = require('uuid-int');
const generator = uuid_int(500);


// GET — /Clients | getClients()
// GET — /Clients/:id | getClientById()
// POST — Clients | createClient()
// PUT — /Clients/:id | updateClient()
// DELETE — /Clients/:id | deleteClient()
const getClients = (request, response) => {
    pool.query('SELECT * FROM public."Clients" where status = 1 ORDER BY id_client ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  

const getClientById = (request, response) => {
  const uuid_client = request.params.uuid_client

  pool.query('SELECT * FROM public."Clients" WHERE uuid_client = $1', [uuid_client], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  
  const createClient = (request, response) => {
    console.log(request.body)
    if(request.body.hasOwnProperty('data')){
      const { data } = request.body
      const uuidValue = uuid.v4()
      const dateValue = createDateAsUTC();
      const id = new Date().getTime()%10000000
      
      pool.query('INSERT INTO public."Clients" (uuid_client, id_client, data, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)', [uuidValue, id, data, 1, dateValue, dateValue], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(
            {
                "uuid_client": uuidValue,
                "id_client": id,
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
  
  const updateClient = (request, response) => {
    const uuid = request.params.uuid_client
    const {data} = request.body
    const dateValue = createDateAsUTC();
        
    pool.query(
      'UPDATE  public."Clients" set data = $1 , updated_at = $2  where uuid_client = $3', [data, dateValue, uuid],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(
          {
          "uuid_client": uuid,
          "id_client": 1,
          data,
          "updated_at": dateValue
         }
      )
      }
    )
  }

  
  const deleteClient = (request, response) => {
    const uuid = request.params.uuid_client
    
    const dateValue = createDateAsUTC();
  
    pool.query('UPDATE public."Clients" set status = $1 , updated_at = $2  where uuid_client = $3', [0, dateValue, uuid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send({
        "uuid_client": uuid,
        "id_client": 1,
        "updated_at": dateValue
       })
    })
  }
  
  module.exports = {
    getClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
  }