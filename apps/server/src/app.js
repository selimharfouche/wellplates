const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env

const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3001; // Ensure it listens on port 3000

const uri = process.env.MONGODB_URI;

let con;

async function connect() {
  if (con) return con; // Return connection if already connected
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  con = await client.connect();
  return con;
}

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

// Connect to MongoDB once and list databases
async function main() {
  try {
    const client = await connect();
    console.log("Connected to MongoDB");

    // List all databases (for verification)
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);

// Routes
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

app.get("/api", (req, res) => res.send("Express on Vercel"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Export the app for Vercel
module.exports = app;
