
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const Stripe  = require("@stripe/react-stripe-js");



Stripe.api_key =
	"sk_test_51ORziWLY7QzH3oZ7JFniKwVSVgldt0855dZmv9TW4Z2p1Wk6U11MTNiSi5sGhVaisFaxFPd7TmxQR36ULIbLlY2d00rahr93h2";

const PaymentIntentVar = Stripe.PaymentIntent?.create(
	(amount = 2000),
	(currency = "GBP"),
	(payment_method_types = ["card"])
);

// app config
const app = express();
const port = 5000;
// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
	const total = request.query.total;
	console.log("Payment request received!>>>", total);
	const paymentIntent = await Stripe.paymentIntents?.create({
		amount: total,
		currency: "GBP",
	});
	response.status(201).send({ clientSecret: paymentIntent?.client_secret });
});

// listen command
// exports.api = functions.https.onRequest(app);
app.listen(port, () => {
	console.log("listening to port", port);
});
