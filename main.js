const     express = require("express"),
       bodyParser = require("body-parser"),
   methodOverride = require("method-override"),
        Interface = require("./Controller/Interface"),
           Evento = require("./Model/Evento"),
               
               expressSession = require('express-session'),
            flash = require("connect-flash");
            passport = require("passport");

const app = express(),
      int = new Interface();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(flash());



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
    socketio.on("listaClientesPorNome", function(nomeCliente){        
        int.listarCliente(nomeCliente).then(function(clientes){
            socketio.emit("mandarClientes", clientes);
        });
    });

    socketio.on("filtroCliente", function(filtroCliente){   
         int.listarCliente(filtroCliente).then(function(clientes){
            socketio.emit("mandarClientes", clientes);
        });
    });

    socketio.on("excluirCliente", function(idCliente){
        int.excluirCliente(idCliente).then(function(mensagem){
            socketio.emit("resultadoExclusaoCliente", mensagem);
        });
    });

// Envio da consulta por brinquedo
    socketio.on("listaBrinquedosPorNome", function(nomeBrinquedo){        
        int.listarUmBrinquedo(nomeBrinquedo).then(function(brinquedos){
            socketio.emit("mandarBrinquedos", brinquedos);
        });
    });

//Envio da lista de brinquedos disponíveis para inserir em evento
    socketio.on("enviarBrinquedosDisponiveis", function(dataEvento){        
        int.listarTodosBrinquedos().then(function(brinquedos){
            socketio.emit("receberBrinquedosDisponiveis", brinquedos);
        });
    });


//Envio da lista de eventos segundo o filtro recebido
// A lista de eventos é preenchida com duas querys, a primeira traz as informações do evento e do cliente e a segunda traz
// as informações dos brinquedos que pertencem ao evento. Depois é feita a comparação dos id_evento das duas tabelas para distribuir
// os brinquedos em seus devidos eventos.
    socketio.on("listaEventos", function(filtroDeBuscaEventos){
        var resposta = int.filtrarEvento(filtroDeBuscaEventos).then(function(eventos){//primeira query
            console.log(eventos);
            int.mostrarBrinquedosNoEvento(filtroDeBuscaEventos).then(function(brinquedos){//segunda query                 
                eventos.forEach(evento => {//laços para distribuição dos brinquedos nos eventos
                    evento.brinquedos = [];
                    brinquedos.forEach(brinquedo => {
                        if (evento.id_evento == brinquedo.id_evento){
                            evento.brinquedos.push(brinquedo.nome_brinquedo);
                        }                          
                    });                    
                });
                
                socketio.emit("receberEventos", eventos);// envio para o cliente               
            });                
        });       
    });

    socketio.on("listarEventosPorIdCliente", function(idCliente){
        int.filtrarEventoPorIdCliente(idCliente).then(function(eventos){
            socketio.emit("receberEventos",eventos);
        });
    });
});





