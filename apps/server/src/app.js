/**
 * @file app.js
 * @description Main application file for the server setup and routes.
 * @module app
 */

const express = require('express');
const { applyMiddlewares } = require('./middlewares/middlewares');
const { setupRoutes } = require('./routes/routes');
const { connect } = require('./database/database');
const { port } = require('./config/config');

const app = express();

applyMiddlewares(app);
setupRoutes(app, connect);

/**
 * Start the server and listen on the specified port.
 * @memberof module:app
 * @function
 */
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
