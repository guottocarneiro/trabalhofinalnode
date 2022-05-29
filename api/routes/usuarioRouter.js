const express = require('express');
let usuarioRouter = express.Router();
const Usuario = require('../../dtos/usuario');
const { criarUsuario, loginUsuario } = require('../../services/usuarioService');

usuarioRouter.post('/usuarios', async (req, res) => {
    try {
        const usuario = new Usuario(req.body.nome, req.body.login, req.body.senha);
        const idNovoUsuario = await criarUsuario(usuario);

        res.status(201).json(idNovoUsuario);
    } catch (error) {
        res.status(500).json({ message: `Erro ao cadastrar usuário - ${error.message}` })
    }
});

usuarioRouter.post('/login', async (req, res) => {
    try {

        const resultadoLogin = await loginUsuario({ login: req.body.login, senha: req.body.senha });

        res.status(201).json(resultadoLogin);
    } catch (error) {
        res.status(500).json({ message: `Erro ao realizar login - ${error.message}` })
    }
});

module.exports = usuarioRouter;