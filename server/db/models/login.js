// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/

const { checkPassword, createDateAsUTC } = require('./index')
const crypto = require('crypto')
const {pool} = require('../connection')


const findUser = async (userReq) => {
    const {email} = userReq
    var user = await pool.query('SELECT * FROM public."Users" where status = 1 and email = $1',
    [email])
    
    if(user.rows[0]){
        return user.rows[0]
    }else {
        return []
    }
}

  // crypto ships with node - we're leveraging it to create a random, secure token
   const createToken = () => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, data) => {
        err ? reject(err) : resolve(data.toString('base64'))
      })
    })
  }
  
  const updateUserToken = (token, uuid_user) => {

    const dateValue = createDateAsUTC();
    pool.query(
        'UPDATE  public."Users" set token = $1, updated_at = $2  where uuid_user = $3', 
        [token, dateValue, uuid_user],
        (error, results) => {
          if (error) {
            throw error
          }
          return true
        }
      ) 
  }

// app/models/login.js
const signin = (request, response) => {
    const userReq = request.body
    let user

    console.log(userReq)
    findUser(userReq)
        .then(foundUser => {
        user = foundUser
            return checkPassword(userReq.password, foundUser)
        })
        .then((res) => createToken())
        .then(token => updateUserToken(token, user.uuid_user))
        .then(() => {
        delete user.password
            response.status(200).json(user)
        })
        .catch((err) => console.error(err))
  }


module.exports = {
    signin
}