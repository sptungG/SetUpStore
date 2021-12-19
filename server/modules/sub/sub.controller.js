const Sub = require("./sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Sub({ name, slug: slugify(name)}).save();
    res.json(category);
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create SubCategory failed");
  }
};

exports.list = async (req, res) => res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let category = await Sub.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate({ slug: req.params.slug }, { name, slug: slugify(name)}, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).send("SubCategory update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("SubCategory delete failed");
  }
};
