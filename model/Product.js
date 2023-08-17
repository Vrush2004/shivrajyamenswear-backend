const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, min: [1, 'wrong min price'], max: [10000, 'wrong max price'] },
    discountPercentage: { type: Number, min: [1, 'wrong min discount'], max: [99, 'wrong max discount'] },
    deliveryCharge: { type: Number, default: 0 },
    brand: { type: String, required: true },
    label: { type: String },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    selectedSizes: { type: [String], required: true },
    discountPrice: { type: Number },
    sellingPrice: { type: Number },
},
    { timestamps: true }
)

const virtual = ProductSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

module.exports = ProductModel = mongoose.model('Products', ProductSchema)