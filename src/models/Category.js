const { model, Schema } = require('mongoose');

const categorieSchema = new Schema({
    name: { type: String, required: true },
    imgURL: {type: String, required: true},
    totalProducts: {type: Number}
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model('Category', categorieSchema)