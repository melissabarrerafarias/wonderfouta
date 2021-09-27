const router = require("express").Router();
const bodyParser = require("body-parser");
const {
  payment,
  createPaymentIntent,
} = require("../controllers/paymentController");

// route: http://localhost:5000/payment/webhook
router.post("/webhook", payment);

// route: http://localhost:5000/payment/create-payment-intent
router.post("/create-payment-intent", createPaymentIntent);

module.exports = router;
