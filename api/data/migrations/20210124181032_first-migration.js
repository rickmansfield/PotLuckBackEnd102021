exports.up = function (knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('user_id');
      table.string('username')
        .notNullable()
        .unique();
      table.string('password')
        .notNullable();
    })
    .createTable('potlucks', table => {
      table.increments('potluck_id');
      table.string('potluck_name')
        .notNullable()
        .unique();
      table.integer('organizer')
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.text('potluck_description');
      table.date('potluck_date')
        .notNullable();
      table.time('potluck_time')
        .notNullable();
      table.string('potluck_location')
        .notNullable();
    })
    .createTable('foods', table => {
      table.increments('food_id');
      table.string('food_name')
        .notNullable()
        .unique();
      table.text('food_description');
    })
    .createTable('potluck_users', table => {
      table.increments('potluck_user_id');
      table.integer('potluck_id')
        .unsigned()
        .notNullable()
        .references('potluck_id')
        .inTable('potlucks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('attending')
        .defaultTo('0');
    })
    .createTable('potluck_foods', table => {
      table.increments('potluck_food_id');
      table.integer('potluck_id')
        .unsigned()
        .notNullable()
        .references('potluck_id')
        .inTable('potlucks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('food_id')
        .unsigned()
        .notNullable()
        .references('food_id')
        .inTable('foods')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('assigned_user')
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('potluck_foods')
    .dropTableIfExists('potluck_users')
    .dropTableIfExists('foods')
    .dropTableIfExists('potlucks')
    .dropTableIfExists('users');
};
