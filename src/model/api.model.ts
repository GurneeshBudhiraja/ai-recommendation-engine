import { Schema, model, models } from "mongoose";
import { ID } from "node-appwrite";


// single api key
const keySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  key: {
    type: String,
    trim: true,
    default: () => ID.unique()
  }
})


const apiSchema = new Schema({
  userid: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  keys: [keySchema]
}, { timestamps: true })



const API = models.API || model("API", apiSchema);
export default API;








