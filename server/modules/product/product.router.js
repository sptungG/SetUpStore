const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");

// controller
const { create, read, update, remove, list } = require("./product.controller");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.delete("/product/:slug", authCheck, adminCheck, remove);

module.exports = router;
