# Hapi.js

Hapi is a rich framework for building applications and services.

# Installation

To install hapi, use command:

`npm install hapi --save`

Hapi.js is similar to ExpressJs except some difference. In Hapi.js, we require `hapi` module. Then, we call it to make a server.

## Routing

We can define routes on server using `server.route` method. This method takes an object with **minimum** three parameters: 'method', 'path' and 'handler'.

Check the [sample](01-simple-server/index.js).

If you reply with an object, the content-type defaults to `application/json` otherwise, it will be `text/html`. Check [second example](02-simple-serv/server.js)

Request object in handle has information about request query string, params string, payload, headers, auth, etc. Route parameters are specified using `{}`. For example, for path `/api/{id}`, we can fetch id using `request.params.id`.

For query parameters, we can use `request.query.profile` for path `/api/23?profile=true`.

`reply` can be used using callback or send a response. Hapi.js goes through all the reply. So, if you want to send a reply back explicity then you need to write `return reply` and Hapi will cut the response from there. For example, in error situation, this is what you would like to do.

In Hapi, the route handling looks like this:

```javascript
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    ... ...
  }
});
``` 

You can also define parameters as optional using `?` symbol.

`path: '/path/{name?}'` so they might not be supplied in actual request.

- can use wild card to denote any path followed by certain path.

`path: 'path/{segments*}'`

- can limit wildcards like this

`path: 'path/{segment*2}'`. This can server urls like `path/user1/user2` and this means segment will be an array with

`segment = ['user1', 'user2']`. This can be useful.

For templating, `vision` library is used.

## Pre-requisites (Pre-processing requests)

Hapi provides something called **Route prerequisites**, which is a function that is executed before the route handler is reached. The operate outside handler but they can communicate with the handler. Async operations finish before the handler is reached.

Route prerequisites are included in the route using config.pre array. It must have one object with a method. Route prerequisites are optional in route handling on top of mandatory method, path and handler parameters. We can assign key using `assign: something`. We can get it in handler using `request.pre.something`.

When you call `reply` without any arguments, it works as `next` in Express world. It takes the request to the next middleware.

Prerequisites configuration might look like this. All the values returned by the prerequisite methods are stored in `request.pre` object.

```javascript
config: {
  pre: [
    setupDBConnection,
    checkUserExists,
    [
      getUserDetails,
      getUserConnections
    ]
  ],
  handler: function(request, response) {
    const user = request.pre.userDetails;
  }
}
```

## Error handling

For error handling, we can use `boom` module. It is simple to use. You simply require `boom` module and then where you want to throw an error, you simply reply with Boom.

`reply(Boom.notFound('The resource doesn't exist!))`

There are methods like `notFound`, `badRequest` etc which actually sends proper response code along with message.

- `description` is useful for documentation only which can be autogenerated using Blipp and Swagger.

- `validate` is used to validate the user date in the url params. `Joi` is used here for simple name validation.

- `pre` is object key for route prerequisites. This is an array of functions that are executed before the handler. This can be executed in series or parallel.

- `cache` indicates the browser how long the response can be cached.

In Hapi, the request is processed in sequence unlike in Express. check [this](https://hapijs.com/api#request-lifecycle) for the order of request processing. We can process at these events using `server.ext` function:

```javascript
server.ext('onRequest', function(request, reply) {
  console.log("Request received");
  return reply.continue(); // continue with the process handling, don't send reply to the client.
});
```

The reply interface can be used in two ways. `reply()` is used to send a response to the client. `reply.continue()` is used to continue through the request life cycle. You can pass different type of data to reply object and hapi will figure out the type of object passed to it. We can also modify the custom behviour of reply using custom handlers. Hapi provides plugins that provide a range of custom reply methods and handlers.

### Serving static files

We can serve static files using `inert` module.

## Validation

Make sure the data is valid, i.e. email is actually email and not simple text.

Make use of `joi` module.

We can make validators using `joi` and then require them in the routes files. When defining routes, you can also add another parameter called `validate` which can validate `params`, `query` or `payload` or anything else. Validation runs before pre-requisites. Validation errors are reported one after another. That is if there are two errors, the first one will be reported.


## Plugins

Plugins provides additional functionalities like generating documentation using `swagger` or authentication. To use a plugin, you require it and then register it.

```javascript
const Plugin = require('plugin');
server.register(Plugin, () => {});
```

We can also configure it.

```javascript
server.register({
  register: Plugin,
  options: {
    option1: true,
    ... ...
  }
}, err => {});
```

We can also register multiple [plugins](02-simple-serv/server.js) in an array and then proceed further in asynchronous callback.

## RESTful

You can generate rest service using [rest-hapi](https://github.com/JKHeadley/rest-hapi). It uses mongoose to create rest api end points.
