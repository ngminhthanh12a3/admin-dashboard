var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// my require
var cors = require("cors");

// var { mongoose } = require("./bin/mongoDB");
var mongoose = require("mongoose");
var session = require("express-session");
const MongoStore = require("connect-mongo")(session);
// const MongoStore = require("connect-mongodb-session")(session);
var passport = require("passport");

var {
  signupRouter,
  signinRouter,
  signoutRouter,
  checkSigninRouter,
  homeRouter,
  usersRouter,
} = require("./routes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:3000",
      "http://10.10.10.23:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "what is my sec",
  cookie: { maxAge: 60 * 60 * 10 * 1, sameSite: "strict", secure: false }, // 10 hour
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60 * 10 * 1, // 10 hours
  }),
};

// SESSION ( & COOKIES ) MIDDLEWARE   -- req.session.currentUser
app.use(session(sessionOptions));

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/signup", signupRouter);
app.use("/signin", signinRouter);
app.use("/signout", signoutRouter);
app.use("/checkSignin", checkSigninRouter);

var { appUseOTAMiddleware, appUseAPIMiddleware } = require("./middleware");
appUseOTAMiddleware(app);
appUseAPIMiddleware(app);

app.use("/test", (req, res, next) => {
  req.session.user = { use: "test" };
  // req.session.save()
  res.end("ok");
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res
    // .setHeader(
    //   "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    // );
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
