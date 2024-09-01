const fs = require("fs");

const removeFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(`Fileni o'chirishda xatolik yuz berdi: ${err}`);
    } else {
      console.log(`File o'chirildi: ${path}`);
    }
  });
};

module.exports = removeFile;