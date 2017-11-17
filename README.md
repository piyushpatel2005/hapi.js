# Hapi.js

Hapi is a rich framework for building applications and services.

# Installation

To install hapi, use command:

`npm install hapi --save`

Hapi.js is similar to ExpressJs except some difference. In Hapi.js, we require `hapi` module. Then, we call it to make a server.

## Defining routes

We can define routes on server using `server.route` method. This method takes an object with **minimum** three parameters: 'method', 'path' and 'handler'.

Check the [sample](01-simple-server/index.js).

If you reply with an object, the content-type defaults to `application/json` otherwise, it will be `text/html`. Check [second example](02-simple-serv/server.js)

Request object in handle has information about request query string, params string, payload, headers, auth, etc. Route parameters are specified using `{}`. For example, for path `/api/{id}`, we can fetch id using `request.params.id`.

For query parameters, we can use `request.query.profile` for path `/api/23?profile=true`.

`reply` can be used using callback or send a response. Hapi.js goes through all the reply. So, if you want to send a reply back explicity then you need to write `return reply` and Hapi will cut the response from there. For example, in error situation, this is what you would like to do.

## Pre-requisites (Pre-processing requests)

Hapi provides something called **Route prerequisites**, which is a function that is executed before the route handler is reached. The operate outside handler but they can communicate with the handler. Async operations finish before the handler is reached.

Route prerequisites are included in the route using config.pre array. It must have one object with a method. Route prerequisites are optional in route handling on top of mandatory method, path and handler parameters. We can assign key using `assign: something`. We can get it in handler using `request.pre.something`.

When you call `reply` without any arguments, it works as `next` in Express world. It takes the request to the next middleware.

## Error handling

For error handling, we can use `boom` module. It is simple to use. You simply require `boom` module and then where you want to throw an error, you simply reply with Boom.

`reply(Boom.notFound('The resource doesn't exist!))`

There are methods like `notFound`, `badRequest` etc which actually sends proper response code along with message.

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
