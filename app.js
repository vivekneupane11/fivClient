const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const checkAuth = require("./middleware/checkauth");

const usersRoute = require("./routes/users");
const itemsRoute = require("./routes/items");
const destinationsRoute = require("./routes/destinations");

const app = express();

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//mongoose
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(process.env.MONGO_URL);

//morgan
app.use(morgan("dev"));

//routes
app.get("/", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});
app.post("/sendajax", (req, res) => {
  const { data } = req.body;
  //implement your method here
  res.json({ data });
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "register.html"));
});

app.use("/api/users", usersRoute);
app.use("/api/items", itemsRoute);
app.use("/api/destinations", destinationsRoute);

app.use(express.static("./public"));

module.exports = app;
