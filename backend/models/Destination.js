import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema(
  { temp: Number, condition: String, humidity: Number, wind: Number },
  { _id: false }
);

const destinationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    description: { type: String, default: "" },
    attractions: [{ type: String }],
    weather: weatherSchema,
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Destination", destinationSchema);
