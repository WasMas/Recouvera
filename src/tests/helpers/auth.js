const request = require("supertest");
const app = require("../../app");

async function getToken() {

  await request(app)
    .post("/api/auth/signup")
    .send({
      first_name: "Admin",
      last_name: "User",
      email: "admin@test.com",
      password: "123456"
    });

  const res = await request(app)
    .post("/api/auth/signin")
    .send({
      email: "admin@test.com",
      password: "123456"
    });

  return res.body.token;
}

module.exports = getToken;