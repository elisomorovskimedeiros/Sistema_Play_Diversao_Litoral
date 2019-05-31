const     express = require("express"),
              ejs = require("ejs"),
       bodyParser = require("body-parser"),
   methodOverride = require("method-override"),
        Interface = require("./Controller/Interface"),
           Evento = require("./Model/Evento"),
               fs = require("fs");

const app = express();

app.set("view engine", ejs);

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));

function stringToDate(dataString){
    dataString = dataString.split("-");
    let data = new Date();        
    data.setDate(dataString[2]);
    data.setMonth(dataString[1]);
    data.setFullYear(dataString[0]); 
    return data;   
}

app.get("/", function(req, res){
    res.render("index.ejs");
});

app.get("/inserirCliente", function(req, res){
    let resposta;
    res.render("inserirCliente.ejs",{resposta});
});

app.post("/inserirCliente", function(req, res){
    var cliente = {
        nome: req.body.nome,
        email: req.body.email,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        telefone_recado: req.body.telefone_recado,
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        complemento: req.body.complemento,
        observacao_endereco: req.body.observacao_endereco,
        cidade: req.body.cidade,
        observacao_cliente: req.body.observacao_cliente
    }
    var int = new Interface();
    async function inserirCliente(){
        var resposta = await int.inserirCliente(cliente).then(function(resposta){
            res.render("inserirCliente.ejs",{resposta});
        });                           
    }
    inserirCliente();
    
});

app.get("/listarTodosClientes", function(req, res){
    var int = new Interface();
    int.listarTodosClientes().then(function(clientes){       
        res.render("listarCliente.ejs",{clientes});
    });    
});

app.get("/listarCliente", function(req, res){
    let clientes = undefined;
    res.render("listarCliente.ejs",{clientes});
});

app.post("/listarCliente", function(req, res){
    let nomeCliente = req.body.nome_cliente;
    var int = new Interface();
    int.listarCliente(nomeCliente).then(function(clientes){
        res.render("listarCliente.ejs",{clientes});
    });    
});

app.get("/inserirBrinquedo", function(req, res){
    let resposta;
    res.render("inserirBrinquedo.ejs", {resposta});
});

app.post("/inserirBrinquedo", function(req, res){
    var formidable = require("formidable");
    var form = formidable.IncomingForm();
    //no form do arquivo inserirBrinquedo foi utilizada a tag enctype="multipart/form-data" para permitir o envio da foto do produto, 
    //por isso foi necessário esse callback para realizar o cast do "req" recebido em formato binário para um objeto contendo o arquivo
    //enviado no objeto "file" e as informações dos campos no objeto "fields".
    form.parse(req, function(err, fields, files){
        if (err) throw(err);
        else{
            var oldpath = files.foto.path;
            var newpath = __dirname +"/public/imagens/"+ files.foto.name;
            fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;                                       
            });
            var brinquedo = {
                                nome_brinquedo: fields.nome,
                                caracteristicas: fields.caracteristicas,
                                foto_brinquedo: "imagens/"+ files.foto.name,
                                valor_brinquedo: fields.valor,
                                quantidade: fields.quantidade,
                                observacao: fields.observacao
                            }
            var int = new Interface();
            async function inserirBrinquedo(){
                var resposta = await int.inserirBrinquedo(brinquedo).then(function(resposta){
                    res.render("inserirBrinquedo.ejs",{resposta});
                });                           
            }
            inserirBrinquedo();            
        }                  
    });    
});

app.get("/listarBrinquedos", function(req, res){
    let brinquedos;
    res.render("listarBrinquedos.ejs", {brinquedos});
});

app.get("/listarTodosBrinquedos", function(req, res){
    var int = new Interface();
    int.listarTodosBrinquedos().then(function(brinquedos){       
        res.render("listarBrinquedos.ejs",{brinquedos});
    });     
});

app.get("/inserirEvento", function(req, res){
    let resposta;
    res.render("inserirEvento.ejs",{resposta});
});

app.post("/inserirEvento", function(req, res){
    let evento = new Evento(req.body.id_cliente, req.body.data, req.body.logradouro, Number(req.body.numero), req.body.complemento, req.body.cidade, Number(req.body.valor_total), Number(req.body.valor_desconto), Number(req.body.valor_sinal), req.body.observacao);
    let interface = new Interface();
    let data = stringToDate(req.body.data);
    interface.inserirEvento(evento).then(function(resposta){
        if(resposta.errno != undefined){
            res.send("Ocorreu o seguinte erro de inserção do evento no banco de dados: "+resposta);
        }else{
            let idEvento = resposta.insertId;
            let brinquedos = interface.listarTodosBrinquedos().then(function(brinquedos){
                brinquedos.data = data;
                brinquedos.idEvento = idEvento;
                console.log(brinquedos);        
                res.render("inserirBrinquedosNoEvento.ejs",{brinquedos});                               
            });  
        }       
    });          
});

app.post("/inserirBrinquedosNoEvento", function(req, res){
    
    let int = new Interface();
    let brinquedoEvento;
    idsBrinquedos = Object.keys(req.body);    
    console.log(idsBrinquedos);
    //Exemplo do formato do req.body vindo do cliente: [ '4', '5', 'id_evento' ].
    //Preciso extrair apenas os ids dos brinquedos, ou seja, itens 0 e 1.
    let posicaoASerRetirada;
    //listo a posição a ser retirada com forEach
    idsBrinquedos.forEach(function(campo, indice){
        if(campo == "id_evento"){
            posicaoASerRetirada = indice;
        }
    });
    //executo o método array.splice(posição) para retirar o item indesejado.
    idsBrinquedos.splice(posicaoASerRetirada);
    brinquedoEvento = {brinquedos: idsBrinquedos,
                       evento: req.body.id_evento};
    let resposta = int.inserirBrinquedoNoEvento(brinquedoEvento).then(function(resposta){
        if(resposta.errno != undefined){
            res.send("Ocorreu o seguinte erro de inserção do evento no banco de dados: "+resposta);
        }else{
            res.send("Inserido com sucesso!<br><a href='/'>Voltar ao início</a>")                            
            }  
    });
    
}); 

app.get("/listarEvento", function(req, res){
    res.render("listarEvento.ejs");
});

//###########################inicialização do servidor web ######################################
var server = app.listen("3000", function(){
    console.log("Queimando pneu na porta 3000");
});

//###########################inicialização do socket.io ######################################

var io = require("socket.io")(server);

// Envio da consulta por cliente
var socketio = io.on("connect", function(socketio){
    socketio.on("listaClientesPorNome", function(nomeCliente){        
        var int = new Interface();
        int.listarCliente(nomeCliente).then(function(clientes){
            socketio.emit("mandarClientes", clientes);
        });
    });

// Envio da consulta por brinquedo
    socketio.on("listaBrinquedosPorNome", function(nomeBrinquedo){        
        var int = new Interface();
        int.listarUmBrinquedo(nomeBrinquedo).then(function(brinquedos){
            socketio.emit("mandarBrinquedos", brinquedos);
        });
    });

//Envio da lista de brinquedos disponíveis para inserir em evento
    socketio.on("enviarBrinquedosDisponiveis", function(dataEvento){        
        var int = new Interface();
        int.listarTodosBrinquedos().then(function(brinquedos){
            socketio.emit("receberBrinquedosDisponiveis", brinquedos);
        });
    });
});




