
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const uuid = require('uuid');
const { createDateAsUTC } = require('./index');
const {pool} = require('../connection');
const { response } = require('express');

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

const getTransportCFiltrados = (request, response) => {
  const fecha_inicio = request.params.inicio;
  const fecha_fin = request.params.fin;

  pool.query(`SELECT * FROM public."transport_contracts" as TC where status = 1 and TC.data->>'fecha_contrato_interna' >= '${fecha_inicio}' and TC.data->>'fecha_contrato_interna' <='${fecha_fin}'`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  

const getTransportCById = (request, response) => {
  const uuid_contract = request.params.uuid_contract
  console.log(request.params.uuid_contract)

  pool.query('SELECT * FROM public."transport_contracts" WHERE uuid_contract = $1', [uuid_contract], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTransportCByIdFE = (request, response) => {
  const uuid_contract = request.params.uuid_contract

  pool.query(`SELECT to_jsonb(p) as Contrato `
  +` FROM  ( `
  +` SELECT TC.*, public."Clients".data as Cliente, c.receipts as data_receipts `
  +` FROM public.transport_contracts as TC `
  +` join public."Clients" on (TC.data->>'uuid_cliente')::uuid = public."Clients".uuid_client `
  +` LEFT   JOIN LATERAL ( `
  +` 	 SELECT jsonb_agg( `
  +` 		  CASE WHEN  R.uuid_receipt IS NOT NULL `
  +` 		  THEN jsonb_build_object('receipt', R) `
  +` 		  ELSE c.elem END) AS receipts `
			
  +` 	 FROM jsonb_array_elements(TC.data->'uuid_receipts') as c(elem) `
  +` 	 JOIN public."Receipts" R on R.uuid_receipt::uuid = (elem->>'uuid_receipt')::uuid `
  +` 	 where R.status = 1`

  +` 	)c ON true `
  +` WHERE TC.uuid_contract = $1 `
  +` ) p;`, [uuid_contract], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  
  const createTransportC = (request, response) => {
    
    if(request.body[0].hasOwnProperty('data') && request.body[0].hasOwnProperty('data_vehicle')){
      const { data, data_vehicle } = request.body[0]
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
      throw "data missing - data - data_vehicle"
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
    getTransportCByIdFE,
    createTransportC,
    updateTransportC,
    deleteTransportC,
    getTransportCFiltrados
  }