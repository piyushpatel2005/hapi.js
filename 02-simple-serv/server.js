'user strict';

const Hapi = require('hapi');
const  Blipp = require('blipp');

const server = new Hapi.Server();

server.connection({port: 3001, host: 'localhost'});

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => {
    reply({
      message: 'Hey there'
    });
  }
});

// register a plugin
// blipp plugin displays server routing table
// This can be used to make sure to get a connection and then start the server.
server.register(Blipp, (err) => {
  if(err) throw err;
  server.start((err) => {
    if(err) throw err;
    console.log(`Server running on : ${server.info.uri}`);
  });
})


