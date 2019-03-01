const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    // mongoDb is generating the id automatically, no need to declare it
    name: String,
    genre: String,
    authorId: String
});

module.exports = mongoose.model('Book', bookSchema);