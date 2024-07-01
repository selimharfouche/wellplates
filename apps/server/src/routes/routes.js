/**
 * @file routes.js
 * @description Route definitions.
 * @module routes
 */

const express = require('express');
const { ObjectId } = require('mongodb');

/**
 * Setup routes for the Express app.
 * @param {object} app - The Express app instance.
 * @param {function} connect - Function to get MongoDB connection.
 */
const setupRoutes = (app, connect) => {
  /**
   * Fetch all wellplates.
   * 
   * @name get/api/wellplates
   * @function
   * @memberof module:routes
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {void}
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
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {void}
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
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {void}
   */
  app.get('/api', (req, res) => res.send("Express on Vercel"));
};

module.exports = {
  setupRoutes,
};
