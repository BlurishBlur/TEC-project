#!/usr/bin/env node

var http = require('http');
const PORT = 9998;

var users = [];
users[users.length] = {name: "Niels"};

send_header = function (response) {
    response.writeHead(200, {'Content-Type': 'application/json',
                             'Access-Control-Allow-Origin': '*',
                             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});
}

getUsers = function(request, response) {
    response.end(JSON.stringify(users));
}

// http handlers
handler_get = function (request, response) {
    send_header(response);
    //response.status(404).end("Not found");
    //response.end(JSON.stringify(library));
};
handler_put = function (request, response) {
    request.on('data', function(data) {
        console.log(''+data);
        send_header(response);       
        //response.end(JSON.stringify(putInArray(''+data)));
        response.end(JSON.stringify('ALTING ER GODT'));
    });
};
handler_post = function (request, response) {
    request.on('data', function(data) {
        console.log(''+data);
        send_header(response);
        response.end(JSON.stringify(search(data)));
    });
};
handler_delete = function (request, response) {
    request.on('data', function(data) {
        deleteFromArray(data);
        send_header(response);
        response.end(JSON.stringify(4));
    });
};
handler_options = function (request, response) {
    send_header(response);
    response.end(null);
};

routes = {
    'GET/users':     getUsers,
    'PUT/users':     handler_put,
    'POST':          handler_post,
    'DELETE':        handler_delete,
    'OPTIONS':       handler_options,
};

handleRequest = function(request, response) {
    send_header(response);
    var routedRequest = request['method'] + request.url;
    if(typeof(routes[routedRequest]) === 'function') {
        routes[routedRequest](request, response);
    }
    else {
        response.end("Not found");
    }
}

var server = http.createServer(function (request, response){
    console.log("Received request for " + request['method'] + request.url);
    handleRequest(request, response);


    //console.log(request['method']+' '+request.url);
    //dispatch[request['method']](request, response);
});
server.listen(PORT, function(){
    console.log("Listening to http://localhost:%s", PORT);
});

