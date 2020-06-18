const express = require('express'),
    app = express(),
    routes = require('./routes');

app.use(express.json());
app.use(routes);

app.listen('3333', () => {
    console.log('Server has started');
})