const Joi = require('joi')



/**
 * public."Clients" (
    uuid_client uuid NOT NULL,
    id_client integer NOT NULL,
    data jsonb NOT NULL,
    status bigint NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);
 */

module.exports = Joi.object().keys({
    id_client: Joi.string(),
    uuid_client: Joi.string().uuid().required(),
    data: Joi.string(),
    status: Joi.number().integer().min(0).max(2).default(1),
    email: Joi.string().email().required()
})


/**
 * "Cupon" (
    uuid_cupon uuid NOT NULL,
    id_cupon integer NOT NULL,
    data jsonb NOT NULL,
    data_rooms jsonb NOT NULL,
    "data_travelA" jsonb NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);
 */ 
module.exports = Joi.object().keys({
    id_cupon: Joi.string(),
    uuid_cupon: Joi.string().uuid().required(),
    data: Joi.string(),
    data_rooms: Joi.string(),
    data_travelA: Joi.string()
})

/**
 * "Hotels" (
    uuid_hotel uuid NOT NULL,
    id_hotel integer NOT NULL,
    data jsonb NOT NULL,
    status bigint NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);
 */

module.exports = Joi.object().keys({
    id_hotel: Joi.string(),
    uuid_hotel: Joi.string().uuid().required(),
    data: Joi.string(),
    status: Joi.number().integer().min(0).max(2).default(1)
})

/**
 * "Receipts" (
    uuid_receipt uuid NOT NULL,
    id_receipt integer NOT NULL,
    data jsonb NOT NULL,
    relation jsonb NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);
 */

module.exports = Joi.object().keys({
    id_hotel: Joi.string(),
    uuid_hotel: Joi.string().uuid().required(),
    data: Joi.string(),
    status: Joi.number().integer().min(0).max(2).default(1)
})

/**
 * "TravelAgencies" (
    "uuid_travelA" uuid NOT NULL,
    "id_travelA" integer NOT NULL,
    data jsonb NOT NULL,
    status bigint NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);
 */
module.exports = Joi.object().keys({
    id_travelA: Joi.string(),
    uuid_travelA: Joi.string().uuid().required(),
    data: Joi.string(),
    status: Joi.number().integer().min(0).max(2).default(1)
})

/**
 * "Users" (
    uuid_user uuid NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    id_user integer NOT NULL,
    email text NOT NULL,
    role bigint NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);
 */

module.exports = Joi.object().keys({
    id_user: Joi.string(),
    uuid_user: Joi.string().uuid().required(),
    name: Joi.string(),
    email: Joi.string().email().required(),
    role: Joi.number().integer().min(0).max(2).default(1),
    password: Joi.string(),
    status: Joi.number().integer().min(0).max(2).default(1)
})

/**
 * transport_contracts (
    uuid_contract uuid NOT NULL,
    id_contract integer NOT NULL,
    data jsonb NOT NULL,
    data_vehicle jsonb NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);
 */
module.exports = Joi.object().keys({
    id_contract: Joi.string(),
    uuid_contract: Joi.string().uuid().required(),
    data: Joi.string(),
    data_vehicle: Joi.string()
})


function createDateAsUTC() {
    var date = new Date();
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}


const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);

function encryptPassword(plainText){
    const hash = bcrypt.hashSync(plainText, salt);
    return hash;
}

const checkPassword = (reqPassword, foundUser) => {
  console.log(reqPassword)
  console.log(foundUser.password)
    return new Promise((resolve, reject) => 
      bcrypt.compare(reqPassword, foundUser.password, (err, response) => {
          if (err) {
            reject(err)
          }
          else if (response) {
            resolve(response)
          } else {
            reject(new Error('Passwords do not match.'))
          }
      })
    )
  }

//   https://gist.github.com/laurenfazah/f9343ae8577999d301334fc68179b485
const authenticate = (userReq) => {
    findByToken(userReq.token)
      .then((user) => {
        if (user.username == userReq.username) {
          return true
        } else {
          return false
        }
      })
  }
  
  const findByToken = (token) => {
    return database.raw("SELECT * FROM users WHERE token = ?", [token])
      .then((data) => data.rows[0])
  }

  const diffs = (newdata, dbdata) => {
    var result = {};
    
    for(key in newdata) {
        if(dbdata[key] != newdata[key]) {
          result[key] = newdata[key]
          delete dbdata[key]
        };
    }
    
    for(key in dbdata) {
      result[key] = dbdata[key]
    }
    return result;
}



module.exports = {
    createDateAsUTC,
    encryptPassword,
    checkPassword,
    diffs
}










