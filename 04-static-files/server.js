'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();
server.connection({ port: 4000, host: 'localhost' });

server.register(Inert, (err) => {

  if(err) throw err;

  server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
          directory: {
            path: Path.join(__dirname, 'public')
          }
      }
  });

  server.ext('onPostHandler', function(request, reply) {
    // get the prepared response  at onPostHandler event in request life cycle
    const response = request.response;
    if(response.isBoom && response.output.statusCode === 404) {
      return reply.file('./404.html').code(404);
    }
    return reply.continue();
  });

  server.start((err) => {

      console.log(`Server running at: ${server.info.uri}`);
  });
});



