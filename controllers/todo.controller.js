const _ = require("lodash");
const Item = require('../model/item');
const List = require('../model/listSchema');

const item1 = new Item({
    name: "Welcome to your todolist"
});
const item2 = new Item({
    name: "Hi the + button to add a new item"
});
const item3 = new Item({
    name: "<-- Hit this to delete an item"
});

// //creatin an array
const defaultArray = [item1, item2, item3];

exports.home = (req, res) => {
    //console logging the items, (we will get a error of items not found in the site)
    
    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultArray, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Successfully inserted");
                }
            });
            res.redirect("/");
        } else {
            res.render("ToDolist", { List_Tittle: "Today", newItems: foundItems });
        }
    });

}

exports.homeHandler = (req, res) => {
    let itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName
    });

    //saving according to the route
    if (listName === "Today") {
        item.save();
        res.redirect("/");
    }
    else {
        List.findOne({ name: listName }, function (err, foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    }
}


exports.handleDelete = (req, res) => {
    const itemID = req.body.checkbox;
    const listName = req.body.listName;
    if (listName === "Today") {
        Item.findByIdAndRemove(itemID, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Successfully Deleted");
            }
            res.redirect("/");
        });
    } else {
        List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: itemID } } }, function (err, foundItems) {
            if (!err) {
                res.redirect("/" + listName);
            }
        });
    }

}

exports.DynamicRoute = function (req, res) {
    const customListName = _.capitalize(req.params.customList);

    List.findOne({ name: customListName }, function (err, foundList) {
        if (!err) {
            if (!foundList) {
                const list = new List({
                    name: customListName,
                    items: defaultArray
                });

                list.save();
                res.redirect("/" + customListName);
            }
            else {
                res.render("ToDolist", { List_Tittle: foundList.name, newItems: foundList.items });
            }
        }
    });
}

exports.about = (req, res) => {
    res.render("about");
}