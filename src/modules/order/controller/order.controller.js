import cartModel from '../../../../db/models/cart.model.js';
import orderModel from '../../../../db/models/order.model.js';
import productModel from '../../../../db/models/product.model.js';
import userModel from '../../../../db/models/user.model.js';
import catchError from '../../../middleware/catchError.js';
import AppError from '../../../utils/appError.js';
import Stripe from 'stripe';

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

// ---------------- CASH ORDER ----------------
const createCashOrder = catchError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new AppError("cart not found", 404));

  let orderTotalPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  let order = new orderModel({
    user: req.user._id,
    orderItems: cart.cartItems,
    totalPrice: orderTotalPrice,
    shippingAddress: req.body.shippingAddress,
  });

  await order.save();

  let options = cart.cartItems.map(ele => ({
    updateOne: {
      filter: { _id: ele.product },
      update: {
        $inc: {
          sold: ele.quantity,
          quantity: -ele.quantity,
        },
      },
    },
  }));

  await productModel.bulkWrite(options);
  await cartModel.findByIdAndDelete(req.params.id);

  res.json({ message: "Done", order });
});

// ---------------- GET ORDERS ----------------
const getSpaificOrder = catchError(async (req, res) => {
  let order = await orderModel.find({ user: req.user._id }).populate('orderItems.product');
  res.json({ message: "Done", order });
});

const getAllOrders = catchError(async (req, res) => {
  let order = await orderModel.find({}).populate('orderItems.product');
  res.json({ message: "Done", order });
});

// ---------------- STRIPE CHECKOUT ----------------
const createCheckoutURL = catchError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new AppError("cart not found", 404));

  let orderTotalPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  const session = await stripeClient.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "EGP",
          unit_amount: orderTotalPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.BASE_URL}/order/online/success`,
    cancel_url: `${process.env.BASE_URL}/order/online/cancel`,
    client_reference_id: req.params.id,
    customer_email: req.user.email,
    metadata: {
      address: JSON.stringify(req.body.shippingAddress),
    },
  });

  res.json({ message: "Success Payment", session });
});

// ---------------- WEBHOOK ----------------
const createdOnlineOrder = catchError(async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripeClient.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    let cart = await cartModel.findById(session.client_reference_id);
    if (!cart) return;

    let user = await userModel.findOne({
      email: session.customer_email,
    });

    let order = new orderModel({
      user: user._id,
      orderItems: cart.cartItems,
      totalPrice: session.amount_total / 100,
      shippingAddress: JSON.parse(session.metadata.address),
      paymentType: "card",
      isPaid: true,
      paidAt: Date.now(),
    });

    await order.save();

    let options = cart.cartItems.map(ele => ({
      updateOne: {
        filter: { _id: ele.product },
        update: {
          $inc: {
            sold: ele.quantity,
            quantity: -ele.quantity,
          },
        },
      },
    }));

    await productModel.bulkWrite(options);

    console.log("Payment completed");
  }

  res.json({ received: true });
});

export {
  createCashOrder,
  getSpaificOrder,
  getAllOrders,
  createCheckoutURL,
  createdOnlineOrder
};