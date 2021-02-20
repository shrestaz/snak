import { MongoClient } from 'mongodb';

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.CONNECTION_STRING ?? 'unknown';

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,
  keepAlive: true,
});

export async function initDb() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    return db;
  } catch (error) {
    // Ensures that the client will close when you finish/error
    console.error(`initDb failed with error: "${error.message}"`);
    throw error;
  }
}
