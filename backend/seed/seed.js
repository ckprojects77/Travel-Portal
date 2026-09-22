import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";

import User from "../models/User.js";
import Destination from "../models/Destination.js";
import Package from "../models/Package.js";
import Hotel from "../models/Hotel.js";
import Review from "../models/Review.js";

import { destinations } from "./source/destinations.js";
import { packages } from "./source/packages.js";
import { hotels } from "./source/hotels.js";
import { testimonials } from "./source/testimonials.js";

dotenv.config();

async function run() {
  await connectDB();

  console.log("Clearing existing collections...");
  await Promise.all([
    Destination.deleteMany({}),
    Package.deleteMany({}),
    Hotel.deleteMany({}),
    Review.deleteMany({}),
    User.deleteMany({ email: { $in: ["admin@wanderly.travel", "demo@wanderly.travel"] } }),
  ]);

  console.log("Seeding destinations...");
  await Destination.insertMany(destinations);

  console.log("Seeding packages...");
  await Package.insertMany(packages);

  console.log("Seeding hotels...");
  await Hotel.insertMany(hotels);

  console.log("Seeding reviews (from testimonials)...");
  const reviews = testimonials.map((t) => ({
    name: t.name,
    avatar: t.avatar,
    location: t.location,
    trip: t.trip,
    targetType: "package",
    rating: t.rating,
    text: t.text,
  }));
  await Review.insertMany(reviews);

  console.log("Seeding demo users...");
  await User.create([
    { name: "Admin User", email: "admin@wanderly.travel", password: "admin123", role: "admin" },
    { name: "Demo Traveler", email: "demo@wanderly.travel", password: "demo1234", role: "customer" },
  ]);

  console.log("Seed complete:");
  console.log(`  ${destinations.length} destinations`);
  console.log(`  ${packages.length} packages`);
  console.log(`  ${hotels.length} hotels`);
  console.log(`  ${reviews.length} reviews`);
  console.log("  2 demo users (admin@wanderly.travel / admin123, demo@wanderly.travel / demo1234)");

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
