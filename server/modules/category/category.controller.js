const Category = require("./category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, desc, image } = req.body;
    const category = await new Category({ name, slug: slugify(name), desc, image }).save();
    res.json(category);
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create category failed");
  }
};

exports.list = async (req, res) => res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};

exports.update = async (req, res) => {
  const { name, desc, image } = req.body;
  try {
    const updated = await Category.findOneAndUpdate({ slug: req.params.slug }, { name, slug: slugify(name), desc, image }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).send("Create update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Create delete failed");
  }
};