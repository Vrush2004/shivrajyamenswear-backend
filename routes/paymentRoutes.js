const paymentRoutes = require('express').Router();
const Razorpay = require("razorpay");
const crypto = require('crypto');
const ProductSchema = require('../model/Product');

paymentRoutes.post("/orders", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.RAZOR_PAY_KEY_ID,
			key_secret: process.env.RAZOR_PAY_KEY_SECRET,
		}); 
        // console.log(req.body.orderDetails);
		const orderdetails = req.body.orderDetails
		// receiving product id 
		const buyNowProduct = await ProductSchema.findOne({_id:orderdetails.id});

		// calculate final Amount of the order including total quantity + price after discount + delivery charges
		const actualAmount = Math.round(+buyNowProduct.price - (+buyNowProduct.price * (+buyNowProduct.discountPercentage / 100)));
		const finalAmount = parseInt(( actualAmount * +orderdetails.quantity ) + +buyNowProduct.deliveryCharge) // TODO: no need to fetch delivery charges from frontend
		// console.log(actualAmount,finalAmount)
		// ************
		const options = {
			amount: finalAmount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

paymentRoutes.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.RAZOR_PAY_KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully",paymentSuccess:true });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!",paymentSuccess:false });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!",paymentSuccess:false });
		console.log(error);
	}
});

module.exports = paymentRoutes;