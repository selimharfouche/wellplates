/**
 * @file middlewares.js
 * @description Middleware setup.
 * @module middlewares
 */

const express = require('express');
const cors = require('cors');

/**
 * Apply middlewares to the Express app.
 * @param {object} app - The Express app instance.
 */
const applyMiddlewares = (app) => {
  app.use(express.json());
  app.use(cors());
};

module.exports = {
  applyMiddlewares,
};
