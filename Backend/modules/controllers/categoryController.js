import Category from "../models/Category.js";

const slugify = (str) =>
  String(str || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ order: 1, name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getPopularCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isPopular: true }).sort({
      order: 1,
      name: 1,
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description, icon, isPopular, order } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const slug = slugify(name);
    const existing = await Category.findOne({
      $or: [{ name: name.trim() }, { slug }],
    });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = await Category.create({
      name: name.trim(),
      slug,
      description: description || "",
      icon: icon || "BookOpen",
      isPopular: Boolean(isPopular),
      order: Number(order) || 0,
    });
    res.status(201).json(category);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid category data", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const { name, description, icon, isPopular, order } = req.body;

    if (name && name.trim() && name.trim() !== category.name) {
      const slug = slugify(name);
      const conflict = await Category.findOne({
        _id: { $ne: category._id },
        $or: [{ name: name.trim() }, { slug }],
      });
      if (conflict) {
        return res
          .status(400)
          .json({ message: "Another category with that name exists" });
      }
      category.name = name.trim();
      category.slug = slug;
    }
    if (description !== undefined) category.description = description;
    if (icon !== undefined) category.icon = icon;
    if (isPopular !== undefined) category.isPopular = Boolean(isPopular);
    if (order !== undefined) category.order = Number(order) || 0;

    const updated = await category.save();
    res.json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid category data", error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    await Category.deleteOne({ _id: category._id });
    res.json({ message: "Category removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};