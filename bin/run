#!/usr/bin/env node

const http = require('http');
const Sequelize = require('sequelize');

const config = require('../config')[process.env.NODE_ENV || 'development'];

const log = config.log();
const app = require('../app')(config);

async function connectToPostgres() {
  const sequelize = new Sequelize(config.postgres.options);
  try {
    await sequelize.authenticate();
    log.info('Connection has been established successfully.');
    return sequelize;
  } catch (error) {
    log.error('Unable to connect to the database:', error);
  }
}

const postgresClient = connectToPostgres();
config.postgres.client = postgresClient;

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);

server.on('listening', () => {
  log.info(
    `Hi there! I'm listening on port ${server.address().port} in ${app.get('env')} mode.`,
  );
});
