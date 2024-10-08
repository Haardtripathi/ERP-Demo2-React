const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const cors = require("cors");
require("dotenv").config();


const MONGODB_URI = process.env.MONGODB_URI;

// const adminRoutes = require("./routes/admin");
const workbookRoutes = require("./routes/section1Routes/workbook");
const incomingRoutes = require("./routes/section1Routes/incoming");
const leadRoutes = require("./routes/section1Routes/lead");
const pendingRoutes = require("./routes/section2Routes/pending");

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));


// app.use("/admin", adminRoutes);
app.use(workbookRoutes);
app.use(incomingRoutes);
app.use(leadRoutes);
app.use(pendingRoutes);

// Serve React app
// app.use(express.static(path.join(__dirname, "../client/build")));

// Catch-all route to serve React app for non-API routes
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

mongoose
    .connect(MONGODB_URI)
    .then((result) => {
        console.log("Connection established");
        app.listen(5000, () => console.log("Server running on port 5000"));
    })
    .catch((err) => {
        console.log(err);
    });
