const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
    imgurl: String,
    name: String,
    price:String,
    description:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', TestSchema);
