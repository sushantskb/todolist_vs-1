const Item = require("../model/item");

const item1 = new Item({
    name: "Welcome to your To-Do List"
});
const item2 = new Item({
    name: "Hit the + button to add"
});
const item3 = new Item({
    name: "<-- Hit this to add a new item"
});
const defaultArray = [item1, item2, item3];
exports.home = (req, res)=>{
    Item.find({}, (err, foundItems)=>{
        if(foundItems.length === 0){
            Item.insertMany(defaultArray, (err)=>{
                if(err){
                    console.log(err);
                } else{
                    console.log("Successful Inserted");
                }
            });
            res.render("/");
        } else{
            res.render("ToDolist", {List_Tittle: "Today", newItems: foundItems});
        }
    });
}

exports.addItems = (req, res) => {
    let itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    });

    item.save();
    res.redirect("/");
}

exports.delete = (req, res)=>{
    const itemId = req.body.checkbox;
    Item.findByIdAndRemove(itemId, (err)=>{
        if(err){
            console.log(err);
        } else{
            console.log("Successfully deleted");
        }
        res.redirect("/");
    })
}