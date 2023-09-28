const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught exception.... crash inc 💥");
  process.exit(1);
});

dotenv.config({
  path: "./config/.env",
});

const db = require("./config/db");

//TODO: delete and move into controller
const UserModel = require('./models/user');

const app = require("./app");
//DB RUN
db.sync({force: true})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

//Server port
const server = app.listen(Number(process.env.APP_PORT) || 3000, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection.... crash inc 💥");
  server.close(() => {
    process.exit(1);
  });
});

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});
