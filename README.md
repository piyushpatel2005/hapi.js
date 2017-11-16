# Hapi.js

Hapi is a rich framework for building applications and services.

To install hapi, use command:

`npm install hapi --save`

Hapi.js is similar to ExpressJs except some difference. In Hapi.js, we require `hapi` module. Then, we call it to make a server.

We can define routes on server using `server.route` method. This method takes an object with **minimum** three parameters: 'method', 'path' and 'handler'.

Check the [sample](01-simple-server/index.js).

If you reply with an object, the content-type defaults to `application/json` otherwise, it will be `text/html`. Check [second example](02-simple-serv/server.js)
