const express = require('express');
const app = express();
const cors = require('cors');

var path = require('path');

// allow cross-origin requests
app.use(cors({credentials: true, origin: '*'}));

app.listen(3002,() => {
    console.log('Now listening for requests on port 3002');
});

app.get('/:filename/', function(req, res) {
    res.sendFile(path.join(__dirname + '/' + req.params.filename));
});
