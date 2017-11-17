'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');

const server = new Hapi.Server();
server.connection({ port: 4000, host: 'localhost' });

server.register([Inert, Vision], (err) => {

  if(err) throw err;

  server.views({
    engines: {
      html: {
        module: require('handlebars')
      }
    },
    relativeTo: __dirname,
    path: 'templates'
  });


  server.route({
      method: 'GET',
      path: '/index',
      handler: function(request, reply) {
          let context = {title: "Hapi Template index"};
          return reply.view('index', context);
      }
  });


  server.start((err) => {

      console.log(`Server running at: ${server.info.uri}`);
  });
});



