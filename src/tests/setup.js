const mongoose = require("mongoose");

process.env.JWT_SECRET = "testsecret";
process.env.NODE_ENV = "test";

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/recouvera_test");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});