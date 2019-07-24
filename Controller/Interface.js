const Db = require("../Controller/Db");

class Interface{
    constructor(){}

    async inserirCliente(cliente){
        let db = new Db();
        return await db.inserirCliente(cliente).then(function(resposta){
            return resposta;
        });
    }

    async inserirDiversosClientes(clientes){
        let db = new Db();
        return await db.inserirDiversosClientes(clientes).then(function(resposta){
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
        if(cliente.data){
            return await db.selectPorDataEvento(cliente).then(function(clientes){
                return clientes;
            });
        }else{
            return await db.selectUmCliente(cliente).then(function(clientes){
                return clientes;
            });
        }       
    }

    async excluirCliente(idCliente){
        let db = new Db();       
        return await db.excluirCliente(idCliente).then(function(mensagem){
            return mensagem;
        });       
    }

    async excluirEventosPorIdCliente(idCliente){
        let db = new Db();       
        return await db.excluirEventosPorIdCliente(idCliente).then(function(mensagem){
            return mensagem;
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

    async inserirDiversosEventos(eventos){
        let db = new Db();
        return await db.inserirDiversosEventos(eventos).then(function(resposta){
            return resposta;
        });
    }

    async inserirBrinquedoNoEvento(brinquedosEvento){
        let db = new Db();
        return await db.inserirBrinquedoNoEvento(brinquedosEvento).then(function(resposta){
            return resposta;
        });
    }

    async mostrarBrinquedosNoEvento(filtroDeBuscaEventos){
        let db = new Db();
        if (filtroDeBuscaEventos.nomeCliente && filtroDeBuscaEventos.dataEvento){
            return await db.selectBrinquedosNoEventoPorNomeClienteEData(filtroDeBuscaEventos.nomeCliente, filtroDeBuscaEventos.dataEvento).then(function(resposta){
                return resposta;
            });
        }else if (filtroDeBuscaEventos.nomeCliente){
            return await db.selectBrinquedosNoEventoPorNomeCliente(filtroDeBuscaEventos.nomeCliente).then(async function(brinquedos){              
                return brinquedos;               
            });
        }else if (filtroDeBuscaEventos.dataEvento){
            return await db.selectBrinquedosNoEventoPorData(filtroDeBuscaEventos.dataEvento).then(function(resposta){
                return resposta;
            });
        }
    }

    async filtrarEvento(filtroDeBuscaEventos){
        let db = new Db();
        if (filtroDeBuscaEventos.nomeCliente && filtroDeBuscaEventos.dataEvento){
            return await db.selectEventosPorClienteEData(filtroDeBuscaEventos.nomeCliente, filtroDeBuscaEventos.dataEvento).then(function(resposta){
                return resposta;
            });
        }else if (filtroDeBuscaEventos.nomeCliente){            
            return await db.selectEventosPorNomeCliente(filtroDeBuscaEventos.nomeCliente).then(async function(eventos){              
                return eventos;               
            });
        }else if (filtroDeBuscaEventos.dataEvento){
            return await db.selectEventosPorData(filtroDeBuscaEventos.dataEvento).then(function(resposta){
                return resposta;
            });
        }
    }

    async filtrarEventoPorIdCliente(idCliente){
        let db = new Db();
        return await db.selectEventoPorIdCliente(idCliente).then(function(eventos){
            return eventos;
        });
    }

    async editarCliente(cliente){
        let db = new Db();        
        return await db.editarCliente(cliente).then(function(resposta){
            return resposta;
        });
    }
}

module.exports = Interface;

/*
let retorno = new Promise(function(resolve, reject){
                    eventos.forEach(async function(evento) {
                        await db.mostrarBrinquedosNoEvento(evento.id_evento).then(function(brinquedos){
                            evento.brinquedos = brinquedos;
                            console.log(evento.brinquedos);
                        });
                    });
                    return resolve(eventos);                    
                });
*/