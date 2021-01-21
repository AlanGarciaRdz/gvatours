
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const uuid = require('uuid');
const { createDateAsUTC } = require('./index')
const {pool} = require('../connection')

// GET — /Receipts | getReceipts()
// GET — /Receipts/:uuid_receipt | getReceiptById()
// POST — Receipts | createReceipt()
// PUT — /Receipts/:uuid_receipt | updateReceipt()
// DELETE — /Receipts/:uuid_receipt | deleteReceipt()

const getReceipts = (request, response) => {
    pool.query('SELECT * FROM public."Receipts" where status = 1 ORDER BY id_receipt ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
 
  const getClientReceipts = (request, response) => {
    const uuid_client = request.params.uuid_client
    
    pool.query(`SELECT Re.* `
            +` FROM public."Receipts" as Re `
            +` WHERE Re.data->>'uuid_cliente' = $1`, [uuid_client], (error, results) => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(200).json(results.rows)
    })
  }

  const getClientReceiptsANDCupon = (request, response) => {
    pool.query('SELECT * FROM public."Receipts" where status = 1 ORDER BY id_receipt ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  

const getReceiptById = (request, response) => {
  const uuid_receipt = request.params.uuid_receipt

  pool.query('SELECT * FROM public."Receipts" WHERE uuid_receipt = $1', [uuid_receipt], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getReceiptByIdFE = (request, response) => {
  const uuid_receipt = request.params.uuid_receipt

  pool.query(`SELECT Re.*, public."Clients".data as Cliente`
            +` FROM public."Receipts" as Re `
            +` join public."Clients" on (Re.data->>'uuid_cliente')::uuid = public."Clients".uuid_client`
            +` WHERE Re.uuid_receipt = $1`, [uuid_receipt], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  
  const createReceipt = (request, response) => {
    if(request.body.hasOwnProperty('data') && request.body.hasOwnProperty('relation')){
      const { data, relation } = request.body
      const uuidValue = uuid.v4()
      const dateValue = createDateAsUTC();
      const id = new Date().getTime()%10000000;
      
      pool.query('INSERT INTO public."Receipts" (uuid_receipt, id_receipt, data, relation, created_at, updated_at, status) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
      [uuidValue, id, data, relation, dateValue, dateValue, 1], (error, results) => {
        if (error) {
          throw error
        } 
        response.status(201).send(
            {
                "uuid_receipt": uuidValue,
                "id_Receipt": id,
                data, 
                relation,
                "created_at": dateValue,
                "updated_at": dateValue 
            }
            )
      })
    }else{
      throw "data or relation is missing"
    }
  }
  
  const updateReceipt = (request, response) => {
    const uuid = request.params.uuid_receipt
    if(request.body.hasOwnProperty('data') && request.body.hasOwnProperty('relation')){
        const { data, relation } = request.body

        const dateValue = createDateAsUTC();
            
        pool.query(
        'UPDATE  public."Receipts" set data = $1, relation = $2, updated_at = $3  where uuid_receipt = $4', 
        [data, relation, dateValue, uuid],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(
                {
                    "uuid_receipt": uuid,
                    "id_Receipt": 1,
                    data,
                    relation,
                    "updated_at": dateValue
                }
            )
        }
        )
    }else{
        throw "data , relation"
    }
  }

  
  const deleteReceipt = (request, response) => {
    const uuid = request.params.uuid_receipt
    
    const dateValue = createDateAsUTC();
  
    pool.query('UPDATE public."Receipts" set status = $1 , updated_at = $2  where uuid_receipt = $3', 
    [0, dateValue, uuid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send({
        "uuid_receipt": uuid,
        "id_Receipt": 1,
        "updated_at": dateValue
       })
    })
  }
  
  module.exports = {
    getReceipts,
    getReceiptById,
    createReceipt,
    updateReceipt,
    deleteReceipt,
    getClientReceipts,
    getReceiptByIdFE
  }