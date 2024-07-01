/**
 * @file database.js
 * @description Database connection logic.
 * @module database
 */

const { MongoClient } = require('mongodb');
const { mongoUri } = require('../config/config');

let con;

/**
 * Connect to MongoDB.
 * If the connection is not present, it will be established. Returns the connection.
 * 
 * @async
 * @function
 * @memberof module:database
 * @returns {Promise<MongoClient>} The MongoDB client connection.
 */
const connect = async () => {
  if (con) {
    console.log("Returning existing MongoDB connection");
    return con; // Return connection if already connected
  }
  const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  con = await client.connect();
  console.log("Established new MongoDB connection");
  return con;
};

module.exports = {
  connect,
};
