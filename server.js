const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDb = require("./config/db");
const employeeRoutes = require("./route/employeeRoute");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
    res.send("Employee management is running successfully");
});

app.use("/api/employee", employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});