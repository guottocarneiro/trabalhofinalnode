const express = require('express');
const { fetchAllMovies } = require('../../services/imdbService') || {};
let apiRouter = express.Router();
const Usuario = require('../../dtos/usuario');
const { criarUsuario, loginUsuario } = require('../../services/usuarioService');

apiRouter.get('/filmes', async (req, res) => {
    const limit = req.query.limit;
    const movies = await fetchAllMovies(limit);

    res.status(200).json(movies);
});

apiRouter.post('/usuarios', async (req, res) => {
    try {
        const usuario = new Usuario(req.body.nome, req.body.login, req.body.senha);
        const idNovoUsuario = await criarUsuario(usuario);

        res.status(201).json(idNovoUsuario);
    } catch (error) {
        res.status(500).json({ message: `Erro ao cadastrar usuário - ${error.message}` })
    }
});

apiRouter.post('/login', async (req, res) => {
    try {

        const resultadoLogin = await loginUsuario({ login: req.body.login, senha: req.body.senha });

        res.status(201).json(resultadoLogin);
    } catch (error) {
        res.status(500).json({ message: `Erro ao realizar login - ${error.message}` })
    }
});

module.exports = apiRouter;