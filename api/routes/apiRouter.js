const express = require('express');
const { fetchAllMovies } = require('../../services/imdbService') || {};
let apiRouter = express.Router();
const Usuario = require('../../dtos/usuario');
const { criarUsuario, loginUsuario } = require('../../services/usuarioService');
const jwt = require('jsonwebtoken');
const { adicionarFilme } = require('../../services/listaFilmeService');

let checkToken = (req, res, next) => {
    let authToken = req.headers["authorization"];
    if (!authToken) {
        res.status(401).json({ message: 'Token de acesso requerida' });
    }
    else {
        let token = authToken.split(' ')[1];
        req.token = token;
    }
    jwt.verify(req.token, process.env.SECRET_KEY, (err, decodeToken) => {
        if (err) {
            res.status(401).json({ message: 'Acesso negado' });
            return;
        }
        req.usuarioId = decodeToken.id;
        next();
    })
}

apiRouter.get('/filmes', async (req, res) => {
    try {
        const limit = req.query.limit;
        const movies = await fetchAllMovies(limit);

        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: `Erro ao obter filmes - ${error.message}` })
    }
});

apiRouter.post('/lista-filmes', checkToken, async (req, res) => {
    try {
        const { usuarioId, codigoImdb } = req.body;
        const idFilme = await adicionarFilme(usuarioId, codigoImdb);

        res.status(201).json({ idFilme });
    } catch (error) {
        res.status(500).json({ message: `Erro ao adicionar filme na lista - ${error.message}` })
    }
})

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