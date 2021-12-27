const Product = require("./product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    // console.log(req.body);
    req.body.slug = slugify(req.body.name);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.read = async (req, res) => {
  let products = await Product.find({});
  res.json(products);
};

exports.list = async (req, res) => res.json(await Product.find({}).sort({ createdAt: -1 }).exec());

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
