'user strict';

const Hapi = require('hapi');
const  Joi = require('joi');

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

server.route({
  method: 'GET',
  path: '/hello/{name}',
  config: {
    description: 'Return and object with hello message',
    validate: {
      params: {
        name: Joi.string().min(3).required()
      }
    },
    pre: [],
    handler: function(request, reply) {
      const name = request.params.name;
      return reply({message: `Hello ${name}`});
    },
    cache: {
      expiresIn: 360000
    }
  }
});

server.route({
  method: 'GET',
  path: '/hello/',
  config: {
    description: 'Return and object with hello message',
    pre: [],
    handler: function(request, reply) {
      console.log(request.server);
      reply("hi");
    },
    cache: {
      expiresIn: 360000
    }
  }
});

server.start((err) => {
  console.log(`server running at ${server.info.uri}`);
});


