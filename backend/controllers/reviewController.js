import Review from "../models/Review.js";

export async function listReviews(req, res) {
  const { targetType, targetId } = req.query;
  const filter = {};
  if (targetType) filter.targetType = targetType;
  if (targetId) filter.targetId = targetId;
  const reviews = await Review.find(filter).sort({ createdAt: -1 });
  res.json(reviews);
}

export async function createReview(req, res) {
  const { name, avatar, location, trip, targetType, targetId, rating, text } = req.body;
  if (!name || !rating || !text) return res.status(400).json({ message: "Name, rating, and text are required" });

  const review = await Review.create({
    user: req.user?._id,
    name,
    avatar,
    location,
    trip,
    targetType,
    targetId,
    rating,
    text,
  });
  res.status(201).json(review);
}

export async function deleteReview(req, res) {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) return res.status(404).json({ message: "Review not found" });
  res.json({ message: "Deleted", id: req.params.id });
}
