const Razorpay = require("razorpay");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  try {
    const { amount, customer, products } = JSON.parse(event.body);

    const razorpay = new Razorpay({
      key_id: process.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "secret_placeholder"
    });

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: "rcpt_" + Date.now()
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency
      })
    };
  } catch (error) {
    console.error("Error creating razorpay order:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message || "Failed to create order" })
    };
  }
};
