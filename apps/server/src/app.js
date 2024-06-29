/**
 * Import the dotenv module to load environment variables from a .env file into process.env.
 * The dotenv.config() function reads the .env file and sets the environment variables defined in that file into process.env.
 * 
 * @requires module:dotenv
 * @constant
 * @type {object}
 * @example
 * // .env file content:
 * // MONGODB_URI=mongodb://localhost:27017/mydatabase
 * // PORT=3001
 * 
 * // Usage:
 * const dotenv = require('dotenv');
 * dotenv.config();
 * console.log(process.env.MONGODB_URI); // Outputs: mongodb://localhost:27017/mydatabase
 */
const dotenv = require('dotenv');
dotenv.config();

/**
 * Express framework module.
 * @constant
 * @type {function}
 * @requires express
 */
const express = require('express');

/**
 * CORS middleware module.
 * @constant
 * @type {function}
 * @requires cors
 */
const cors = require('cors');

/**
 * MongoDB client and ObjectId for interacting with MongoDB.
 * @constant
 * @type {object}
 * @requires mongodb
 */
const { MongoClient, ObjectId } = require('mongodb');

/**
 * Express application instance.
 * @constant
 * @type {object}
 */
const app = express();

/**
 * Server port number.
 * @constant
 * @type {number|string}
 */
const port = process.env.PORT || 3001; 

/**
 * MongoDB URI from environment variables.
 * @constant
 * @type {string}
 */
const uri = process.env.MONGODB_URI;

/**
 * Holds the MongoDB connection once it is established.
 * 
 * @type {MongoClient}
 * @default undefined
 */
let con;

/**
 * Connect to MongoDB.
 * If the connection is not present, it will be established. Returns the connection.
 * 
 * @returns {Promise<MongoClient>}
 */
async function connect() {
  if (con) {
    console.log("Returning existing MongoDB connection");
    return con; // Return connection if already connected
  }
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  con = await client.connect();
  console.log("Established new MongoDB connection");
  return con;
}

// Middleware to parse JSON payloads in incoming requests
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

/**
 * @module routes
 */

/**
 * Fetch all wellplates.
 * 
 * @name get/api/wellplates
 * @function
 * @memberof module:routes
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get('/api/wellplates', async (req, res) => {
  try {
    const client = await connect();
    const database = client.db('Wellplates_Database');
    const collection = database.collection('Wellplates_Collection');
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    console.error("Error fetching wellplates:", error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * Get a wellplate by ID.
 * 
 * @name get/api/wellplates/:id
 * @function
 * @memberof module:routes
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get('/api/wellplates/:id', async (req, res) => {
  try {
    const client = await connect();
    const database = client.db('Wellplates_Database');
    const collection = database.collection('Wellplates_Collection');
    const wellplateId = new ObjectId(req.params.id);
    const item = await collection.findOne({ _id: wellplateId });

    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.json(item);
  } catch (error) {
    console.error("Error fetching wellplate:", error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * Basic API route.
 * 
 * @name get/api
 * @function
 * @memberof module:routes
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get("/api", (req, res) => res.send("Express on Vercel"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Export the app for Vercel
module.exports = app;
