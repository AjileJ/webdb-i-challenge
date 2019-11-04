const express = require('express');
const accountRouter = require('./accounts/accountRouter');

const server = express();

server.use(express.json());
server.use('/api/accounts', accountRouter);

server.get('/', (req,res) => {
  res.send('<h3>DB helpers with knex</h3>');
})

module.exports = server;