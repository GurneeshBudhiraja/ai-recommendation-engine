import { Schema, models, model } from "mongoose";

export type DbImageSchema = {
  imageURL: string,
  name: string,
  price: string,
  furnitureType: string,
  description: string,
}

const dbImageSchema = new Schema({
  furnitureType: {
    type: String,
    required: true,
    trim: true,
    default: "n/a"
  },
  imageURL: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    max: 100
  }
})


const DbImage = models.DbImage || model("DbImage", dbImageSchema)
export default DbImage