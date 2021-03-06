
exports.up = function(knex) {
  return knex.schema.createTable('incidents',function(table){
    table.increments()
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.string('cep').notNullable();
    table.string('city').notNullable();
    table.string('district').notNullable();
    table.string('street').notNullable();
    table.string('number').notNullable();
    table.string('type').notNullable();
    table.string('situation').notNullable();
    table.string('ong_id').notNullable()
    table.foreign('ong_id').references('id').inTable('ongs')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents')
};
