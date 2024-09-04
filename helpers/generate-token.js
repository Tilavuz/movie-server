const jwt = require("jsonwebtoken");
const { jwtDecoded } = require("./shared");

const generateToken = (data) => {
  const token = jwt.sign({ ...data }, jwtDecoded, { expiresIn: "7d" });
  return token;
};

module.exports = { generateToken };