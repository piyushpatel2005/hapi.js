'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();
server.connection({ port: 1337, host: 'localhost' });

server.register(Inert, (err) => {

  if(err) throw err;

  server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
          directory: {
            // this is available at http://localhost:1337/index.html
              path: Path.join(__dirname, 'public')
          }
      }
  });

  server.start((err) => {

      console.log(`Server running at: ${server.info.uri}`);
  });
});



