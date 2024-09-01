const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/generate-token");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Kirish uchun malumot yetarli emas!" });

    const user = await User.findOne({ username });

    if (!user)
      return res.status(404).json({ message: "Foydalanuvchi topilmadi!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Parolda xatolik bor!" });

    const token = generateToken({ _id: user._id });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Ro'yhatdan o'tish uchun malumot yetarli emas!" });

    let user = await User.findOne({ username });

    if(user) {
      return res.status(400).json({ message: "username allaqachon mavjut. Almashtiring!" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({ username, password: hashedPassword })

    const token = generateToken({ _id: user._id });
    res.json({ token, user });
  } catch (error) {
    res.json({ message: error.message })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, getUser, register };