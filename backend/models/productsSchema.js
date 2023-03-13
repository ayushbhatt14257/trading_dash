const mongoose = require('mongoose');

const porductsSchema = new mongoose.Schema({
    id: String,
    title: String,
    oneYear: String,
    threeYear: String,
    fiveYear: String,
    img: String
})

module.exports = mongoose.model("product", porductsSchema);