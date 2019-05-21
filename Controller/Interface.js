const Db = require("../Controller/Db");

class Interface{
    constructor(){}

    async inserirCliente(cliente){
        let db = new Db();
        db.inserirCliente(cliente);
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
}

module.exports = Interface;