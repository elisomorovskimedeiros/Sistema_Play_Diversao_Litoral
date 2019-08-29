const Perfil = require("../Model/Perfil");

class Usuario {
    constructor(){
        this.id_usuario = Number,
        this.nome = String,
        this.username = String,
        this.password = String,
        this.email = String,
        this.nivel = Number,
        this.perfil = Perfil
    }    

    getUsuario(){
        return this;
    }
}

module.exports = Usuario;