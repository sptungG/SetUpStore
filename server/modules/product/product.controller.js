const Product = require("./product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const category = await new Product({ name, parent, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create SubCategory failed");
  }
};

exports.list = async (req, res) => res.json(await Product.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let category = await Product.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Product.findOneAndUpdate({ slug: req.params.slug }, { name, parent, slug: slugify(name) }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).send("SubCategory update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("SubCategory delete failed");
  }
};
