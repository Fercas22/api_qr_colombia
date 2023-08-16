require('dotenv').config();

const configs = {}

configs.database = {
    host:               process.env.HOST_DB,
    user:               process.env.USER_DB,
    database:           process.env.NAME_DB,
    password:           process.env.PASS_DB,
    connectionLimit:    10
}

module.exports = configs