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

async function adicionarFilme(usuarioId, codigoImdb) {
    return knex('lista_filmes')
        .insert({
            usuario_id: usuarioId,
            codigo_imdb: codigoImdb
        }, ['id'])
        .then((result) => { 
            id = result[0].id;
            return id;
        })
        .catch(err => {
            throw new Error("Erro ao tentar adicionar filme na lista! " + err);
        })
}

module.exports = { adicionarFilme };
