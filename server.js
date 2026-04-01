const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/uploads",express.static("uploads"));
app.use("/api/employee",require("./routes/employeeRoutes"))
app.use("/api/admin",require("./routes/adminRoutes"));
app.listen(5000, () => console.log("Server running"));