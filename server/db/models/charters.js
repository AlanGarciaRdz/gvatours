
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const uuid = require('uuid');
const { createDateAsUTC, diffs } = require('./index')
const {pool} = require('../connection')

// GET — /Charters | getCharters()
// GET — /Charters/:uuid_charter | getcharterById()
// POST — Charters | createcharter()
// PUT — /Charters/:uuid_charter | updatecharter() 
// DELETE — /Charters/:uuid_charter | deletecharter()


const getCharters = (request, response) => {
  
    pool.query(`SELECT Ch.*, public."Hotels".data as Hotel, public."Clients".data as Cliente, ta.data as TravelAgency`
    +` FROM public."Charters" as Ch `
    +` join public."Clients" on (Ch.data->>'uuid_cliente')::uuid = public."Clients".uuid_client`
    +` join public."Hotels" on (Ch.data->>'uuid_hotel')::uuid = public."Hotels".uuid_hotel`
    +` join public."TravelAgencies" as ta on (Ch.data->>'uuid_agencia')::uuid = ta."uuid_travelA"`
    +` where Ch.status = 1 ORDER BY updated_at DESC`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getChartersFiltro = (request, response) => {
    const Iniciales = request.params.iniciales ? request.params.iniciales.trim() : ''

    const filter = ` and Ch.data->>'folio_papeleta' LIKE '${ Iniciales }%' `

    pool.query(`SELECT Ch.*, public."Hotels".data as Hotel, public."Clients".data as Cliente, ta.data as TravelAgency, Users.data as Users`
    +` FROM public."Charters" as Ch `
    +` join public."Clients" on (Ch.data->>'uuid_cliente')::uuid = public."Clients".uuid_client`
    +` join public."Hotels" on (Ch.data->>'uuid_hotel')::uuid = public."Hotels".uuid_hotel`
    +` join public."TravelAgencies" as ta on (Ch.data->>'uuid_agencia')::uuid = ta."uuid_travelA"`
    +` join public."Users" as Users on (Ch.data->>'uuid_usuario')::uuid = Users.uuid_user`
    +` where Ch.status = 1  ${Iniciales ? filter : '' } ORDER BY updated_at DESC `, (error, results) => { 
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
            +` Where Ch.uuid_charter = $1 `, [uuid_charter], (error, results) => {
              
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
      
      const folio = data.folio_papeleta ? data.folio_papeleta : ''
      pool.query(`SELECT uuid_charter, id_charter from public."Charters" as Ch where Ch.data->>'folio_papeleta' = $1`,
       [folio],
        (error, res_query) => {
          if (error) {
            throw error
          }
          
          if(res_query.rowCount == 0){
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
            response.status(409).send(`folio papeleta: ${folio} repetido`);
          }
          
        })

      
      
    }else{
      throw "data is missing"
    }
  }
  
  const updateCharter = (request, response) => {
    const uuid = request.params.uuid_charter
    if(request.body.hasOwnProperty('data')){
        const { data } = request.body
        let dbdata;
        pool.query('SELECT * FROM public."Charters" WHERE uuid_charter = $1', [uuid], (error, results) => {
          if (error) {
            throw error
          }
           
           dbdata = diffs(data, results.rows[0].data) //  VALIDATE WHICH KEY ITS UPDATING
        })

        

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
                    data,
                    "updated_at": dateValue
                }
            )
        })
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

  const rollbackCharter = (request, response) => {
    const uuid = request.params.uuid_charter
    
    const dateValue = createDateAsUTC();
  
    pool.query('UPDATE public."Charters" set status = $1 , updated_at = $2  where uuid_charter = $3', 
    [1, dateValue, uuid], (error, results) => {
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
    getChartersFiltro,
    getCharterById,
    getCharterByIdFE,
    createCharter,
    updateCharter,
    deleteCharter,
    rollbackCharter,
    getClientCharters
  }