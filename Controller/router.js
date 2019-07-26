const express = require("express"),
       router = express.Router(),
       passport = require("passport"),
       fs = require("fs"),
       Interface = require("../Controller/Interface"),
           Evento = require("../Model/Evento"),

        //multer = require('../Controller/multer'), //utilizar o sharp para configurar a imagem após o upload  fonte: https://medium.com/collabcode/upload-e-compress%C3%A3o-de-imagens-com-nodejs-68109eed066e    
        multer  = require('multer'),
       
        login = require("../Controller/Login");

//const upload = multer({dest: 'public/imagens/'});
const int = new Interface();

function stringToDate(dataString){
    dataString = dataString.split("-");
    let data = new Date();        
    data.setDate(dataString[2]);
    data.setMonth(dataString[1]);
    data.setFullYear(dataString[0]); 
    return data;   
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        console.log("Autenticou");
        return next(); //prossegue com a execucao
    }
    res.redirect("/login"); //não prossegue com a execução e redireciona para a página login
}   

//executa o login do usuario
router.get('/login', function(req, res, next){
    res.render('login',{'message' :req.flash('message')});
});   

    
    //faz o logout do usuário
router.get("/logout", function(req, res){
        //passaporte destroi todos os dados do usuário na seção
    req.logout();
    res.redirect("/");
});   

router.get("/", isLoggedIn, function(req, res){
    res.render("index");
});

router.get("/inserirCliente", isLoggedIn, function(req, res){
    let resposta;
    res.render("inserirCliente.ejs",{resposta});
});

router.post("/inserirCliente", isLoggedIn, function(req, res){
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

router.get("/listarTodosClientes", isLoggedIn, function(req, res){
    var int = new Interface();
    int.listarTodosClientes().then(function(clientes){       
        res.render("listarCliente.ejs",{clientes});
    });    
});

router.get("/listarCliente",  isLoggedIn, function(req, res){
    let clientes = undefined;
    res.render("listarCliente.ejs",{clientes});
});

router.post("/listarCliente", isLoggedIn, function(req, res){
    let nomeCliente = req.body.nome_cliente;
    var int = new Interface();
    int.listarCliente(nomeCliente).then(function(clientes){
        res.render("listarCliente.ejs",{clientes});
    });    
});

router.get("/inserirBrinquedo", isLoggedIn, function(req, res){
    let resposta;
    res.render("inserirBrinquedo.ejs", {resposta});
});


//############ INSERÇÃO DE BRINQUEDO ################
//utilizado o midlleware Multer para captura do upload do arquivo contendo a foto do brinquedo

//configuração do multer
//site que ajudou: https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/imagens/");//local de gravação do arquivo
    },
    filename: function (req, file,cb){
        cb(null, file.originalname);//nome do arquivo
    }
});

var upload = multer({ storage: storage});//variável que manipula o post

router.post('/inserirBrinquedo', upload.single('foto'), (req, res, next) => {
    const file = req.file;
    if(!file){//caso algum erro tenha ocorrido
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
    }
    //gravação do brinquedo no db
    var brinquedo = {
        nome_brinquedo: req.body.nome,
        caracteristicas: req.body.caracteristicas,
        foto_brinquedo: "imagens/"+ req.file.originalname,
        valor_brinquedo: req.body.valor,
        quantidade: req.body.quantidade,
        observacao: req.body.observacao
    }
    
    var int = new Interface();
    async function inserirBrinquedo(){
        var resposta = await int.inserirBrinquedo(brinquedo).then(function(resposta){
            res.render("inserirBrinquedo.ejs",{resposta});
        });                           
    }
    inserirBrinquedo();     
});

router.post("/editarBrinquedo", upload.single('foto'), (req, res, next) =>{
    const file = req.file;
    
    //edição dos dados do brinquedo no db
    var brinquedo = {
        id_brinquedo: req.body.id_brinquedo,
        nome_brinquedo: req.body.nome_edicao,
        caracteristicas: req.body.caracteristicas_edicao,
        valor_brinquedo: req.body.valor_edicao,
        quantidade: req.body.quantidade_edicao,
        observacao: req.body.observacao_edicao
    }

    if(file){//caso algum erro tenha ocorrido
        brinquedo.foto_brinquedo = "imagens/"+ req.file.originalname 
     }
    var int = new Interface();
    async function editarBrinquedo(){
        var resposta = await int.editarBrinquedo(brinquedo).then(function(brinquedos){
            res.render("listarBrinquedos",{brinquedos});
        });                           
    }
    editarBrinquedo();
});


/*
router.post("/inserirBrinquedo", isLoggedIn, function(req, res){
    var formidable = require("formidable");
    var form = formidable.IncomingForm();
    //no form do arquivo inserirBrinquedo foi utilizada a tag enctype="multipart/form-data" para permitir o envio da foto do produto, 
    //por isso foi necessário esse callback para realizar o cast do "req" recebido em formato binário para um objeto contendo o arquivo
    //enviado no objeto "file" e as informações dos campos no objeto "fields".
    form.parse(req, function(err, fields, files){
        if (err) throw(err);
        else{
            var oldpath = files.foto.path;
            var newpath = "../public/imagens/"+ files.foto.name;
            fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;                                       
            });
            var brinquedo = {
                                nome_brinquedo: fields.nome,
                                caracteristicas: fields.caracteristicas,
                                foto_brinquedo: "../public/imagens/"+ files.foto.name,
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
*/


router.get("/listarBrinquedos", isLoggedIn, function(req, res){
    let brinquedos;
    res.render("listarBrinquedos.ejs", {brinquedos});
});

router.get("/listarTodosBrinquedos", isLoggedIn, function(req, res){
    var int = new Interface();
    int.listarTodosBrinquedos().then(function(brinquedos){       
        res.render("listarBrinquedos.ejs",{brinquedos});
    });     
});


router.get("/inserirEvento", isLoggedIn, function(req, res){
    let resposta;
    res.render("inserirEvento.ejs",{resposta});
});

router.post("/inserirEvento", isLoggedIn, function(req, res){
    let evento = new Evento(req.body.id_cliente, req.body.data, req.body.logradouro, Number(req.body.numero), req.body.complemento, req.body.cidade, Number(req.body.valor_total), Number(req.body.valor_desconto), Number(req.body.valor_sinal), req.body.observacao);
    let interface = new Interface();    
    let data = stringToDate(req.body.data);
    console.log(data);
    data.setHours(Number((req.body.hora).slice(0,2)));/*-(data.getTimezoneOffset())/60)*///para setar a hora, o sistema automaticamente guarda a hora utc, que é 
    // a hora de Brasília +3. Portanto foi subtraído a hora do retorno do método getTimezoneOffset() que mostra o desvio UTC em minutos.
    data.setMinutes((req.body.hora).slice(3,5)); 
    evento.data = data;
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

router.post("/inserirBrinquedosNoEvento", isLoggedIn, function(req, res){
    
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

router.get("/listarEvento", isLoggedIn, function(req, res){
    let evento;
    res.render("listarEvento.ejs",{evento});
});

router.post("/listarEvento", isLoggedIn, function(req, res){
});

router.post("/editarCliente", isLoggedIn, function(req, res){
    
    var cliente = {
        id_cliente: req.body.id_cliente,
        nome: req.body.nome_edicao,
        email: req.body.email,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        telefone_recado: req.body.telefone_recado,
        logradouro: req.body.logradouro_edicao,
        numero: req.body.numero,
        complemento: req.body.complemento,
        observacao_endereco: req.body.observacao_endereco,
        cidade: req.body.cidade,
        observacao_cliente: req.body.observacao_cliente
    }
    let int =  new Interface();
    int.editarCliente(cliente).then(function(resposta){
        if(resposta.errno != undefined){
            res.send("Ocorreu o seguinte erro de inserção do evento no banco de dados: "+resposta);
        }else{
            console.log("editou ok!")
            res.send("Inserido com sucesso!")                            
        }  
    });
    
});

router.post("/excluirCliente",  function(req, res){
    let idCliente = req.body.id_cliente_excluir;
    int.excluirEventosPorIdCliente(idCliente).then(function(resposta){
        if(resposta.errno){
            res.send("Ocorreu o seguinte erro na remoção dos eventos: "+ resposta.errno);            
        }else{
            int.excluirCliente(idCliente).then(function(resposta){
                if(resposta.errno){
                    res.send("Ocorreu o seguinte erro na remoção do usuário: "+ resposta.errno);
                }else{
                    res.send("Removido com sucesso");
                }
            });
        }           
    });
});


module.exports = router;


