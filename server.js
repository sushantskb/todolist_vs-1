const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const ejs = require("ejs");

const routes = require('./routes/routes');

const port = process.env.PORT | 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.use("/", routes);


app.listen(port, ()=>{
    console.log(`To do app is listening on the ${port}`);
})