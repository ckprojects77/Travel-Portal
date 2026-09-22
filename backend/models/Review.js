import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    avatar: { type: String, default: "" },
    location: { type: String, default: "" },
    trip: { type: String, default: "" },
    targetType: { type: String, enum: ["destination", "package", "hotel"], default: "destination" },
    targetId: { type: String, default: "" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
