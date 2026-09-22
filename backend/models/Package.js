import mongoose from "mongoose";

const itineraryDaySchema = new mongoose.Schema(
  { day: Number, title: String, details: String },
  { _id: false }
);

const packageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    destinationId: { type: String, required: true },
    destination: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    groupSize: { type: String, default: "2-10" },
    category: { type: String, required: true },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    highlights: [{ type: String }],
    itinerary: [itineraryDaySchema],
    included: [{ type: String }],
    excluded: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Package", packageSchema);
