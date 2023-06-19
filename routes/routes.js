const app = require("express")();
const todoController = require('../controllers/todo.controller');

app.get('/', todoController.home);

app.post('/', todoController.addItems);

module.exports = app;