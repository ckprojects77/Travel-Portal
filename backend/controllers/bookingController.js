import Booking from "../models/Booking.js";

export async function createBooking(req, res) {
  const { type, refId, title, travelers, checkIn, checkOut, traveler, subtotal, taxes, total } = req.body;

  if (!type || !refId || !title || subtotal == null || taxes == null || total == null) {
    return res.status(400).json({ message: "Missing required booking fields" });
  }

  const booking = await Booking.create({
    user: req.user._id,
    type,
    refId,
    title,
    travelers,
    checkIn,
    checkOut,
    traveler,
    subtotal,
    taxes,
    total,
    status: "Confirmed",
  });

  res.status(201).json(booking);
}

export async function myBookings(req, res) {
  const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(bookings);
}

export async function allBookings(req, res) {
  const bookings = await Booking.find().populate("user", "name email").sort({ createdAt: -1 });
  res.json(bookings);
}

export async function updateBookingStatus(req, res) {
  const { status } = req.body;
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json(booking);
}

export async function deleteBooking(req, res) {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json({ message: "Deleted", id: req.params.id });
}
