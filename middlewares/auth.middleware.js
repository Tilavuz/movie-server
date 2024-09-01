const jwt = require("jsonwebtoken");
const { jwtDecoded } = require("../helpers/shared");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({
        message: "Syatdan to'liq foydalanish uchun ro'yhatdan o'ting",
      });
    }

    const decoded = jwt.verify(token, jwtDecoded);
    req.user = decoded;
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Yaroqsiz foydalanuvchi", status: false });
  }
};

module.exports = { auth };
