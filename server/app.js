const errorHandler = require("./middlewares/error");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

//Routes import
//const authRoutes = require("./routes/auth")

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

if (process.env.APP_ENV == "development") {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: process.env.APP_FRONTEND_URL,
      credentials: true,
    })
  );
}

app.use(helmet());

//Routes
//app.use("/api/auth", authRoutes)

app.use(errorHandler);

module.exports = app;
