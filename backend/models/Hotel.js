import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    amenities: [{ type: String }],
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
