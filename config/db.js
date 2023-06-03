const mongoose = require('mongoose');

exports.dbConnect = ()=>{
    mongoose.connect("mongodb://0.0.0.0:27017/todoList");
}