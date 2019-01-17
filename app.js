const express = require('express');
const app = express();
var path = require('path');


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/x-search/dist/index.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/x-search/dist/index.js'));
});

app.get('/x-name/dist/index.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/x-name/dist/index.js'));
});

app.get('/x-graphiql/dist/index.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/x-graphiql/dist/index.js'));
});

app.listen(3000,() => {
    console.log('Now listening for requests on port 3000');
});
