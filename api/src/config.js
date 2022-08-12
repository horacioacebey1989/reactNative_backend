const { config } = require("dotenv");
config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/database_react",
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "somesecretkey",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
};
