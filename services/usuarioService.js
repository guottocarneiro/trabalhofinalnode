const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')  
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
    return knex ('usuarios') 
        .insert({ 
            nome: usuario.nome,  
            login: usuario.login,  
            senha: bcrypt.hashSync(usuario.senha, 8),
        }, ['id']) 
        .then((result) => { 
            id = result[0].id;
            return id;
        })
        .catch(err => {
            throw new Error("Erro ao tentar cadastrar usuario! " + err);
        })
}

async function loginUsuario(credenciais) {
    return knex 
      .select('*').from('usuarios').where( { login: credenciais.login }) 
      .then( usuarios => { 
          if(usuarios.length){ 
              let usuario = usuarios[0] 
              let checkSenha = bcrypt.compareSync (credenciais.senha, usuario.senha) 
              if (checkSenha) { 
                 var tokenJWT = jwt.sign({ id: usuario.id },  
                      process.env.SECRET_KEY, { 
                        expiresIn: 3600 
                      }) 
 
                  return tokenJWT;
              } 
          }
          return "Login ou senha incorreta!";
      }) 
      .catch(err => { 
        throw new Error("Erro ao tentar logar usuario! " + err);
    })
}

module.exports = {criarUsuario, loginUsuario};