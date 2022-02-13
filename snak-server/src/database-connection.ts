import { Db, MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING ?? 'unknown';

let db: Db;

export async function initDb() {
  const client = new MongoClient(uri, {
    connectTimeoutMS: 30000,
    keepAlive: true,
  });
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
  } catch (error) {
    console.error(`initDb failed with error: "${error.message}"`);
    throw error;
  }
}

export async function getDb() {
  if (!db) {
    await initDb();
  }
  return db;
}
