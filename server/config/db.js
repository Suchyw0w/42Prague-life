const { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  pool: {
    max: Number(process.env.DB_POOL_MAX),
    min: Number(process.env.DB_POOL_MIN),
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;