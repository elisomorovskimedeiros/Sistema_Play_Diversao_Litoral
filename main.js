const     express = require("express");  
              ejs = require("ejs");
       bodyParser = require("body-parser"),
   methodOverride = require("method-override");
        Interface = require("./Controller/Interface");
const app = express();

app.set("view engine", ejs);

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("index.ejs");
});

app.get("/inserirCliente", function(req, res){
    res.render("inserirCliente.ejs");
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
    int.inserirCliente(cliente);
});

app.get("/listarTodosClientes", function(req, res){
    var int = new Interface();
    int.listarTodosClientes().then(function(clientes){
        res.send(clientes);
    });    
});

app.post("/listarCliente", function(req, res){
    let nomeCliente = req.body.nome_cliente;
    var int = new Interface();
    int.listarCliente(nomeCliente).then(function(clientes){
        res.send(clientes);
    });    
});


app.listen("3000", function(){
    console.log("Queimando pneu na porta 3000");
});