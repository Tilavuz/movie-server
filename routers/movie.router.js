const express = require('express');
const router = express.Router();
const { postMovie, streamVideo, getSomeMovies, getRandomMovies, searchMovies } = require('../controllers/movie.controller');
const { upload } = require('../middlewares/uploads.middleware');

router.post('/video', upload, postMovie);
router.get('/video/:filename', streamVideo);
router.get('/movies/:skip/:count', getSomeMovies);
router.get('/movies/:count', getRandomMovies);
router.get('/movies/search', searchMovies);

module.exports = router;