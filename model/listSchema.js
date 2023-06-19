const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    name: String,
    items: [{ name: String }]
});

module.exports = mongoose.model("listSchema", listSchema);