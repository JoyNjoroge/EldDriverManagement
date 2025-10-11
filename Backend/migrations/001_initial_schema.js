exports.up = function(knex) {
  return knex.schema
    .createTable('carriers', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('name').notNullable();
      table.string('mc_number').unique();
      table.string('dot_number').unique();
      table.string('address');
      table.string('city');
      table.string('state', 2);
      table.string('zip_code', 10);
      table.string('phone');
      table.string('email');
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    .createTable('drivers', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('carrier_id').references('id').inTable('carriers').onDelete('CASCADE');
      table.string('email').unique().notNullable();
      table.string('password_hash').notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('license_number').notNullable();
      table.string('license_state', 2).notNullable();
      table.date('license_expiry');
      table.string('phone');
      table.string('vehicle_assignment');
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
      
      table.index(['carrier_id', 'is_active']);
    })
    .createTable('vehicles', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('carrier_id').references('id').inTable('carriers').onDelete('CASCADE');
      table.string('unit_number').notNullable();
      table.string('vin').unique();
      table.string('make');
      table.string('model');
      table.integer('year');
      table.string('license_plate');
      table.string('license_state', 2);
      table.decimal('odometer', 12, 2).defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    .createTable('hos_status', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('driver_id').references('id').inTable('drivers').onDelete('CASCADE');
      table.enum('status', ['off-duty', 'sleeper', 'driving', 'on-duty']).notNullable();
      table.timestamp('start_time').notNullable();
      table.decimal('latitude', 10, 8);
      table.decimal('longitude', 11, 8);
      table.string('location_description');
      table.string('vehicle_id');
      table.decimal('odometer', 12, 2);
      table.string('engine_hours');
      table.timestamps(true, true);
      
      table.index(['driver_id', 'start_time']);
    })
    .createTable('log_entries', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('driver_id').references('id').inTable('drivers').onDelete('CASCADE');
      table.date('log_date').notNullable();
      table.time('start_time').notNullable();
      table.time('end_time').notNullable();
      table.enum('status', ['off-duty', 'sleeper', 'driving', 'on-duty']).notNullable();
      table.decimal('latitude', 10, 8);
      table.decimal('longitude', 11, 8);
      table.string('location_description');
      table.text('annotation');
      table.boolean('is_certified').defaultTo(false);
      table.timestamp('certified_at');
      table.string('vehicle_id');
      table.decimal('odometer_start', 12, 2);
      table.decimal('odometer_end', 12, 2);
      table.timestamps(true, true);
      
      table.index(['driver_id', 'log_date']);
      table.unique(['driver_id', 'log_date', 'start_time', 'status']);
    })
    .createTable('location_updates', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('driver_id').references('id').inTable('drivers').onDelete('CASCADE');
      table.decimal('latitude', 10, 8).notNullable();
      table.decimal('longitude', 11, 8).notNullable();
      table.decimal('speed', 5, 2);
      table.decimal('heading', 5, 2);
      table.decimal('accuracy', 5, 2);
      table.string('vehicle_id');
      table.decimal('odometer', 12, 2);
      table.string('engine_hours');
      table.timestamp('recorded_at').notNullable();
      table.timestamps(true, true);
      
      table.index(['driver_id', 'recorded_at']);
    })
    .createTable('hos_violations', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('driver_id').references('id').inTable('drivers').onDelete('CASCADE');
      table.enum('type', [
        'drive_time_exceeded',
        'on_duty_time_exceeded', 
        'cycle_time_exceeded',
        'short_break',
        'long_break',
        'form_missing'
      ]).notNullable();
      table.text('description').notNullable();
      table.decimal('exceeded_by_minutes');
      table.timestamp('violation_time').notNullable();
      table.boolean('is_acknowledged').defaultTo(false);
      table.timestamp('acknowledged_at');
      table.text('acknowledgement_notes');
      table.timestamps(true, true);
      
      table.index(['driver_id', 'violation_time']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('hos_violations')
    .dropTableIfExists('location_updates')
    .dropTableIfExists('log_entries')
    .dropTableIfExists('hos_status')
    .dropTableIfExists('vehicles')
    .dropTableIfExists('drivers')
    .dropTableIfExists('carriers');
};