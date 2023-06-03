const mngoose = require('mongoose');

const item = mngoose.Schema({
    name: String
});

module.exports = mngoose.model("item", item);