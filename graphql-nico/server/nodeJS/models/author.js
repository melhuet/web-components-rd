const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    // mongoDb is generating the id automatically, no need to declare it
    name: String,
    age: Number
});

module.exports = mongoose.model('Author', authorSchema);