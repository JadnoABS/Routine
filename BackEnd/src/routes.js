const express = require('express'),
    routes = express.Router(),
    TaskController = require("./controllers/TaskController"),
    SubtaskController = require("./controllers/SubtaskController");

routes.get('/', (req, res) => { res.redirect('/tasks') });
routes.get('/tasks', TaskController.index);

routes.post('/tasks', TaskController.create);
routes.post('/subtasks/:id', SubtaskController.create);

routes.delete('/tasks/:id', TaskController.delete);
routes.delete('/subtasks/:id/:index', SubtaskController.delete);
routes.delete('/deleteall', TaskController.deleteAll);


module.exports = routes;