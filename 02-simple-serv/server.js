'user strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({port: 3001});

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => {
    reply({
      message: 'Hey there'
    });
  }
});

server.start((err) => {
  if(err) throw err;
  console.log(`Server running on : ${server.info.uri}`);
});
