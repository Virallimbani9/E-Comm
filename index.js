const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const userrouter = require("./routers/user");
const authrouter = require("./routers/auth")
const productrouter = require("./routers/product")
const cartrouter = require("./routers/cart");
const orderrouter = require("./routers/order");

dotenv.config();
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => { console.log("err") });

app.use("/user", userrouter);
app.use("/auth", authrouter);
app.use("/product", productrouter);
app.use("/cart",cartrouter);
app.use("/order",orderrouter);


app.listen(process.env.PORT || 3000, () => console.log(`BACKEND SEVER IS RUNNING`))