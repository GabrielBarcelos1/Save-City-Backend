const connection = require('../database/connection')

module.exports = {
    async index (request,response) {
        const {page = 1} = request.query

        const [count] = await connection('incidents')
        .count()
        response.header('x-total-count',count['count'])
        const incidents = await connection('incidents')
        .join('ongs','ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
        'incidents.*', 
        'ongs.name',
        'ongs.email',
        'ongs.ong_city',
        'ongs.ong_district',
        'ongs.whatsapp',])
        console.log(incidents[0].count = count['count'])
        return response.json(incidents)
    },
    async withFilterCelesc (request,response) {
        const {page = 1} = request.query

        const [count] = await connection('incidents')
        .count()
        response.header('x-total-count',count['count'])
        const incidents = await connection('incidents')
        .join('ongs','ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .where('type', 'celesc')
        .select([
        'incidents.*', 
        'ongs.name',
        'ongs.email',
        'ongs.ong_city',
        'ongs.ong_district',
        'ongs.whatsapp',])
        console.log(incidents[0].count = count['count'])
        return response.json(incidents)
    },
    async withFilterCasan (request,response) {
        const {page = 1} = request.query

        const [count] = await connection('incidents')
        .count()
        response.header('x-total-count',count['count'])
        const incidents = await connection('incidents')
        .join('ongs','ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .where('type', 'casan')
        .select([
        'incidents.*', 
        'ongs.name',
        'ongs.email',
        'ongs.ong_city',
        'ongs.ong_district',
        'ongs.whatsapp',])
        console.log(incidents[0].count = count['count'])
        return response.json(incidents)
    },
    async withFilterComcap (request,response) {
        const {page = 1} = request.query

        const [count] = await connection('incidents')
        .count()
        response.header('x-total-count',count['count'])
        const incidents = await connection('incidents')
        .join('ongs','ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .where('type', 'comcap')
        .select([
        'incidents.*', 
        'ongs.name',
        'ongs.email',
        'ongs.ong_city',
        'ongs.ong_district',
        'ongs.whatsapp',])
        console.log(incidents[0].count = count['count'])
        return response.json(incidents)
    },
async create(request, response){
    const{title, description ,cep, city, district, street, number, type} = request.body
    const ong_id = request.headers.authorization

  try{
    const a = await connection('incidents').insert({
      title,
      description,
      cep,
      city,
      district,
      street,
      number,
      type,
      ong_id
  })
  return response.json(a)
  }catch(err){
    console.log(err)
  } 
},
async getById(request, response){
  const { id } = request.params;
  const ong_id = request.headers.authorization;

  console.log(`id, ong_id`, id, ong_id)

  const incident = await connection('incidents')
  .where('incidents.id', id)
  .select('*')
  .first()

  

  console.log(`incident`, incident)

  if (incident.ong_id != ong_id) {
    return response.status(401).json({
      error: 'Operation not permited.'
    });
  }


  return response.json(incident)

},
async update(request, response){
  const{title, description ,cep, city, district, street, number, type} = request.body
  const { id } = request.params;
  const ong_id = request.headers.authorization;

  console.log(`id, ong_id`, id, ong_id)

  const incident = await connection('incidents')
  .where('incidents.id', id)
  .select('*')
  .first()

  

  console.log(`incident`, incident)

  if (incident.ong_id != ong_id) {
    return response.status(401).json({
      error: 'Operation not permited.'
    });
  }
  
  await connection('incidents')
  .update({
    title,
    description,
    cep,
    city,
    district,
    street,
    type,
    number,
    ong_id
  })
  .where('id', id)

  return response.json({})

},
async delete(request, response){
    const { id } = request.params;
    const ong_id = request.headers.authorization;
  
    const incident = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first();
  
    if (incident.ong_id != ong_id) {
      return response.status(401).json({
        error: 'Operation not permited.'
      });
    }
  
    await connection('incidents').where('id',id).delete();
  
    return response.status(204).send();
  
  }
}
