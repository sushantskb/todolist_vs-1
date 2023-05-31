const app = require("express")();
const todoController = require('../controllers/todo.controller');

app.get('/', todoController.home);

module.exports = app;