const stripe = require("stripe")(
  "sk_test_51JeNXVIQMsLPZVRpF7bUSkbmMzUAE2JubirQhPpIKRBFyGHM1TXMxyQ8ZFREMnrHItBENXx09QlehOTlX6GIW8f400iMgCbZWg"
);

module.exports = {
  // webhook used to notify me about successful payments and other related events
  payment: async (req, res) => {
    const event = req.body;

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(
          `PaymentIntent for ${paymentIntent.amount} was successful!`
        );
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.sendStatus(200);
  },

  // testing payment intent
  // still need payment intent to notify me at webhook endpoint
  createPaymentIntent: async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000/Store",
    });
    res.redirect(303, session.url);
  },
};
