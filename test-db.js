const mongoose = require("mongoose");
require('dotenv').config();

async function connectTestDB() {
  try{
    await mongoose.connect(process.env.TESTDB);
    console.log("Connected to test database");
  } catch (error) {
    console.error('Error connecting to test database', error);
  }
};

async function closeTestDB() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
}

module.exports = {connectTestDB, closeTestDB};