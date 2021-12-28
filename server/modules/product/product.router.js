const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");

// controller
const { create, listAll, update, remove, read, list } = require("./product.controller");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/:limit", listAll); // products/100
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.delete("/product/:slug", authCheck, adminCheck, remove);

router.post("/products", list);

module.exports = router;
