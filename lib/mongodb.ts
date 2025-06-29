import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://wongmingchi:LSByhKcPUpNu3Zhx@cluster0.fyvye7k.mongodb.net/"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env.local");
}

const mongoUri: string = MONGODB_URI;

interface MongooseGlobal {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const globalWithMongoose = global as typeof globalThis & MongooseGlobal;

let cached = globalWithMongoose.mongoose || { conn: null, promise: null };

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  globalWithMongoose.mongoose = cached;

  return cached.conn;
}

export default connectDB;
