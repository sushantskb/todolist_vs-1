const app = require('express')();

//controller
const todoDocontroller = require('../controllers/todo.controller');

app.get('/', todoDocontroller.home);

app.post("/", todoDocontroller.homeHandler);

app.post("/delete", todoDocontroller.handleDelete);

//dynamic route
app.get("/:customList", todoDocontroller.DynamicRoute);

// app.post("/work", (req, res)=>{
//     let item = req.body.newItem;
//     workitems.push(item);

//     res.redirect("/work");
// })

app.get("/about", todoDocontroller.about);

module.exports = app;