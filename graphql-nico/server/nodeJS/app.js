const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

mongoose.connect('mongodb://mongouser:mongopassword@ds255319.mlab.com:55319/graphql-nodejs');
mongoose.connection.once('open', ()=>{
   console.log('MongoDb connection is open');
});

app.use('/graphql',graphqlHTTP({
    schema, // equivalent to schema:schema because the name is the same
    graphiql:true
}));

app.listen(4000,() => {
    console.log('Now listening for requests on port 4000');
});