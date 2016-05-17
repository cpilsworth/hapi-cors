'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
const port = process.env.PORT || 3000;
const allowOrigin = process.env.ALLOW_ORIGIN || 'http://localhost:4502';


server.connection({ port: port });

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }
    server.route({
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) {
           let response = reply.file('./public/hello.html');
           if (process.env.ALLOW_ORIGIN) {
             response.headers['Access-Control-Allow-Origin'] = allowOrigin;
           }
           return response;
        }
    });
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
