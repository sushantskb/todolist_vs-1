const mongoose = require('mongoose');

exports.dbConnect = () => {
    //connection of mongoose
    mongoose.connect("mongodb://0.0.0.0:27017/todolistdb", { useNewUrlParser: true });
}