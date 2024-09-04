const { createBucket } = require("../db/bucket");
const Movie = require("../models/movie.model");
const fs = require("fs");
const removeFile = require("../helpers/remove-file");

const getSomeMovies = async (req, res) => {
  try {
    const { count, skip } = req.params;
    const movies = await Movie.find({})
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(count);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.json({ message: error.message });
  }
};

const searchMovies = async (req, res) => {
  try {
    const { query } = req.body;
    const movies = await Movie.find({
      title: { $regex: query, $options: "i" },
    });
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.json({ message: error.message });
  }
};

const getRandomMovies = async (req, res) => {
  try {
    const { count } = req.params;
    const movies = await Movie.aggregate([
      {
        $sample: { size: count },
      },
    ]);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.json({ message: error.message });
  }
};

const postMovie = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const file = req.file;
    const filename = req.file.filename;
    const bucket = await createBucket();

    fs.createReadStream(file.path).pipe(
      bucket
        .openUploadStream(filename, {
          chunkSizeBytes: 1048576,
          metadata: {
            size: file.size,
            type: file.mimetype,
          },
        })
        .on("finish", async () => {
          removeFile(file.path);
          await Movie.create({ video: filename });
          res.json({ message: "Video yuklash yakunlandi!" });
        })
        .on("error", (error) => {
          removeFile(file.path);
          res.status(500).json({ message: error.message });
        })
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

const streamVideo = async (req, res) => {
  try {
    const { filename } = req.params;
    const range = req.headers.range;

    if (!range) {
      return res.status(416).send("Range header is required");
    }

    const bucket = await createBucket();
    const files = await bucket.find({ filename }).toArray();

    if (files.length === 0) {
      return res.status(404).send("File not found");
    }

    const file = files[0];
    const videoSize = file.length;
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = Math.min(
      parseInt(parts[1], 10) || videoSize - 1,
      videoSize - 1
    );
    const contentLength = end - start + 1;

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": file.metadata.type || "video/mp4",
    });

    const downloadStream = bucket.openDownloadStreamByName(filename, {
      start,
      end: end + 1,
    });

    downloadStream.pipe(res);

    downloadStream.on("error", (error) => {
      console.error("Download stream error:", error); // Better logging
      res.status(500).json({ message: error.message });
    });
  } catch (error) {
    console.error("Server error:", error); // Better logging
    res.status(500).json({ message: error.message });
  }
};

const changeMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      genres,
      actors,
      categories,
      is_paid,
      duration,
      year,
      country,
      age_restiction,
      title,
    } = req.body;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie topilmadi!" });
    }

    if (req.files) {
      if (req.files.photo) {
        if (movie.photo && movie.photo !== "movie-default-image.png") {
          const oldPhotoPath = path.join(__dirname, "../uploads", movie.photo);
          removeFile(oldPhotoPath);
        }
        movie.photo = req.files.photo[0].filename;
      }

      if (req.files.big_photo) {
        if (movie.big_photo && movie.big_photo !== "movie-default-image.png") {
          const oldBig_photoPath = path.join(
            __dirname,
            "../uploads",
            movie.big_photo
          );
          removeFile(oldBig_photoPath);
        }
        movie.big_photo = req.files.big_photo[0].filename;
      }
    }

    if (genres) {
      movie.genres = [...new Set([...movie.genres, ...genres])];
    }
    if (actors) {
      movie.actors = [...new Set([...movie.actors, ...actors])];
    }
    if (categories) {
      movie.categories = [...new Set([...movie.categories, ...categories])];
    }
    if (typeof is_paid === "boolean") {
      movie.is_paid = is_paid;
    }
    if (typeof age_restiction === "boolean") {
      movie.age_restiction = age_restiction;
    }
    if (duration && duration > 0) {
      movie.duration = duration;
    }
    if (year && year > 0) {
      movie.year = year;
    }
    if (country) {
      movie.country = country;
    }
    if (title) {
      movie.title = title;
    }

    await movie.save();
    const updatedMovie = await Movie.findById(movie._id);

    return res.json({
      message: "Movie malumotlari yangilandi!",
      movie: updatedMovie,
    });
  } catch (error) {
    console.error("Xato:", error);
    res.status(500).json({ message: error.message });
  }
};

const getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    if (page <= 0 || limit <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid 'page' or 'limit' parameters." });
    }

    const skip = (page - 1) * limit;

    const movies = await Movie.find({})
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments({});

    res.json({
      data: movies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total,
      moviesPerPage: limit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postMovie,
  streamVideo,
  getSomeMovies,
  getRandomMovies,
  searchMovies,
  changeMovie,
  getMovies,
};
