import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export async function register(req, res) {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email address" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const exists = await User.findOne({ email: email.toLowerCase().trim() });
  if (exists) return res.status(409).json({ message: "An account with this email already exists" });

  const user = await User.create({ name, email, password, phone });
  const token = generateToken(user._id);
  res.status(201).json({ token, user: user.toSafeObject() });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user._id);
  res.json({ token, user: user.toSafeObject() });
}

export async function me(req, res) {
  res.json({ user: req.user.toSafeObject() });
}

export async function updateMe(req, res) {
  const { name, phone } = req.body;
  if (name) req.user.name = name;
  if (phone !== undefined) req.user.phone = phone;
  await req.user.save();
  res.json({ user: req.user.toSafeObject() });
}

export async function toggleSavedDestination(req, res) {
  const { destinationId } = req.params;
  const idx = req.user.savedDestinations.indexOf(destinationId);
  if (idx >= 0) req.user.savedDestinations.splice(idx, 1);
  else req.user.savedDestinations.push(destinationId);
  await req.user.save();
  res.json({ savedDestinations: req.user.savedDestinations });
}

// Second gate for the admin dashboard, on top of role === "admin" from the JWT.
// Even someone holding a valid admin token can't use /admin without this code too.
export async function verifyAdminSecret(req, res) {
  const { code } = req.body;

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  if (!process.env.ADMIN_SECRET) {
    return res.status(500).json({ message: "Server is missing ADMIN_SECRET configuration" });
  }
  if (!code || code !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ message: "Incorrect admin access code" });
  }

  res.json({ verified: true });
}
