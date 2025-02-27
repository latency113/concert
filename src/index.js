const express = require("express");
const app = express();
const morgan = require("morgan");
//get port number from environment settings
require("dotenv").config();
const port = process.env.PORT || 3000;

// const { readdirSync } = require('fs')
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(morgan("dev"));
app.use("/images", express.static("images"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// match localhost:4000/
app.get("/", (req, res) => {
  res.send("สวัสดี");
});

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const concertRoute = require("./routes/concert.route");
const bookingRoute = require("./routes/booking.route");
const paymentRoute = require("./routes/stripe.route");
const brandRoute = require("./routes/brand.route");

// readdirSync('./src/routes')
//     .map((c) => app.use('/api', require('./src/routes/' + c)))
app.use(
  "/api",
  authRoute,
  userRoute,
  concertRoute,
  bookingRoute,
  paymentRoute,
  brandRoute,
  
);

app.listen(port, () => {
  console.log("App started at port: " + port);
});
