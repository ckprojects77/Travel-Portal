import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["package", "destination", "hotel"], required: true },
    refId: { type: String, required: true },
    title: { type: String, required: true },
    travelers: { type: Number, default: 1 },
    checkIn: Date,
    checkOut: Date,
    traveler: {
      name: String,
      email: String,
      phone: String,
      requests: String,
    },
    subtotal: { type: Number, required: true },
    taxes: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Confirmed", "Cancelled", "Completed"], default: "Confirmed" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
