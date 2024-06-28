const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env

const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    app.get('/api/wellplates', async (req, res) => {
      try {
        const database = client.db('Wellplates_Database');
        const collection = database.collection('Wellplates_Collection');
        const documents = await collection.find({}).toArray();
        res.json(documents);
      } catch (error) {
        console.error("Error fetching wellplates:", error);
        res.status(500).json({ message: error.message });
      }
    });

    app.get('/api/wellplates/:id', async (req, res) => {
      try {
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

    await listDatabases(client);
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

app.get("/", (req, res) => res.send("Express on Vercel"));

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server ready on port ${port}.`);
});

// Export the app for Vercel
module.exports = app;
