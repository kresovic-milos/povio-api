exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('likes', table => {
      table
        .integer('from')
        .unsigned()
        .references('id')
        .inTable('users');
      table
        .integer('to')
        .unsigned()
        .references('id')
        .inTable('users');
      table.unique(['from', 'to']);
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('likes')]);
};
