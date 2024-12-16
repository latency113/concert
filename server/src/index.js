const express = require('express');
const app = express();
//get port number from environment settings
require('dotenv').config();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const cors = require('cors');
const productRoute = require('./routes/product.route')
const customerRoute = require('./routes/customer.route')
const categorieRoute = require('./routes/category.route')
const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')
const ProfileRoute = require('./routes/profile.route')

app.use('/images', express.static('images'));
app.use(cors());//cross origin resource sharing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// match localhost:4000/
app.get('/',(req,res)=>{
    res.send("สวัสดี");
});

app.use("/products", productRoute)
app.use("/customers", customerRoute)
app.use("/categories", categorieRoute)
app.use("/auth", authRoute)
app.use("/users", userRoute)
app.use("/user/profile", ProfileRoute)

app.listen(port, () => {
    console.log('App started at port: ' + port);
});