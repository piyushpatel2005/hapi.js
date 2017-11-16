'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({port: 3000, host: 'localhost'});

server.route({
  method: 'GET',
  path: '/',
  handler: function(req, res) {
    res('Hello world');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (req, res) {
    res('Hello, ' + encodeURIComponent(req.params.name) + '!');
  }
});

server.start((err) => {
  if(err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
})
