var Retort = require('retort'),
    retorter = new Retort({
        ok: function(request, response, data, isNotJson){
            response.writeHead(200);
            response.end(isNotJson ? data + '' : JSON.stringify(data));
        },
        forbidden: function(request, response, message, isNotJson){
            response.writeHead(403, isNotJson ? message + '' : JSON.stringify(message));
            response.end();
        },
        unauthorised: function(request, response, message, isNotJson){
            response.writeHead(401, isNotJson ? message + '' : JSON.stringify(message));
            response.end();
        },
        error: function(request, response, error, isNotJson){
            response.writeHead(500);
            if ( error instanceof Error ){
                response.end(JSON.stringify({
                    message:error.message
                }));
                return;
            }

            response.end(JSON.stringify(error));

        },
        redirect: function(request, response, location){
            var redirect = { Location: location };
            response.writeHead(302, redirect);
            response.end();
        }
    });

module.exports = retorter;