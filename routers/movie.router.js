const express = require('express');
const router = express.Router();
const { postMovie, streamVideo, getSomeMovies, getRandomMovies, searchMovies, changeMovie, getMovies } = require('../controllers/movie.controller');
const { upload } = require('../middlewares/uploads.middleware');
const photoUpload = require('../middlewares/photo-uploads.middleware')

router.post('/video/create', upload, postMovie);
router.get('/video/:filename', streamVideo);
router.get('/movies/:skip/:count', getSomeMovies);
router.get('/movies', getMovies);
router.get('/movies/:count', getRandomMovies);
router.get('/movies/search', searchMovies);
router.put('/movies/change/:id', photoUpload, changeMovie);

module.exports = router;