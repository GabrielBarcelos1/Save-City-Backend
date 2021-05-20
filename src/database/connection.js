const knext = require('knex')
const configuration = require('../../knexfile')
const config =  configuration.development

const connection = knext(config)

module.exports = connection