import express from "express";
import Stripe from "stripe";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.SECRET_KEY);
// console.log(stripe)
const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credenials: true,
  })
);
app.use(bodyParser.json());

app.post("/pay", async (req, res) => {
  try {
    const { token } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100000, // Amount in cents
      currency: "usd",
      payment_method_types: ["card"],
      //   confirmation_method: "manual",
      //   confirm: true,
    });
    res.status(200).json({ success: true, response: paymentIntent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error processing payment." });
  }
});

app.post("/payembed", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
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
    success_url: `http://localhost:${PORT}/success`,
    cancel_url: `http://localhost:${PORT}/cancel`,
  });

  res.redirect(303, session.url);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
