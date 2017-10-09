#!/usr/bin/env node

// http://blog.modulus.io/build-your-first-http-server-in-nodejs

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);







var http   = require('http');
const PORT = 9998;

send_header = function (response) {
    response.writeHead(200, {'Content-Type': 'application/json',
                             'Access-Control-Allow-Origin': '*',
                             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});
}

var library = [{author: "Anton", title: "Livet om Nils", ISBN: "1234"},
              {author: "Niels", title: "Livet om Anton", ISBN: "2345"}];

search = function (search) {
    for (var i = 0; i < library.length; i++) {
        if(library[i].author == search) {
            return library[i];
        }
    }
}

putInArray = function(dataFromClient) {
    var data = dataFromClient.split(",");
    if(data.length != 3) {
        return "Der gik noget galt";
    } else {
        library.push({author: data[0], title: data[1], ISBN: data[2]});
        return "Det gik godt!";
    }
}

deleteFromArray = function (data) {
    for (var i = 0; i < library.length; i++) {
        if(library[i].author == data) {
            library.splice(i, 1);
        }
    }
}

// handlers
handler_get = function (request, response) {
    send_header(response);
    response.end(JSON.stringify(library));
};
handler_put = function (request, response) {
    request.on('data', function(data) {
        console.log(''+data);
        send_header(response);       
        response.end(JSON.stringify(putInArray(''+data)));
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

dispatch = {
    'GET':     handler_get,
    'PUT':     handler_put,
    'POST':    handler_post,
    'DELETE':  handler_delete,
    'OPTIONS': handler_options,
};

var server = http.createServer(function (request, response){
    console.log(request['method']+' '+request.url);
    dispatch[request['method']](request, response);
});
server.listen(PORT, function(){
    console.log("Listening to http://localhost:%s", PORT);
});

