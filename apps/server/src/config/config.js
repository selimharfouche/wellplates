/**
 * @file config.js
 * @description Configuration and environment setup.
 * @module config
 */

const dotenv = require('dotenv');
dotenv.config();

/**
 * Configuration object containing environment variables.
 * @typedef {Object} Config
 * @property {number|string} port - The port number on which the server will run.
 * @property {string} mongoUri - The URI for connecting to MongoDB.
 */

/**
 * Configuration for the application.
 * @type {Config}
 */
module.exports = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGODB_URI,
};
