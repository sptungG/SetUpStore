const router = require("express").Router();
const authController = require("./user.controller");
router.get("/user", (req, res) => {
  res.json({
    data: "hey you hit user API endpoint",
  });
});

module.exports = router;
