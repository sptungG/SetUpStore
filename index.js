require('dotenv').config();
const express = require('express');
require("express-async-errors")
const mongoose = require('mongoose')
const CategoryRouter = require('./modules/category')
const errorHandler = require('./common/errorHandler')


async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    const app = express();
    app.use(express.json());

    app.use('/category/', CategoryRouter)

    app.use(errorHandler)

    app.listen(process.env.PORT || 9100, (err) => {
        if (err) throw err;

        console.log("Server Connected");
    })
}

main()