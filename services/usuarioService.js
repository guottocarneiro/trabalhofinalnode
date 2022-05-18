const bcrypt = require('bcryptjs')  
const knex = require('knex')({
    client: 'pg',
    debug: false,
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
    }
})

async function criarUsuario(usuario) {
    let id;
    knex ('usuarios') 
    .insert({ 
        nome: usuario.nome,  
        login: usuario.login,  
        senha: bcrypt.hashSync(usuario.senha, 8),
    }, ['id']) 
    .then((result) => { 
        id = result[0].id;
    })
    .catch(err => { 
        throw new Error("Erro ao tentar cadastrar usuario! " + err);
    })

    return id;
}

module.exports = {criarUsuario};