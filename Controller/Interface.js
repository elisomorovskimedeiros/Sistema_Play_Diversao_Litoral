const Db = require("../Controller/Db");

class Interface{
    constructor(){}

    async inserirCliente(cliente){
        let db = new Db();
        return await db.inserirCliente(cliente).then(function(resposta){
            return resposta;
        });
    }

    async listarTodosClientes(){
        let db = new Db();
        return await db.selectTodosClientes().then(function(clientes){
            return clientes;
        });
    }

    async listarCliente(cliente){
        let db = new Db();
        return await db.selectUmCliente(cliente).then(function(clientes){
            return clientes;
        });
    }

    async inserirBrinquedo(brinquedo){
        let db = new Db();
        return await db.inserirBrinquedo(brinquedo).then(function(resposta){
            return resposta;
        });
    }

    async listarTodosBrinquedos(){
        let db = new Db();
        return await db.selectTodosBrinquedos().then(function(brinquedos){
            return brinquedos;
        });
    }

    async listarUmBrinquedo(nomeBrinquedo){
        let db = new Db();
        return await db.selectUmBrinquedo(nomeBrinquedo).then(function(brinquedos){
            return brinquedos;
        });
    }

    async inserirEvento(evento){
        let db = new Db();
        return await db.inserirEvento(evento).then(function(resposta){
            return resposta;
        });
    }

    async inserirBrinquedoNoEvento(brinquedosEvento){
        let db = new Db();
        return await db.inserirBrinquedoNoEvento(brinquedosEvento).then(function(resposta){
            return resposta;
        });
    }
}

module.exports = Interface;