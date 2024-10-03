const express = require("express");
const paypal = require("@paypal/checkout-server-sdk");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// PayPal configuration
const clientId =
  "AcMz3qJ9DrjaDZH_asLE65SFuI7W2qIFLPVEkIqopOtb0YFEfAfW2Ht1cJR1bo0uoeP18SwV-urPXbz0";
const clientSecret =
  "EN_aBgvmZ3m4XrMa0pYQyOOzcuQrR5cfXWtiotH-9MtH8Yhyx8nkcKGhTcXI7OVWqxoii_ZWKvohb7wB";

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

// Create a new order
app.post("/create-order", async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "10.00", // Change this dynamically based on your product or cart value
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Capture payment
app.post("/capture-order", async (req, res) => {
  const { orderID } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);

  try {
    const capture = await client.execute(request);
    res.json(capture.result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
