const app = require("express")();
const todoController = require('../controllers/todo.controller');

app.get('/', todoController.home);

app.post('/', todoController.addItems);

app.post('/delete', todoController.delete);

module.exports = app;