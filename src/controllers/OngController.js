const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqid')
const generateUniquePassword= require('../utilS/generateUniquePassword')

module.exports = {

    async index (request,response) {
        const ongs = await connection('ongs').select('*')
    
        return response.json(ongs)
    },

    async create(request, response){
        const {name,email,password,cpf,cep,city,district,street,number,whatsapp} = request.body
    const id = generateUniqueId()
    await connection('ongs').insert({
        id,
        password,
        name,
        email,
        cpf,
        cep,
        ong_city:city,
        ong_district:district,
        street,
        number,
        whatsapp,
    })
    

    return response.json({ id,
        password,
        name,
        email,
        cpf,
        cep,
        city,
        district,
        street,
        number,
        whatsapp, })
    }
}