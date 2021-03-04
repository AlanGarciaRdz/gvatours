
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const uuid = require('uuid');
const { createDateAsUTC } = require('./index')
const {pool} = require('../connection')


// GET — /Cupon | getCupon()
// GET — /Cupon/:uuid_cupon | getCuponById()
// POST — Cupon | createCupon()
// PUT — /Cupon/:uuid_cupon | updateCupon()
// DELETE — /Cupon/:uuid_cupon | deleteCupon()
const getCupon = (request, response) => {
    pool.query(`SELECT Cu.* , public."Hotels".data as Hotel, public."Clients".data as Cliente, ta.data as TravelAgency`
    +` FROM public."Cupon" as Cu `
    +` join public."Hotels" on (Cu.data->>'uuid_hotel')::uuid = public."Hotels".uuid_hotel`
    +` join public."Clients" on (Cu.data->>'uuid_cliente')::uuid = public."Clients".uuid_client`
    +` join public."TravelAgencies" as ta on (Cu."data_travelA"->>'uuid_agencia')::uuid = ta."uuid_travelA"`
    +` ORDER BY updated_at DESC`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  

const getCuponById = (request, response) => {
  const uuid_cupon = request.params.uuid_cupon

  pool.query('SELECT * FROM public."Cupon" WHERE uuid_cupon = $1', [uuid_cupon], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCuponByIdFE = (request, response) => {
  const uuid_cupon = request.params.uuid_cupon

  pool.query(`SELECT Cu.* , public."Hotels".data as Hotel, public."Clients".data as Cliente, ta.data as TravelAgency`
            +` FROM public."Cupon" as Cu `
            +` join public."Hotels" on (Cu.data->>'uuid_hotel')::uuid = public."Hotels".uuid_hotel`
            +` join public."Clients" on (Cu.data->>'uuid_cliente')::uuid = public."Clients".uuid_client`
            +` join public."TravelAgencies" as ta on (Cu."data_travelA"->>'uuid_agencia')::uuid = ta."uuid_travelA"`
            +` WHERE Cu.uuid_cupon = $1`, [uuid_cupon], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCuponByClientId = (request, response) => {
  const uuid_client = request.params.uuid_client


  pool.query(`SELECT Cu.* `
            +` FROM public."Cupon" as Cu `
            +` WHERE Cu.data->>'uuid_cliente' = $1`, [uuid_client], (error, results) => {
    if (error) {
      console.log(error)
      throw error
    }

    
    response.status(200).json(results.rows)
  })
}
  
  const createCupon = (request, response) => {
    if(request.body.hasOwnProperty('data') && request.body.hasOwnProperty('data_rooms') && request.body.hasOwnProperty('data_travelA')){
      const { data, data_rooms, data_travelA } = request.body
      const uuidValue = uuid.v4()
      const dateValue = createDateAsUTC();
      const id = new Date().getTime()%10000000;

      pool.query('INSERT INTO public."Cupon" (uuid_cupon, id_cupon, data, data_rooms, "data_travelA", created_at, updated_at, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
      [uuidValue, id, data, data_rooms, data_travelA, dateValue, dateValue, 1], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(
            {
                "uuid_cupon": uuidValue,
                "id_Cupon": id,
                data,
                data_rooms,
                data_travelA,
                "created_at": dateValue,
                "updated_at": dateValue
            }
            )
      })
    }else{
      console.error("not properties data or data_rooms data_travelA")
      throw "data missing"
    }
  }
  
  const updateCupon = (request, response) => {
    const uuid = request.params.uuid_cupon
    if(request.body.hasOwnProperty('data') && request.body.hasOwnProperty('data_rooms') && request.body.hasOwnProperty('data_travelA')){
        const { data, data_rooms, data_travelA } = request.body
        const dateValue = createDateAsUTC();
            
        pool.query(
        'UPDATE  public."Cupon" set data = $1, data_rooms = $2, "data_travelA" = $3, updated_at = $4  where uuid_cupon = $5', 
        [data, data_rooms, data_travelA, dateValue, uuid],
        (error, results) => {
            if (error) {
            throw error
            }
            response.status(200).send(
            {
            "uuid_cupon": uuid,
            "id_Cupon": 1,
            data,
            data_rooms,
            data_travelA,
            "updated_at": dateValue
            }
        )
        }
        )
    }else{
        throw "data missing"
    }
  }

  
  const deleteCupon = (request, response) => {
    const uuid = request.params.uuid_cupon
    
    const dateValue = createDateAsUTC();
  
    pool.query('UPDATE public."Cupon" set status = $1 , updated_at = $2  where uuid_cupon = $3', 
    [0, dateValue, uuid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send({ 
        "uuid_cupon": uuid,
        "id_Cupon": 1,
        "updated_at": dateValue
       })
    })
  }
  
  module.exports = {
    getCupon,
    getCuponById,
    createCupon,
    updateCupon,
    deleteCupon,
    getCuponByIdFE,
    getCuponByClientId
  }