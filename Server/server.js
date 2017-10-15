#!/usr/bin/env node

var http = require('http');
const PORT = 8761;

var users = [];
users.push({username: "Niels", password: "123"});
users.push({username: "Antonio", password: "123"});
users.push({username: "Niels", password: "123"});

saveUser = function(data) {
    var userObj = JSON.parse(data);
    users.push(userObj);
    console.log(users);
}

sendHeader = function (response) {
    response.writeHead(200, {'Content-Type': 'application/json',
                             'Access-Control-Allow-Origin': '*',
                             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});
}

getUsers = function(request, response) {
    response.end(JSON.stringify(users));
}

putUser = function(request, response) {
    request.on('data', function(data) {
        console.log('Received user data: ' + data);
        saveUser(data);
        response.end();
    });
}

// http handlers
handler_get = function (request, response) {
    sendHeader(response);
    //response.status(404).end("Not found");
    //response.end(JSON.stringify(library));
};
handler_put = function (request, response) {
    request.on('data', function(data) {
        console.log(''+data);
        sendHeader(response);       
        //response.end(JSON.stringify(putInArray(''+data)));
        response.end(JSON.stringify('ALTING ER GODT'));
    });
};
handler_post = function (request, response) {
    request.on('data', function(data) {
        console.log(''+data);
        sendHeader(response);
        response.end(JSON.stringify(search(data)));
    });
};
handler_delete = function (request, response) {
    request.on('data', function(data) {
        deleteFromArray(data);
        sendHeader(response);
        response.end(JSON.stringify(4));
    });
};
handler_options = function (request, response) {
    sendHeader(response);
    response.end(null);
};

routes = { //undersøg nærmere hvornår put og post henholdsvis skal bruges
    'GET/users':     getUsers,
    'PUT/users':     putUser,
    'POST':          handler_post,
    'DELETE':        handler_delete,
    'OPTIONS':       handler_options,
};

handleRequest = function(request, response) {
    sendHeader(response); // burde kun være nødvendigt at sende headeren her
    var routedRequest = request['method'] + request.url;
    if(routes[routedRequest]) {
        routes[routedRequest](request, response);
    }
    else {
        response.end("404 - Not found"); // egentligt burde statussen fra senderHeader sættes til 404 i stedet for 200 her
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

