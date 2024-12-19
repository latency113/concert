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

const productRoute = require("./routes/product.route");
const categorieRoute = require("./routes/category.route");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const adminRoute = require("./routes/admin.route")

// readdirSync('./src/routes')
//     .map((c) => app.use('/api', require('./src/routes/' + c)))
app.use("/api", 
        productRoute, 
        categorieRoute, 
        authRoute, 
        userRoute,
        adminRoute
      );

app.listen(port, () => {
  console.log("App started at port: " + port);
});
