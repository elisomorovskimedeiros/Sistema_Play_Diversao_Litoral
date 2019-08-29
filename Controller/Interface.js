const Db = require("../Controller/Db");
//const db = new Db();

class Interface{
    constructor(){
        //this.db = db;
    }

    async inserirCliente(cliente, perfil){
        let db = new Db(perfil);
        return await db.inserirCliente(cliente).then(function(resposta){
            return resposta;
        });
    }

    async inserirDiversosClientes(clientes,perfil){
        let db = new Db(perfil);
        return await db.inserirDiversosClientes(clientes).then(function(resposta){
            return resposta;
        });
    }

    async listarTodosClientes(perfil){
        let db = new Db(perfil);
        return await db.selectTodosClientes().then(function(clientes){
            return clientes;
        });
    }

    async listarCliente(cliente,perfil){
        let db = new Db(perfil);
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

    async excluirCliente(idCliente,perfil){
        let db = new Db(perfil);       
        return await db.excluirCliente(idCliente).then(function(mensagem){
            return mensagem;
        });       
    }

    async excluirEventosPorIdCliente(idCliente,perfil){
        let db = new Db(perfil);       
        return await db.excluirEventosPorIdCliente(idCliente).then(function(mensagem){
            return mensagem;
        });
    }

    async inserirBrinquedo(brinquedo,perfil){
        let db = new Db(perfil);
        return await db.inserirBrinquedo(brinquedo).then(function(resposta){
            return resposta;
        });
    }

    async editarBrinquedo(brinquedo,perfil){
        let db = new Db(perfil);
        return await db.editarBrinquedo(brinquedo).then(function(resposta){
            return resposta;
        });
    }

    async listarTodosBrinquedos(perfil){
        let db = new Db(perfil);
        return await db.selectTodosBrinquedos().then(function(brinquedos){
            return brinquedos;
        });
    }

    async listarUmBrinquedo(nomeBrinquedo,perfil){
        let db = new Db(perfil);
        return await db.selectUmBrinquedo(nomeBrinquedo).then(function(brinquedos){
            return brinquedos;
        });
    }

    async listarEventoPorIdBrinquedo(id_brinquedo,perfil){        
        let db = new Db(perfil);
        return await db.selectEventoPorIdBrinquedo(id_brinquedo).then(function(eventos){
            return eventos;
        });
    }

    async inserirEvento(evento,perfil){
        let db = new Db(perfil);
        return await db.inserirEvento(evento).then(function(resposta){
            return resposta;
        });
    }

    async inserirDiversosEventos(eventos,perfil){
        let db = new Db(perfil);
        return await db.inserirDiversosEventos(eventos).then(function(resposta){
            return resposta;
        });
    }

    async inserirBrinquedoNoEvento(brinquedosEvento,perfil){
        let db = new Db(perfil);
        return await db.inserirBrinquedoNoEvento(brinquedosEvento).then(function(resposta){
            return resposta;
        });
    }

    async mostrarBrinquedosNoEvento(filtroDeBuscaEventos,perfil){
        let db = new Db(perfil);
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

    async verIdsBrinquedosPorIdEvento(idEvento,perfil){
        let db = new Db(perfil);
        return await db.selectIdsBrinquedosPorIdEventos(idEvento).then(function(resposta){
            return resposta;
        });
    }

    async filtrarEvento(filtroDeBuscaEventos,perfil){
        let db = new Db(perfil);
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

    async filtrarEventoPorIdCliente(idCliente,perfil){
        let db = new Db(perfil);
        return await db.selectEventoPorIdCliente(idCliente).then(function(eventos){
            return eventos;
        });
    }

    async filtrarEventoPorIdEvento(idEvento,perfil){
        let db = new Db(perfil);
        return await db.selectUmEvento(idEvento).then(function(evento){
            return evento;
        });
    }

    async editarCliente(cliente,perfil){
        let db = new Db(perfil);        
        return await db.editarCliente(cliente).then(function(resposta){
            return resposta;
        });
    }

    async editarEvento(evento,perfil){
        let db = new Db(perfil);        
        return await db.editarEvento(evento).then(function(resposta){
            return resposta;
        });
    }

    async listarBrinquedosPorIdEvento(id_evento,perfil){
        let db = new Db(perfil);
        return await db.selectBrinquedosPorIdEvento(id_evento);
    }

    async excluirBrinquedosEvento(id_evento,perfil){
        let db = new Db(perfil);
        return await db.excluirBrinquedosEvento(id_evento);
    }

    async excluirEvento(idEvento,perfil){
        let db = new Db(perfil);
        return await db.excluirEvento(idEvento);
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