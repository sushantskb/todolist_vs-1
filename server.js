const express = require('express');
const app = express();
const bodyParser = require("body-parser");


// const mongoose = require("mongoose");
const port = 3000;
const { dbConnect } = require('./config/db');
const routes = require('./routes/routes');



//creating the schema
// const itemsSchema = {
//     name: String
// };

//mongoose model
// const Item = mongoose.model("Item", itemsSchema);

// const item1 = new Item({
//     name: "Welcome to your todolist"
// });
// const item2 = new Item({
//     name: "Hi the + button to add a new item"
// });
// const item3 = new Item({
//     name: "<-- Hit this to delete an item"
// });

// // //creatin an array
// const defaultArray = [item1, item2, item3];

//creating a new schema for dynamic route
// const listSchema = {
//     name: String,
//     items: [itemsSchema]
// };

// const List = mongoose.model("List", listSchema);

//inserting into document
// Item.insertMany(defaultArray, function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Successfully inserted");
//     }
// });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/', routes);

app.listen(port, () => {
    //connection of mongoose
    dbConnect();
    console.log(`ToDo app listening on port ${port}!`)
});