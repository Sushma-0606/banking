require("dotenv").config();
const express = require("express");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const sequelize = new Sequelize({
  dialect: "mysql",
  storage: "C:/Program Files/MySQL/MySQL Server 8.0/bin",
  password: "sushamYadav",
  username: "sushma",
  database: "bank",
  logging: false,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const port = 8000 || process.env.port;
const app = express();
app.use(express.json());
app.use(cors());


app.use("/login", require("./routes/login"));
app.use("/transfers", require("./routes/transfers_customer"));
app.use("/accounts", require("./routes/accounts"));
app.use("/transactions/banker", require("./routes/transaction_banker"));
app.use("/transactions/cust", require("./routes/transaction_customer"));
app.use("/balance", require("./routes/balance"));





app.listen(port, () => console.log(`Server running on port ${port}`));
