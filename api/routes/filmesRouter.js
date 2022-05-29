const express = require('express');
const { fetchAllMovies } = require('../../services/imdbService') || {};
let filmesRouter = express.Router();
const jwt = require('jsonwebtoken');
const { adicionarFilme, listarFilmesPorUsuario, adicionarFilmeAssistido } = require('../../services/listaFilmeService');

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

filmesRouter.get('/filmes', async (req, res) => {
    try {
        const limit = req.query.limit;
        const movies = await fetchAllMovies(limit);

        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: `Erro ao obter filmes - ${error.message}` })
    }
});

filmesRouter.post('/lista-filmes', checkToken, async (req, res) => {
    try {
        const { usuarioId, codigoImdb } = req.body;
        const idFilme = await adicionarFilme(usuarioId, codigoImdb);

        res.status(201).json({ idFilme });
    } catch (error) {
        res.status(500).json({ message: `Erro ao adicionar filme na lista - ${error.message}` })
    }
})

filmesRouter.get('/lista-filmes', checkToken, async (req, res) => {
    try {
        const { usuarioId } = req.query;
        const filmes = await listarFilmesPorUsuario(usuarioId);

        res.status(200).json(filmes);
    } catch (error) {
        res.status(500).json({ message: `Erro ao listar filmes do usuário - ${error.message}` })
    }
})

filmesRouter.post('/lista-assistidos', checkToken, async (req, res) => {
    try {
        const { usuarioId, codigoImdb, nota } = req.body;
        await adicionarFilmeAssistido(usuarioId, codigoImdb, nota);

        res.status(200).json("Filme adicionado a lista de assistidos!");
    } catch (error) {
        res.status(500).json({ message: `Erro ao adicionar filme na lista da assistidos - ${error.message}` })
    }
})

module.exports = filmesRouter;