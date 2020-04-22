
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const uuid = require('uuid');
const { createDateAsUTC, encryptPassword } = require('./index')
const {pool} = require('../connection')

// GET — /Users | getUsers()
// GET — /Users/:id | getUserById()
// POST — Users | createUser()
// PUT — /Users/:id | updateUser()
// DELETE — /Users/:id | deleteUser()
const getUsers = (request, response) => {
    pool.query('SELECT * FROM public."Users" where status = 1 ORDER BY id_User ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
  
const getUserById = (request, response) => {
  const uuid_user = request.params.uuid_user

  pool.query('SELECT * FROM public."Users" WHERE uuid_user = $1', [uuid_user], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  
  const createUser = (request, response) => {
    if(request.body.hasOwnProperty('name') && request.body.hasOwnProperty('password') && request.body.hasOwnProperty('email') ){
      const { name, password, email, role } = request.body
      const uuidValue = uuid.v4()
      const pass = encryptPassword(password);
      const dateValue = createDateAsUTC();

      pool.query('INSERT INTO public."Users" (uuid_user, password, name, id_user, email, role, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
        [uuidValue,  pass, name, 1, email, role, 1, dateValue, dateValue], (error, results) => {
        if (error) {
          throw error
        }

        response.status(201).send(
            {
                "status": 201,
                "uuid_User": uuidValue,
                name, email, role, pass,
                "created_at": dateValue,
                "updated_at": dateValue
            }
        )
      })
    }else{
      console.log(request.body)
      throw "data missing"
    }
  }

  
  
  const updateUser = (request, response) => {
    const uuid = request.params.uuid_user
    const { name, password, email, role } = request.body
    const dateValue = createDateAsUTC();
    
    if(request.body.hasOwnProperty('name') && request.body.hasOwnProperty('password') && request.body.hasOwnProperty('email') ){
        const pass = encryptPassword(password);
        pool.query(
            'UPDATE  public."Users" set name = $2, password = $3, email = $4, role = $5, updated_at = $6  where uuid_user = $1', 
            [uuid, name, pass, email, role, dateValue],
            (error, results) => {
              if (error) {
                throw error
              }
              response.status(200).send(
                {
                "status": 200,
                "uuid_user": uuid,
                name, email, role,
                "updated_at": dateValue
               }
            )
            }
          ) 
        }else{
            console.log(request.body)
            throw "data missing"
        }
    
  }

  
  const deleteUser = (request, response) => {
    const uuid = request.params.uuid_user
    
    const dateValue = createDateAsUTC();
    console.log()
  
    pool.query('UPDATE public."Users" set status = $1 , updated_at = $2  where uuid_user = $3', 
    [0, dateValue, uuid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send({
        "status": 200,  
        "uuid_user": uuid,
        "updated_at": dateValue
       })
    })
  }
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }