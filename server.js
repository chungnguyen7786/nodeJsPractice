var express = require("express");
var app = express();

var cookieParser = require('cookie-parser');  

var shortid = require("shortid");

var db = require("./db.js");

var userRoute = require("./routes/user.route.js");
var bookRoute = require("./routes/book.route.js");
var transRoute = require("./routes/trans.route.js");
var authRoute = require("./routes/auth.route.js");

var authMiddleware = require("./middlewares/auth.middleware.js");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.pug");
});

app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/books", authMiddleware.requireAuth, bookRoute);
app.use("/transactions", authMiddleware.requireAuth, transRoute);
app.use("/auth", authRoute);

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
