const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    currentBuyNowProduct: { type: Schema.Types.Mixed, required: true },
    totalAmount: { type: Number },
    orderId: { type: String,required:true },
    totalItems: { type: Number },
    paymentMethod: { type: String, required: true },
    address: { type: Schema.Types.Mixed },
    status: { type: String, default: 'pending' },
},
    { timestamps: true }
);

const virtual = orderSchema.virtual('id');
virtual.get(function () {
    return this._id;
});
orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

module.exports = OrderModel = mongoose.model('Order', orderSchema);