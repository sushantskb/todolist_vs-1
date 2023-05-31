const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const _ = require("lodash");

const mongoose = require("mongoose");
const port = 3000;


//connection of mongoose
mongoose.connect("mongodb://0.0.0.0:27017/todolistdb", {useNewUrlParser: true});

//creating the schema
const itemsSchema = {
    name: String
};

//mongoose model
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist"
});
const item2 = new Item({
    name: "Hi the + button to add a new item"
});
const item3 = new Item({
    name: "<-- Hit this to delete an item"
});

//creatin an array
const defaultArray = [item1, item2, item3];

//creating a new schema for dynamic route
const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get('/', (req, res) => {
    //console logging the items, (we will get a error of items not found in the site)
    Item.find({}, function(err, foundItems){
       if(foundItems.length === 0){
        Item.insertMany(defaultArray, function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Successfully inserted");
                }
        });
        res.redirect("/");
       }else{
        res.render("ToDolist", {List_Tittle: "Today", newItems: foundItems});
       }
    });
    
});

app.post("/", (req, res)=>{
    let itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName
    });
    
    //saving according to the route
    if(listName === "Today"){
        item.save();
        res.redirect("/");
    }
    else{
        List.findOne({name:listName}, function(err, foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    }
});

app.post("/delete", (req, res)=>{
    const itemID = req.body.checkbox;
    const listName = req.body.listName;
    if(listName === "Today"){
        Item.findByIdAndRemove(itemID, (err)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("Successfully Deleted");
            }
            res.redirect("/");
        });
    }else{
        List.findOneAndUpdate({name: listName}, {$pull:{items: {_id: itemID}}}, function(err, foundItems){
            if(!err){
                res.redirect("/" + listName);
            }
        }); 
    }

});

//dynamic route
app.get("/:customList", function(req, res){
   const customListName =  _.capitalize(req.params.customList);

   List.findOne({name: customListName}, function(err, foundList){
        if(!err){
            if(!foundList){
                const list = new List({
                    name: customListName,
                    items: defaultArray
                });
            
                list.save();
                res.redirect("/" + customListName);
            }
            else{
                res.render("ToDolist", {List_Tittle: foundList.name, newItems: foundList.items});
            }
        }
    });
});

// app.post("/work", (req, res)=>{
//     let item = req.body.newItem;
//     workitems.push(item);

//     res.redirect("/work");
// })

app.get("/about", (req, res)=>{
    res.render("about");
})

app.listen(port, () => console.log(`ToDo app listening on port ${port}!`));