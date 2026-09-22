export function notFound(req, res, next) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  let status = err.statusCode || err.status || (res.statusCode !== 200 ? res.statusCode : 500);
  let message = err.message || "Server error";

  // Mongoose validation error (e.g. missing required field, bad enum value)
  if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }
  // Mongoose bad ObjectId / bad type cast
  else if (err.name === "CastError") {
    status = 400;
    message = `Invalid value for field '${err.path}'`;
  }
  // Mongo duplicate key (e.g. registering an email that already exists)
  else if (err.code === 11000) {
    status = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `A record with that ${field} already exists`;
  }
  // Malformed JSON body sent by the client
  else if (err.type === "entity.parse.failed") {
    status = 400;
    message = "Malformed JSON in request body";
  }
  // JWT errors surfaced outside the auth middleware's own try/catch
  else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    status = 401;
    message = "Invalid or expired token";
  }

  console.error(err.stack || err);
  res.status(status).json({
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
}
