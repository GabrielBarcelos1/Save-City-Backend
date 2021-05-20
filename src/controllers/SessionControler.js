const connection = require('../database/connection')
module.exports = {
    async create(request, response){
        const { email } = request.body
        const { password } = request.body 

        const ong = await connection('ongs')
        .where('email', email)
        .select('name','id', 'password')
        .first()
       console.log(`ong`, ong)
        if(!ong || ong.password !== password){
            return response.status(400).json({error: 'no ONG found with this ID or Password'})
        }
        return response.json(ong)
    }
}