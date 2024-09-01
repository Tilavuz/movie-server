const mongoose = require("mongoose");
const { baseUrl } = require("../helpers/shared");

const connect = async () => {
  mongoose
    .connect(`${baseUrl}/movie`)
    .then(() => {
      console.log("Basaga ulanish hozil qilindi!");
    })
    .catch(() => {
      console.log("Bazaga ulanib bo'lmadi!");
    });
};

module.exports = { connect };
