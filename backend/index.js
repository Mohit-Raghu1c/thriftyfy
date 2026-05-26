const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);


dotenv.config();

connectDB();

const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROUTES
app.use("/api", require("./routes/itemRoutes"));
app.use("/api", require("./routes/userRoutes"));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});