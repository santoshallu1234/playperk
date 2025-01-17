import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
// console.log(MONGO_URI)

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env');
}

let cachedClient = global.mongoose;

if (!cachedClient) {
  cachedClient = global.mongoose = { conn: null, promise: null };
}

async function connectMongoDB() {
  if (cachedClient.conn) {
    console.log("Already connected to db")
    return cachedClient.conn;
  }

  if (!cachedClient.promise) {

    cachedClient.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
    console.log("connected to db")

      return mongoose;
    });
  }

  cachedClient.conn = await cachedClient.promise;
  return cachedClient.conn;
}

export default connectMongoDB;
