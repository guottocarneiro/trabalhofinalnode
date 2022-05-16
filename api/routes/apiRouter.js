const express = require ('express');
const { fetchAllMovies } = require('../../services/imdbService') || {};
let apiRouter = express.Router();

apiRouter.get('/filmes', async (req, res) => {
    const limit = req.query.limit;
    const movies = await fetchAllMovies(limit);

    res.status(200).json(movies);
});

module.exports = apiRouter;