const mongoose = require('mongoose');

const item = mongoose.Schema({
    name:{
        type: String
    }, 
});

module.exports = mongoose.model("item", item);