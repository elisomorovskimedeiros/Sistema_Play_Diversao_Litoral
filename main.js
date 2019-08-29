const     express = require("express"),
       bodyParser = require("body-parser"),
   methodOverride = require("method-override"),
        Interface = require("./Controller/Interface"),
           Evento = require("./Model/Evento"),               
   expressSession = require('express-session'),
            flash = require("connect-flash");
         passport = require("passport"),
EnvioConfirmacoes = require("./Model/EnvioConfirmacoes");

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
            res.render('index',{'message' :req.flash('message')});
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
        int.listarCliente(nomeCliente, perfil).then(function(clientes){
            socketio.emit("mandarClientes", clientes);
        });
    });

    socketio.on("filtroCliente", function(filtroCliente, perfil){   
         int.listarCliente(filtroCliente, perfil).then(function(clientes){
            socketio.emit("mandarClientes", clientes);
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
        int.listarTodosBrinquedos(perfil).then(function(brinquedos){
            socketio.emit("receberBrinquedosDisponiveis", brinquedos);
        });
    });

//Envia a lista de eventos que tem o brinquedo a ser excluído
    socketio.on("meDaOsEventosAi", function(id_brinquedo, perfil){
        int.listarEventoPorIdBrinquedo(id_brinquedo, perfil).then(function(listaEventos){
            socketio.emit("receberEventos", listaEventos);
        });
    });


//Envio da lista de eventos segundo o filtro recebido
// A lista de eventos é preenchida com duas querys, a primeira traz as informações do evento e do cliente e a segunda traz
// as informações dos brinquedos que pertencem ao evento. Depois é feita a comparação dos id_evento das duas tabelas para distribuir
// os brinquedos em seus devidos eventos.
    socketio.on("listaEventos", function(filtroDeBuscaEventos, perfil){
        console.log(perfil);

        var resposta = int.filtrarEvento(filtroDeBuscaEventos, perfil).then(function(eventos){//primeira query
            int.mostrarBrinquedosNoEvento(filtroDeBuscaEventos, perfil).then(function(brinquedos){//segunda query                 
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
            });                
        });       
    });

    socketio.on("listarEventosPorIdCliente", function(idCliente, perfil){
        int.filtrarEventoPorIdCliente(idCliente, perfil).then(function(eventos){
            socketio.emit("receberEventos",eventos);
        });
    });

    socketio.on("enviarEmail", function(idEvento, perfil){
        console.log(perfil);
        int.filtrarEventoPorIdEvento(idEvento, perfil).then(function(resposta){
            if(resposta.status){
                let evento = resposta.resultado[0];
                int.listarClientePorIdEvento(idEvento, perfil).then(function(resposta){
                    if(resposta.status){                        
                        let cliente = resposta.resultado[0];
                        int.listarBrinquedosPorIdEvento(idEvento, perfil).then(function(resposta){
                            if(resposta.status){
                                let listaBrinquedos = 'Irá no dia ';
                                if( resposta.resultado.lengh > 0){
                                    resposta.resultado.forEach(function(brinquedo, indice){                                    
                                        listaBrinquedos += brinquedo.nome_brinquedo+", "
                                    });
                                }else listaBrinquedos = undefined;                                
                                let data = evento.data.getDate()+"/"+(Number(evento.data.getMonth())+1)+"/"+evento.data.getFullYear();
                                let enderecoEvento = evento.logradouro+", "+evento.numero;
                                let valorFinal = evento.valor_total - evento.valor_desconto - evento.valor_sinal;
                                let mensagem = "Parabéns "+ cliente.nome+", sua festa já esta agendada!!\n Dia "+data+
                                " estaremos no endereço, "+enderecoEvento+", para realizar a montagem dos brinquedos.\n";                                
                                if(listaBrinquedos){
                                    mensagem += listaBrinquedos;
                                }
                                mensagem += "\nApós o término da montagem você tira todas as suas "+
                                "dúvidas e acerta o valor de R$"+valorFinal+",00 com o montador.\n"+
                                "Atenciosamente,\n"+
                                "Equipe Play Diversão";

                                email = new EnvioConfirmacoes(cliente.email,mensagem);
                                let retornoEmail = email.enviar();
                                retornoEmail.then(function(retorno){
                                    if(retorno.status){
                                        socketio.emit("retorno", "Mensagem Enviada com sucesso");                
                                    }
                                    else{
                                        socketio.emit("retorno", "Ocorreu um erro no envio do email\n"+ retorno.detalhes);
                                    }
                                });
                            }else{
                                console.log(resposta.resultado);
                                socketio.emit("retorno", "Ocorreu um erro no banco de dados");
                            }
                        });                        
                    }else{
                        console.log(resposta.resultado);
                        socketio.emit("retorno", "Ocorreu um erro no banco de dados");
                    }
                });
            }else{
                console.log(resposta.resultado);
                socketio.emit("retorno", "Ocorreu um erro no banco de dados");
            }
        });
    })
});





