const express = require ('express');
const { fetchAllMovies } = require('../../services/imdbService') || {};
let apiRouter = express.Router();
const Usuario = require('../../dtos/usuario');
const { criarUsuario } = require('../../services/usuarioService');

apiRouter.get('/filmes', async (req, res) => {
    const limit = req.query.limit;
    const movies = await fetchAllMovies(limit);

    res.status(200).json(movies);
});

apiRouter.post('/usuarios', async (req, res) => {
    const usuario = new Usuario(req.body.nome,req.body.login,req.body.senha);
    const idNovoUsuario = await criarUsuario(usuario);
    console.log(idNovoUsuario);

    res.status(200).json(idNovoUsuario);
});

module.exports = apiRouter;