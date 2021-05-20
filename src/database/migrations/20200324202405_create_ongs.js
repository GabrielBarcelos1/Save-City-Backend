
exports.up = function(knex) {
 return knex.schema.createTable('ongs',function (table) {
    table.string('id').primary()
    table.string('password').notNullable()
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('cpf').notNullable();
    table.string('cep').notNullable();
    table.string('ong_city').notNullable();
    table.string('ong_district').notNullable();
    table.string('street').notNullable();
    table.string('number').notNullable();
    table.string('whatsapp').notNullable();
 })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs')
};
