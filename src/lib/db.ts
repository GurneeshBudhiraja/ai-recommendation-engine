
import mongoose from "mongoose"

type ConnectionStatus = {
  isConnected?: number;
};

const dbConnection: ConnectionStatus = {};

async function connectDB(): Promise<{ success: boolean }> {
  if (dbConnection.isConnected) {
    console.log("DB already connected")
    return { success: true };
  }
  try {

    const mongodbConnection = await mongoose.connect(process.env.NEXT_MONGODB_URI || "");

    mongodbConnection.connection.on("error", err => {
      console.error("MongoDB connection error:", err)
    })

    mongodbConnection.connection.on("disconnected", async () => {
      console.warn("MongoDB connection lost. Retrying in 5 seconds...");
      setTimeout(() => {
        connectDB()
      }, 5000);

    })
    dbConnection.isConnected = mongodbConnection.connection.readyState
    console.log("Mongodb connection successful!")
    return { success: true }
  } catch (error) {
    console.log("Error connecting to MongoDB: " + error)
    return { success: false }
  }
}

export default connectDB;