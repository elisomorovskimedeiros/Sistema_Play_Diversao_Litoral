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
        return await db.selectUmCliente(cliente).then(function(clientes){
            return clientes;
        });      
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
        return await db.selectBrinquedosNoEventoPorNomeClienteEData(filtroDeBuscaEventos.nomeCliente, filtroDeBuscaEventos.dataEvento).then(function(resposta){
            return resposta;
        });
        /*
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
        }else if (!filtroDeBuscaEventos.dataEvento && !filtroDeBuscaEventos.nomeCliente){
            return await db.selectBrinquedosNoEventoPorData(filtroDeBuscaEventos.dataEvento).then(function(resposta){
                return resposta;
            });
        }else{
            return [];
        }*/
    }

    async verIdsBrinquedosPorIdEvento(idEvento,perfil){
        let db = new Db(perfil);
        return await db.selectIdsBrinquedosPorIdEventos(idEvento).then(function(resposta){
            return resposta;
        });
    }

    async filtrarEvento(filtroDeBuscaEventos,perfil){
        let db = new Db(perfil);
        return await db.selectEventosPorClienteEData(filtroDeBuscaEventos.nomeCliente, filtroDeBuscaEventos.dataEvento).then(function(resposta){
            return resposta;
        });
        /*
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
        }else if (!filtroDeBuscaEventos.dataEvento && !filtroDeBuscaEventos.nomeCliente){
            return await db.selectTodosEventos().then(function(resposta){
                return resposta;
            });
        }else{
            return [];
        }*/
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

    async excluirBrinquedo(id_brinquedo,perfil){
        let db = new Db(perfil);
        return await db.excluirBrinquedosEventoPorIdBrinquedo(id_brinquedo).then(async function(resposta){

            if(resposta.status){
                return await db.excluirBrinquedo(id_brinquedo).then(function(resposta){
                    return resposta;
                });
            }else{
                return resposta;
            }           
        });
    }

    async excluirEvento(idEvento,perfil){
        let db = new Db(perfil);
        return await db.excluirEvento(idEvento);
    }

    async listarClientePorIdEvento(idEvento, perfil){
        let db = new Db(perfil);
        return await db.selectClientePorIdEvento(idEvento);
    }

    async inserirSessao(sessao, perfil){
        let db = new Db(perfil);
        return await db.inserirSessao(sessao);
    }

    async selectSessoes(perfil){
        let db = new Db(perfil);
        return await db.selectSessoes();
    }

    async deleteSessao(evento, perfil){
        let db = new Db(perfil);
        return await db.deleteSessao(evento);
    }

    async acharSessao(idEvento, perfil){
        let db = new Db(perfil);
        return await db.selectSessao(idEvento,perfil).then(function(resposta){
            let sessao;
            if(resposta.status && resposta.resultado.length > 0){
                sessao = resposta.resultado[0];
                return db.selectUmEvento(sessao.evento, perfil).then(function(resposta){
                    if(resposta.status){
                        sessao.evento = resposta.resultado;
                        return sessao;
                    }else{
                        return false;
                    }
                });
            }else{
                return false;
            }
        });
    } 
    
    async listarEventoClientePorIdBrinquedo(idBrinquedo, perfil){
        let db = new Db(perfil);
        return await db.listarEventoClientePorIdBrinquedo(idBrinquedo);
    }

    async pegarEventoClienteEBrinquedosPorIdEvento(idEvento, perfil){
        let int = this;
        let evento;
        return await int.filtrarEventoPorIdEvento(idEvento, perfil).then(function(resposta){
            if(resposta.status){
                evento = resposta.resultado[0];
                return int.listarClientePorIdEvento(idEvento, perfil).then(function(resposta){
                    if(resposta.status){                        
                        evento.cliente = resposta.resultado[0];
                        return int.listarBrinquedosPorIdEvento(idEvento, perfil).then(function(resposta){
                            if(resposta.status){
                                evento.brinquedos = resposta.resultado;
                                return evento;
                            }else{
                                console.log(resposta);
                                return false;
                            }
                        });
                    }else{
                        console.log(resposta);
                        return false;
                    }
                });
            }else{
                console.log(resposta);
                return false;
            }
        });                
    }   

    //########## MÉTODOS V2 ###########
    async select_proximos_eventos(perfil){
        let db = new Db(perfil);
        return await db.select_proximos_eventos().then(function(resposta){
            return resposta;
        });
    }
    
    async select_qtd_de_brinquedos(perfil, data){
        let db = new Db(perfil);
        return await db.select_qtd_de_brinquedos(data).then(function(resposta){
            return resposta;
        });
    }

    async select_qtd_de_brinquedos_alugados_no_dia(perfil, data){
        let db = new Db(perfil);
        return await db.select_qtd_de_brinquedos_alugados_no_dia(data).then(function(resposta){
            return resposta;
        });
    }

    async excluir_brinquedos_de_determinado_evento(perfil, brinquedos, evento){
        let db = new Db(perfil);
        return await db.excluir_brinquedos_de_determinado_evento(brinquedos, evento).then(function(resposta){
            return resposta;
        });
    }

    async select_evento_por_intervalo_data(perfil, de, ate){
        let db = new Db(perfil);
        /*if(de == ""){
            return await db.selectEventosPorClienteEData("", ate).then(function(resposta){
                return resposta;
            });
        }else if(ate == ""){
            return await db.selectEventosPorClienteEData("", de).then(function(resposta){
                return resposta;
            });
        }else{*/
            return await db.select_evento_por_intervalo_data(de, ate).then(function(resposta){
                return resposta;
            });
        //}
        
    }

}

module.exports = Interface;

