// A small factory so Destination/Package/Hotel controllers don't repeat themselves.
// Each of those models is looked up by its human-readable `id` field (slug), not Mongo's _id.

export function makeCrudController(Model) {
  return {
    async list(req, res) {
      const { q, category, minRating, maxPrice, sort } = req.query;
      const filter = {};

      if (q) {
        const regex = new RegExp(q, "i");
        filter.$or = [{ name: regex }, { title: regex }, { country: regex }, { location: regex }];
      }
      if (category && category !== "All") filter.category = category;
      if (minRating) filter.rating = { $gte: Number(minRating) };
      if (maxPrice) filter.price = { ...(filter.price || {}), $lte: Number(maxPrice) };

      let query = Model.find(filter);

      if (sort === "price-asc") query = query.sort({ price: 1 });
      else if (sort === "price-desc") query = query.sort({ price: -1 });
      else if (sort === "rating") query = query.sort({ rating: -1 });
      else query = query.sort({ createdAt: -1 });

      const results = await query.exec();
      res.json(results);
    },

    async getOne(req, res) {
      const item = await Model.findOne({ id: req.params.id });
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    },

    async create(req, res) {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    },

    async update(req, res) {
      const item = await Model.findOneAndUpdate({ id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    },

    async remove(req, res) {
      const item = await Model.findOneAndDelete({ id: req.params.id });
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted", id: req.params.id });
    },
  };
}
