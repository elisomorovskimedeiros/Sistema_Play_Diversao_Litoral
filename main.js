const     express = require("express"),
       bodyParser = require("body-parser"),
   methodOverride = require("method-override"),
        Interface = require("./Controller/Interface"),
           Evento = require("./Model/Evento"),               
   expressSession = require('express-session'),
            flash = require("connect-flash");
         passport = require("passport"),
            Email = require("./Model/Email"),
           moment = require("moment");
             Jimp = require('jimp'),//redimensionador de imagens
               fs = require("fs-extra"),
 eventoController = require("./Controller/eventoController"),
        Brinquedo = require("./Model/Brinquedo");

const obj_brinquedo = new Brinquedo();
const app = express(),
      int = new Interface();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(flash());

let user;



//####################### PASSPORT ####################################

app.use(expressSession({
    name: 'JSESSION',
    secret: 'MYSECRETISVERYSECRET',
    resave: false,
    saveUninitialized: false
}));

    app.use(passport.initialize());
    app.use(passport.session());
    const Login = require("./Controller/Login");
    const login = Login(passport);
    
    
    app.post("/login", login.passport.authenticate('local', {        
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
        }), function(req, res, info){            
            //res.render('index',{'message' :req.flash('message')});
            //res.send({status: true});
    });

    //funcao que será usada como middleware para verificar se o usuário está logado antes de mostrar a página
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next(); //prossegue com a execucao
    }
    res.redirect("/login"); //não prossegue com a execução e redireciona para a página login
}    

    
//################################## ROTAS HTTP ###################################

app.use(require("./Controller/router"));


//###########################inicialização do servidor web ######################################
var server = app.listen("21045", function(){
    console.log("Queimando pneu na porta 21045");
});

//###########################inicialização do socket.io ######################################

var io = require("socket.io")(server);


var socketio = io.on("connect", function(socketio){
// Envio da consulta por cliente
    socketio.on("listaClientesPorNome", function(nomeCliente, perfil){       
        int.listarCliente(nomeCliente, perfil).then(function(resposta){
            if(resposta.status){
                let clientes = resposta.resultado;
                socketio.emit("mandarClientes", clientes);
            }else{
                console.log(resposta);
            }           
        });
    });
    /*
    Recebo:
    filtroCliente = {
        nome : nome, 
        data : data,
        logradouro : logradouro,
        cidade : cidade
    }
    */
    socketio.on("filtroCliente", function(filtroCliente, perfil){   
         int.listarCliente(filtroCliente, perfil).then(function(resposta){
            if(resposta.status){
                let clientes = resposta.resultado;
                socketio.emit("mandarClientes", clientes);
            }else{
                console.log(resposta);
            }
        });
    });

    socketio.on("excluirCliente", function(idCliente, perfil){
        int.excluirCliente(idCliente, perfil).then(function(mensagem){
            socketio.emit("resultadoExclusaoCliente", mensagem);
        });
    });

// Envio da consulta por brinquedo
    socketio.on("listaBrinquedosPorNome", function(nomeBrinquedo, perfil){        
        int.listarUmBrinquedo(nomeBrinquedo, perfil).then(function(brinquedos){
            socketio.emit("mandarBrinquedos", brinquedos);
        });
    });

//Envio da lista de brinquedos disponíveis para inserir em evento
    socketio.on("enviarBrinquedosDisponiveis", function(dataEvento, perfil){        
        int.listarTodosBrinquedos(perfil).then(function(resposta){
            if(resposta.status){
                let brinquedos = resposta.resultado;
                socketio.emit("receberBrinquedosDisponiveis", brinquedos);
            }else{
                console.log(resposta.resultado);
            }            
        });
    });

//Envia a lista de eventos que tem o brinquedo a ser excluído
    socketio.on("meDaOsEventosAi", function(id_brinquedo, perfil){
        int.listarEventoClientePorIdBrinquedo(id_brinquedo, perfil).then(function(resposta){
            if(resposta.status){
                socketio.emit("mandarEssesEventos", resposta.resultado);
            }else{
                console.log(resposta.resultado);
            }            
        });
    });


//Envio da lista de eventos segundo o filtro recebido
// A lista de eventos é preenchida com duas querys, a primeira traz as informações do evento e do cliente e a segunda traz
// as informações dos brinquedos que pertencem ao evento. Depois é feita a comparação dos id_evento das duas tabelas para distribuir
// os brinquedos em seus devidos eventos.
    socketio.on("listaEventos", function(filtroDeBuscaEventos, perfil){
        int.filtrarEvento(filtroDeBuscaEventos, perfil).then(function(resposta){//primeira query
            if(resposta != undefined && resposta.status){
                let eventos = resposta.resultado;
                int.mostrarBrinquedosNoEvento(filtroDeBuscaEventos, perfil).then(function(resposta){//segunda query 
                    if(resposta.status){
                        let brinquedos = resposta.resultado;
                        eventos.forEach(evento => {//laços para distribuição dos brinquedos nos eventos e cálculo do valor liquido a ser recebido
                            evento.brinquedos = [];
                            brinquedos.forEach(brinquedo => {
                                if (evento.id_evento == brinquedo.id_evento){
                                    evento.brinquedos.push(brinquedo.nome_brinquedo);
                                }                 
                            });                            
                            if(evento.valor_desconto && evento.valor_total && evento.valor_sinal){
                                evento.valorLiquido = parseFloat(evento.valor_total) - parseFloat(evento.valor_desconto) -  parseFloat(evento.valor_sinal);
                            }                  
                        });  
                        socketio.emit("receberEventos", eventos);// envio para o cliente                         
                    }else{
                        console.log(resposta.resultado);
                    }                                 
                });   
            }else{
                console.log(resposta.resultado);
            }                         
        });       
    });


    socketio.on("listarEventosPorIdCliente", function(idCliente, perfil){
        int.filtrarEventoPorIdCliente(idCliente, perfil).then(function(resposta){
            if(resposta.status){
                socketio.emit("receberEventos",resposta.resultado);
            }else{
                console.log(resposta);
            }            
        });
    });

    socketio.on("enviarEmailConfirmacao", function(idEvento, perfil){
        let evento = { 
            id_evento: idEvento,
            status: 1
        };
        int.editarEvento(evento, perfil).then(function(resposta){
            if(resposta.status){
                let enviarEmail = new Email(perfil);
                enviarEmail.enviarEmailConfirmacao(idEvento).then(function(resultadoEnvio){
                    if(resultadoEnvio){
                        socketio.emit("retorno_mudanca_status_evento", {status: true, status_evento: 1, mensagem: "Mensagem Enviada com sucesso"});
                    }else{
                        socketio.emit("retorno_mudanca_status_evento", {status: false, status_evento: 1, mensagem: "Ocorreu um erro no envio do email"});
                    } 
                }); 
            }else{
                console.log(resposta);
                socketio.emit("retorno_mudanca_status_evento", {status: true, status_evento: 1, mensagem: "Ocorreu um erro ao confirmar o evento no banco de dados"});
            }            
        });                     
    });

    socketio.on("editarCliente", function(cliente, perfil){
        int.editarCliente(cliente, perfil).then(function(resposta){
            socketio.emit("resultadoEdicaoCliente", resposta.status);
            if(!resposta.status){
                console.log(resposta.resultado);
            }
        });
    });

    socketio.on("excluirCliente", function(idCliente, perfil){
        int.excluitEventoBrinquedoPorIdCliente(idCliente,perfil).then(function(resposta){
            if(resposta.status){
                int.excluirEventosPorIdCliente(idCliente,perfil).then(function(resposta){
                    if(resposta.status){
                        int.excluirCliente(idCliente,perfil).then(function(resposta){   
                            if(!resposta.status){
                                console.log("Ocorreu erro na exclusão do cliente");
                                console.log(resposta);
                            }
                            socketio.emit("resultadoExclusaoCliente", resposta);
                        });          
                    }else{
                        console.log("Ocorreu o seguinte erro na remoção dos eventos:");
                        console.log(resposta.resultado);
                        socketio.emit("resultadoExclusaoCliente", resposta);                
                    }           
                });
            
            }else{
                console.log("Ocorreu um erro ao excluir os brinquedos dos eventos relacionados ao cliente");
                console.log(resposta);
                socketio.emit("resultadoExclusaoCliente", resposta);
            }
        });
    });
        

    socketio.on("listaBrinquedosDisponiveis", function(perfil){
        int.listarTodosBrinquedos(perfil).then(function(resposta){
            if(resposta.status){
                socketio.emit("envioListaBrinquedos", resposta.resultado);
            }else{
                console.log(resposta.resultado);
                socketio.emit("envioListaBrinquedos", [{nome_brinquedo: "Ocorreu um erro na busca dos brinquedos"}]);
            }
        });
    });
//ENVIO DOS EVENTOS CUJO CADASTRO AINDA NÃO FOI PREENCHIDO
    socketio.on("pendenciasCadastro", function(perfil){
        int.selectSessoes(perfil).then(async function(resposta){
            if(resposta.status){
                let eventos = [];
                let sessoes = resposta.resultado;
                if(sessoes.length == 0) socketio.emit("receberEventos", eventos);
                await sessoes.forEach(async function(sessao, indice){
                    int.filtrarEventoPorIdEvento(sessao.evento, perfil).then(async function(resposta){
                        if(resposta.status){
                            if(resposta.resultado.length == 0){
                                await int.deleteSessao(sessao.evento, perfil);
                            }
                            eventos.push(resposta.resultado[0]);
                            if(sessoes.length - 1){
                                socketio.emit("receberEventos", eventos);
                            }
                        }else{
                            console.log(resposta.resultado);
                        }                       
                    });
                });                
            }else{
                console.log(resposta.resultado);
            }
        });
    });
    
    //################### EVENTOS V2 #######################

    async function verificarBrinquedosVagos(perfil, data){
        let lista_brinquedos_disponiveis = [];
        return int.select_qtd_de_brinquedos_alugados_no_dia(perfil, data).then(function(resposta){
            if (resposta.status){
                let qtd_brinquedos_alugada = resposta.resultado;
                return int.listarTodosBrinquedos(perfil).then(function(resposta){
                    if (resposta.status){
                        
                        let todos_brinquedos = resposta.resultado;
                        todos_brinquedos.forEach(function(brinquedo_lista){
                            let esta_alugado = false;
                            qtd_brinquedos_alugada.forEach(function(brinquedo_alugado){
                                if(brinquedo_lista.id_brinquedo == brinquedo_alugado.brinquedo_alugado){
                                    esta_alugado = true;                    
                                    if(brinquedo_lista.quantidade > brinquedo_alugado.quantidade_alugada){
                                        brinquedo_lista.quantidade = brinquedo_lista.quantidade - brinquedo_alugado.quantidade_alugada;
                                        lista_brinquedos_disponiveis.push(brinquedo_lista);
                                    }
                                }
                            });
                            if(!esta_alugado){
                                lista_brinquedos_disponiveis.push(brinquedo_lista);
                            }
                        });
                        return lista_brinquedos_disponiveis;
                    }else{
                        console.log("Ocorreu um erro");
                        console.log(resposta);
                        return {status: false,
                        resultado: "Não foi possível carregar a lista de geral de brinquedos"};
                    }    
                });
            }else{
                console.log("Ocorreu um erro");
                console.log(resposta);
                return {status: false,
                        resultado: "Não foi possível carregar a lista de brinquedos vagos"}; 
            }   
        });       
    }

    socketio.on("proximos_eventos", function(perfil){
        int.select_proximos_eventos(perfil).then(function(resposta){
            if(resposta.status){
                socketio.emit("receber_eventos", resposta.resultado);
            }else{
                console.log(resposta);
                socketio.emit("receber_eventos", {erro: "Ocorreu um erro no filtro de eventos"});
            }
        });
    });

    socketio.on("brinquedos_no_evento", function(id_evento, perfil){
        int.listarBrinquedosPorIdEvento(id_evento, perfil).then(function(resposta){
            if(resposta.status){                
                socketio.emit("lista_brinquedos_do_evento", resposta.resultado);
            }else{
                socketio.emit("lista_brinquedos_do_evento", {erro: "Ocorreu um erro no filtro de eventos"});
            }
        });
    });

    socketio.on("enviar_brinquedos_vagos", function(perfil, data){
        int.select_qtd_de_brinquedos(perfil, data).then(function(resposta){
            if(resposta.status){
                let lista_brinquedos_disponiveis = [];
                resposta.resultado.forEach(function(brinquedo){
                    if((!brinquedo.qtd_alugada) || (brinquedo.quantidade > brinquedo.qtd_alugada)){
                        lista_brinquedos_disponiveis.push(brinquedo);
                    }
                });
                socketio.emit("receber_brinquedos_vagos", {status: true,
                                                           resultado: lista_brinquedos_disponiveis});
            }else{
                socketio.emit("receber_brinquedos_vagos", {status: false,
                                                           resultado: "Não foi possível carregar a lista de brinquedos vagos"});
                console.log("Ocorreu um erro");
                console.log(resposta);
            }
        });
    }); 
    
    socketio.on("editar_evento", function(dados_recebidos, perfil){
        int.excluir_brinquedos_de_determinado_evento(perfil, dados_recebidos.brinquedos_retirados, dados_recebidos.evento.id_evento).then(function(resposta){
            if(resposta.status){
                let brinquedos_inseridos = {brinquedos: dados_recebidos.brinquedos_inseridos,
                                            evento: dados_recebidos.evento.id_evento};
                int.inserirBrinquedoNoEvento(brinquedos_inseridos, perfil).then(function(resposta){
                    if(resposta.status){
                        int.editarEvento(dados_recebidos.evento, perfil).then(function(resposta){
                            if(!resposta.status){
                                console.log("ocorreu um erro na edição do evento");
                                console.log(resposta);                                
                            }
                            socketio.emit("resposta_edicao_evento",resposta);
                        });
                    }else{
                        console.log("ocorreu um erro na inserção dos brinquedos no evento");
                        console.log(resposta);
                        socketio.emit("resposta_edicao_evento",resposta);
                    }
                });
            }else{
                console.log("ocorreu um erro na exclusão dos brinquedos no evento");
                console.log(resposta);
                socketio.emit("resposta_edicao_evento",resposta);
            }
        });
    });
   
    socketio.on("buscarBrinquedosVagosPorData", async function(data_perfil){
        let data = data_perfil.data;
        let perfil = data_perfil.perfil;
        let lista_brinquedos_disponiveis = await verificarBrinquedosVagos(perfil, data);
        socketio.emit("receberBrinquedosVagosPorData", lista_brinquedos_disponiveis,data);  
        
    });

    socketio.on("eventos_por_intervalo_de_data", function(perfil, de, ate){
        if(moment(de).isValid() || moment(ate).isValid()){
            int.select_evento_por_intervalo_data(perfil, de, ate).then(function(resposta){
                if(!resposta.status){
                    console.log("deu erro");
                    console.log("resposta");
                }
                socketio.emit("resposta_consulta_evento_por_intervalo_data", resposta);
            });
        }else{
            socketio.emit("resposta_consulta_evento_por_intervalo_data", {status: false, resultado: "A data informada é inválida"});
        }        
    });

    socketio.on("cancelar_evento", function(perfil, id_evento){
        let evento = {id_evento: id_evento,
                      status: 2};
        int.editarEvento(evento, perfil).then(function(resposta){
            if(resposta.status){
                socketio.emit("retorno_mudanca_status_evento", {status: true, status_evento: 2, mensagem: "Evento Cancelado"});
            }else{
                console.log(resposta);
                socketio.emit("retorno_mudanca_status_evento", {status: false, status_evento: 2, mensagem: "Ocorreu um erro ao cancelar o evento"});
            }
        });
    });

    socketio.on("copiar_evento", function(perfil, evento){
        int.inserirEventoComClienteEBrinquedo(perfil, evento).then(function(resposta){
            if(!resposta.status){
                console.log(resposta);
            }
            socketio.emit("receber_evento_copiado", resposta);
        });
        
    });

    socketio.on("buscaEvento", async function(perfil, itemDeBusca){
        let resposta = await eventoController.buscaPorEvento(perfil, itemDeBusca);
        if(!itemDeBusca && itemDeBusca == ''){
            socketio.emit("receber_eventos", {erro: "Sem resultados"});
        }else{
            if(resposta.status){
                socketio.emit("receber_eventos", resposta.resultado);
            }else{
                console.log(resposta);
                socketio.emit("receber_eventos", {erro: "Ocorreu um erro no filtro de eventos"});
            }
        }      
    });

    socketio.on("buscarClientePorIdouNome", function(itemDeBusca, perfil){
        const regex = /[0-9]/;
        let naoEhNumero = false;
        for(let i = 0; i < itemDeBusca.length; i++){
            if(!regex.test(itemDeBusca[i])){ //teste para verificar se existem letras, caracterizando busca por nome
                naoEhNumero = true;
                break;
            }
        }
        if(naoEhNumero && itemDeBusca.length > 2){
            let cliente = {
                nome: itemDeBusca,
                cidade: '',
                logradouro: ''};
            int.listarCliente(cliente, perfil).then(function(resposta){
                socketio.emit("receberFiltroClientes", resposta);
            });
        }else{
            int.buscarClientePorId(itemDeBusca, perfil).then(function(resposta){
                socketio.emit("receberFiltroClientes", resposta);
            });
        }          
    });
    socketio.on("editarCliente", function(cliente, perfil){
        int.editarCliente(cliente,perfil).then(function(resposta){
            socketio.emit("respostaEdicaoCliente", resposta);
        });
    });

    socketio.on("listarTodosBrinquedos", function(perfil){
        obj_brinquedo.listar_todos_brinquedos(int, perfil).then(function(brinquedos){
            socketio.emit("listaDeTodosBrinquedos", brinquedos);
        });
    });

    socketio.on("deletarCliente", function(id_cliente, perfil){
        int.excluirCliente(id_cliente, perfil).then(function(resposta){
            socketio.emit("respostaRemocaoCliente", resposta);
        });
    });
});









