const express = require("express"),
       router = express.Router(),
       passport = require("passport"),
       fs = require("fs"),
       Interface = require("../Controller/Interface"),
           Evento = require("../Model/Evento"),
           Cliente = require("../Model/Cliente"),

        //multer = require('../Controller/multer'), //utilizar o sharp para configurar a imagem após o upload  fonte: https://medium.com/collabcode/upload-e-compress%C3%A3o-de-imagens-com-nodejs-68109eed066e    
        multer  = require('multer'),
       
        login = require("../Controller/Login");

//const upload = multer({dest: 'public/imagens/'});
const int = new Interface();
let perfil = undefined;
class Sessao{
    constructor(){
        this.evento = Evento,
        this.cliente = Cliente,
        this.perfil = '';
        this.horaCriacao = Date.now();
    }
}

let clientes, sessoes = []; //utilizado no post /cadastroPlay

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
    res.render('login',{'message' :req.flash('message'), perfil});
});   

    
    //faz o logout do usuário
router.get("/logout", function(req, res){
        //passaporte destroi todos os dados do usuário na seção
    req.logout();
    res.redirect("/");
});   

router.get("/", isLoggedIn, function(req, res){
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    let tituloIndex = perfil.tituloIndex;
    res.render("index",{perfil});
});

router.get("/inserirCliente", isLoggedIn, function(req, res){
    let resposta;
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    res.render("inserirCliente.ejs",{resposta, perfil});
});

router.post("/inserirCliente", isLoggedIn, function(req, res){
    var cliente = {
        nome: req.body.nome_novo_cliente,
        email: req.body.email_novo_cliente,
        cpf: req.body.cpf_novo_cliente,
        telefone: req.body.telefone_novo_cliente,
        telefone_recado: req.body.telefone_recado_novo_cliente,
        logradouro: req.body.logradouro_novo_cliente,
        numero: req.body.numero_novo_cliente,
        complemento: req.body.complemento_novo_cliente,
        observacao_endereco: req.body.observacao_endereco_novo_cliente,
        bairro: req.body.bairro_novo_cliente,
        cidade: req.body.cidade_novo_cliente,
        observacao_cliente: req.body.observacao_cliente_novo_cliente
    }
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    
    int.inserirCliente(cliente,perfil.perfil).then(function(resposta){
        if(resposta.status){
            res.send("Inserido com sucesso!");
        }else{
            res.send("Ocorreu um erro na inserção do cliente.")
            console.log(resposta.resultado);
        }
    }); 
});

router.get("/listarTodosClientes", isLoggedIn, function(req, res){
    var int = new Interface();
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    int.listarTodosClientes(perfil).then(function(clientes){       
        res.render("listarCliente.ejs",{clientes, perfil});
    });    
});

router.get("/listarCliente",  isLoggedIn, function(req, res){
    let clientes = undefined;
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    res.render("listarCliente.ejs",{clientes, perfil});
});

router.post("/listarCliente", isLoggedIn, function(req, res){
    let nomeCliente = req.body.nome_cliente;
    var int = new Interface();
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    int.listarCliente(nomeCliente,perfil).then(function(clientes){
        res.render("listarCliente.ejs",{clientes,perfil});
    });    
});

router.get("/inserirBrinquedo", isLoggedIn, function(req, res){
    let resposta;
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    res.render("inserirBrinquedo.ejs", {resposta,perfil});
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

router.post('/inserirBrinquedo', upload.single('foto_insercao_brinquedo'), (req, res, next) => {
    const file = req.file;
    let foto_brinquedo = '';
    if(!file){//caso algum erro tenha ocorrido
        /*
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
        */
        console.log("não veio foto");
    }else{
        foto_brinquedo = "imagens/"+ req.file.originalname;
    }
    //gravação do brinquedo no db
    var brinquedo = {
        nome_brinquedo: req.body.nome_insercao_brinquedo,
        caracteristicas: req.body.caracteristicas_insercao_brinquedo,
        foto_brinquedo: foto_brinquedo,
        valor_brinquedo: req.body.valor_insercao_brinquedo,
        quantidade: req.body.quantidade_insercao_brinquedo,
        observacao: req.body.observacao_insercao_brinquedo
    }

    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    int.inserirBrinquedo(brinquedo,perfil.perfil).then(function(resultado){
        let resposta;
        if(resultado.status){
            resposta = "Brinquedo inserido com sucesso!";            
            //res.send("Brinquedo inserido com sucesso!");
        }else{
            console.log(resultado);
            resposta = "Ocorreu um erro na inserção do brinquedo";
            //res.send("Ocorreu um erro na inserção do brinquedo");
        }
        res.render("inserirBrinquedo", {resposta, perfil});
    });  
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
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");

    int.editarBrinquedo(brinquedo,perfil.perfil).then(function(brinquedos){
        if(brinquedos.status){
            resposta = "Brinquedo editado com sucesso!";            
            //res.send("Brinquedo inserido com sucesso!");
        }else{
            console.log(brinquedos);
            resposta = "Ocorreu um erro na edição do brinquedo";
            //res.send("Ocorreu um erro na inserção do brinquedo");
        }
        res.render("listarBrinquedos", {brinquedos, perfil});
    });
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
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    res.render("listarBrinquedos.ejs", {brinquedos, perfil});
});

router.get("/listarTodosBrinquedos", isLoggedIn, function(req, res){
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    int.listarTodosBrinquedos(perfil.perfil).then(function(resposta){  
        let brinquedos;
        if(resposta.status){
            brinquedos = resposta.resultado;
            res.render("listarBrinquedos.ejs",{brinquedos, perfil});
        }else{
            console.log(resposta.resultado);
        }             
    });     
});


router.get("/inserirEvento", isLoggedIn, function(req, res){
    let resposta;
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    res.render("inserirEvento.ejs",{resposta, perfil});
});

function formataData(){}

router.post("/inserirEvento", isLoggedIn, function(req, res){
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");

    let evento = new Evento(req.body.id_cliente, req.body.data_evento, req.body.logradouro_evento, 
        Number(req.body.numero), req.body.complemento, req.body.bairro_evento, req.body.cidade_evento, 
        Number(req.body.valor_total), Number(req.body.valor_desconto), 
        Number(req.body.valor_sinal), req.body.observacao);
    /*
    console.log(req.body.data);
    console.log(req.body.hora);
    let interface = new Interface();
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");  
    let data = stringToDate(req.body.data);
    //console.log(data);
    data.setHours(Number((req.body.hora).slice(0,2)));/*-(data.getTimezoneOffset())/60)*///para setar a hora, o sistema automaticamente guarda a hora utc, que é 
    // a hora de Brasília +3. Portanto foi subtraído a hora do retorno do método getTimezoneOffset() que mostra o desvio UTC em minutos.
    /*
    data.setMinutes((req.body.hora).slice(3,5)); 
    evento.data = data;
    */

    evento.data = evento.data + " " + req.body.hora_evento + ":00";
    let brinquedos = req.body.listaBrinquedosInseridos.split(",");
    evento.id_cliente = req.body.idClienteEscolhido;
    let mensagem = '';
    int.inserirEvento(evento,perfil.perfil).then(function(resposta){
        if(!resposta.status){
            console.log(resposta.resultado);
            mensagem = "Ocorreu um erro e o evento não foi inserido";
            res.render("inserirEvento", {mensagem, perfil});
        }else{
            let brinquedoEvento = {brinquedos: brinquedos,
                evento: resposta.resultado.insertId};            
            int.inserirBrinquedoNoEvento(brinquedoEvento,perfil.perfil).then(function(resposta){
                if(!resposta.status){
                    console.log(resposta.resultado);
                    mensagem = "Ocorreu um erro de inserção do evento";
                    res.render("inserirEvento", {mensagem, perfil});
                }else{
                    mensagem = "Inserido com sucesso";
                    res.render("inserirEvento", {mensagem, perfil});                           
                }  
            });
        }       
    });
});

router.post("/inserirBrinquedosNoEvento", isLoggedIn, function(req, res){
    
    let int = new Interface();
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
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
    let resposta = int.inserirBrinquedoNoEvento(brinquedoEvento,perfil.perfil).then(function(resposta){
        if(!resposta.status){
            console.log(resposta.resultado);
            mensagem = "Ocorreu um erro de inserção do evento";
            res.render("inserirEvento", {mensagem, perfil});
        }else{
            mensagem = "Inserido com sucesso";
            res.render("inserirEvento", {mensagem, perfil});                           
        }   
    });
    
}); 

router.get("/listarEvento", isLoggedIn, function(req, res){
    let evento;
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    //é necessário puxar a lista dos brinquedos do bd para o caso de edição dos eventos
    int.listarTodosBrinquedos(perfil.perfil).then(function(resposta){
        let brinquedos = resposta.resultado;
        res.render("listarEvento.ejs",{evento, brinquedos, perfil});
    });    
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
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    int.editarCliente(cliente,perfil).then(function(resposta){
        if(resposta.errno != undefined){
            res.send("Ocorreu o seguinte erro de inserção do evento no banco de dados: "+resposta);
        }else{
            console.log("editou ok!")
            res.send("Inserido com sucesso!")                            
        }  
    });
    
});

router.post("/excluirCliente", isLoggedIn,  function(req, res){
    let idCliente = req.body.id_cliente_excluir;
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    int.excluirEventosPorIdCliente(idCliente,perfil).then(function(resposta){        
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

//rota que cria a sessao para cadastro do cliente
router.get("/criarSessaoCliente", isLoggedIn, function(req,res){
    //evento que será utilizado na sessao
    evento = new Evento(null, new Date(), "cliente preencherá", 0, " ", " ", " ", 0, 0, 0, " ");
    let perfil = req.user.perfil;
    int.inserirEvento(evento,perfil).then(function(resposta){
        if(resposta.status){
            let id_evento = resposta.resultado.insertId;
            let sessao = new Sessao();
            evento.id_evento = id_evento;
            sessao.evento = evento;
            sessao.perfil = perfil;
            sessoes.push(sessao);
            int.listarTodosBrinquedos().then(function(resposta){
                let brinquedos;
                if(resposta.status){
                    brinquedos = resposta.resultado;
                    res.render("novoEventoCliente", {id_evento, brinquedos, perfil});
                }else{
                    console.log(resposta.resultado);
                }                
            });            
        }else{
            res.send("Deu problema no db");
            console.log(resposta.resultado);
        }        
    });    
});

//rota na qual o atendente insere os brinquedos pedidos para o evento e os valores correspondentes
router.post("/criarSessaoCliente", isLoggedIn, function(req,res){
    let evento = sessoes[acharSessao(req.body.idEvento)].evento; //SEMPRE PROCURE O EVENTO EM SUA SESSAO    
    if(Number(req.body.valorTotal))
        evento.valor_total = Number(req.body.valorTotal);
    if(Number(req.body.valorSinal))
        evento.valor_sinal = req.body.valorSinal;
    if(Number(req.body.valorDesconto))
        evento.valor_desconto = req.body.valorDesconto;
    if(req.body.observacao.length > 0){
        evento.observacao = req.body.observacao;
    }else{
        evento.observacao = "Nenhuma";
    }
    
    let mensagem = '';
    let brinquedos;
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    int.editarEvento(evento,perfil).then(function(resultado){        
        if(!resultado.status){
            console.log(resposta.resultado);
            mensagem = "Ocorreu um erro de inserção do evento";
            res.render("/criarSessaoCliente", {mensagem, perfil});
        }else{
            brinquedos = separarBrinquedos(Object.keys(req.body));
            if(brinquedos.length > 0){
                brinquedoEvento = {brinquedos: brinquedos,
                    evento: req.body.idEvento};
                int.inserirBrinquedoNoEvento(brinquedoEvento,perfil).then(function(resposta){
                    if(!resposta.status){
                        console.log(resposta.resultado);
                        mensagem = "Ocorreu um erro de inserção do evento";
                        res.render("/criarSessaoCliente", {mensagem, perfil});
                    }else{
                        mensagem = "Inserido com sucesso";
                        res.render("/criarSessaoCliente", {mensagem, perfil});                           
                    }    
                });
            }
            mensagem = "Inserido com sucesso";
            res.render("/criarSessaoCliente", {mensagem, perfil});
        }
    });
});

async function editarBrinquedosNoBanco(req){
    let listaBrinquedos = [];
    let temBrinquedo = false;
    let body = req.body;
    //primeiro: são excluídos os brinquedos do evento
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    int.excluirBrinquedosEvento(body.id_evento,perfil.perfil).then(function(resposta){
        console.log(resposta);
        //segundo: são listadas as chaves que começam com "brinquedo" no body
        Object.keys(body).forEach(function(campo){
            if(campo.substring(0,9) == "brinquedo"){
                //caso tenha a palavra "brinquedo", é filtrado o id do brinquedo
                listaBrinquedos.push(campo.substring(9, campo.length));
                temBrinquedo = true;
            }
        });
        //terceito: é instanciado o objeto evento_brinquedo e enviado ao bd
        let brinquedoEvento = {brinquedos: listaBrinquedos,
            evento: body.id_evento};
        if(temBrinquedo){
            int.inserirBrinquedoNoEvento(brinquedoEvento,perfil.perfil).then(function(resposta){
                console.log(resposta);
            });
        }        
    });
}

async function editarEventoNoBanco(req){
    //cria o objeto evento
    let body = req.body;
    console.log(body.data);
    console.log(body.hora);    
    let evento = {
        id_evento: body.id_evento,
        data: body.data + ' ' + body.hora + ":00", 
        logradouro: body.logradouro_edicao,
        numero: body.numero, 
        complemento: body.complemento,
        bairro: body.bairro, 
        cidade: body.cidade, 
        valor_total: body.valor_total, 
        valor_desconto: body.valor_desconto, 
        valor_sinal: body.valor_sinal, 
        observacao: body.observacao
    }
    if(evento.valor_desconto == '') evento.valor_desconto = 0;
    if(evento.valor_total == '') evento.valor_total = 0;
    if(evento.valor_sinal == '') evento.valor_sinal = 0;
    //variável utilizada para renderizar a tela após edição com os mesmos parâmetros anteriores
    let filtroEvento = {
        nome_cliente: body.nome_cliente,
        data: body.data
    };
    //seta a hora do evento
    //evento.data.setHours(Number((body.hora).slice(0,2)));/*-(data.getTimezoneOffset())/60)*///para setar a hora, o sistema automaticamente guarda a hora utc, que é 
    // a hora de Brasília +3. Portanto foi subtraído a hora do retorno do método getTimezoneOffset() que mostra o desvio UTC em minutos.
    //evento.data.setMinutes((body.hora).slice(3,5));
    let perfil = require("../Model/perfis/"+req.user.perfil+"/customizacao");
    return await int.editarEvento(evento,perfil.perfil).then(function(resposta){
        if(!resposta.status){
            console.log(resposta.resultado);
            return ({
                status: false                
            });
        }else{
            return ({
                status: true
            });
        }            
    }); 
}

async function editarEvento(req){
    //função que fará o tratamento da tabela eventos no bd
    let respostaEvento = await editarEventoNoBanco(req).then(function(respostaEvento){
        return respostaEvento;
    });
    //função que fará o tratamento da tabela evento_brinquedo no bd
    let respostaBrinquedos = await editarBrinquedosNoBanco(req).then(function(respostaBrinquedos){
        return respostaBrinquedos;
    });
    return await respostaEvento;
}


router.post("/editarEvento", isLoggedIn, function(req,res){
    
    let listaBrinquedos = [];

    //dispara função editar evento que fará a lógica e inserção no banco
    editarEvento(req).then(function(resposta){
        if(!resposta.status){
            console.log(resposta.resultado);
            res.send("Ocorreu o seguinte erro de edição do evento no banco de dados: "+resposta);
        }else{
            res.send("Editado com sucesso!<br><a href='/'>Voltar ao início</a>");                            
        } 
    }); 
});

function separarBrinquedos(idsBrinquedos){
    //Exemplo do formato do req.body vindo do cliente: [ '4', '5', 'id_evento' ].
    //Preciso extrair apenas os ids dos brinquedos, ou seja, itens 0 e 1.
    let posicaoASerRetirada = [];
    //listo a posição a ser retirada com forEach
    idsBrinquedos.forEach(function(campo, indice){
        if(campo == "idEvento" || campo == "valorTotal" || campo == "valorDesconto" || campo == "valorSinal" || campo == "valorAto" || campo == "observacao"){
            posicaoASerRetirada.push(indice);
        }
    });
    //executo o método array.splice(posição) para retirar o item indesejado.
    posicaoASerRetirada.forEach(function(posicao){
        idsBrinquedos.splice(posicao);
    });
    return idsBrinquedos;
}

//rota que o cliente usa para se cadastrar
router.get("/cadastroPlay/:idEvento", function(req, res){
    let idEvento = req.params.idEvento;
    if(idEvento){ //teste para verificar se veio um id de evento
        if (acharSessao(idEvento) === -1 || acharSessao(idEvento) == undefined){ //caso não haja nenhuma sessão com aquele id de evento                     
            res.send("Esse cadastro expirou ou não existe");
        }else{
            int.filtrarEventoPorIdEvento(req.params.idEvento).then(function(resposta){
                if(resposta.status){
                    res.render("cadastro_play",{idEvento,perfil});
                }else{
                    res.send("Houve erro no banco de dados");
                    console.log(resposta.resultado);
                }
            });
        }   
    }else{
        res.send("Faltou informar o Evento");
    }    
});

router.post("/removerEvento/:idEvento", function(req, res){
    let idEvento = req.params.idEvento;
    int.excluirBrinquedosEvento(idEvento).then(function(resposta){        
        if(resposta.status){
            int.excluirEvento(idEvento).then(function(resposta){                
                if(!resposta.status){
                    res.send("Ocorreu o seguinte erro de remoção do evento no banco de dados: "+resposta);
                }else{
                    res.send("Removido com sucesso!<br><a href='/'>Voltar ao início</a>");                            
                } 
            });
        }
    });
});

router.get("/primeiraTela/:idEvento", function(req, res){
    let idEvento = req.params.idEvento;
    res.render("primeiraTelaCadastroPlay",{idEvento});
});

router.post("/:tela", function(req, res){
    let tela = req.params.tela;
    let idEvento = req.body.idEvento;
    switch(tela){
        case "primeiraTela": res.render("segundaTelaCadastroPlay",{idEvento});
                             dadosPrimeiraTela(req, idEvento);
        break;
        case "segundaTela": res.render("terceiraTelaCadastroPlay",{idEvento});
                            dadosSegundaTela(req, idEvento);                           
        break;
        case "terceiraTela": 
            dadosTerceiraTela(req, idEvento);
            let sessao = sessoes[acharSessao(idEvento)];
            if(sessao){
                int.inserirCliente(sessao.cliente,sessao.perfil).then(function(resposta){
                    console.log("linha 405");
                    console.log(resposta);
                    if(resposta.status){
                        sessao.evento.id_cliente = resposta.resultado.insertId;
                        int.editarEvento(sessao.evento,sessao.perfil).then(function(resposta){
                            console.log("linha 410");
                            console.log(resposta);
                            if(resposta.status){
                                res.render("quartaTelaCadastroPlay");
                            }else{
                                res.render("telaErroCadastro");
                            }
                        });     
                    }else{
                        res.render("telaErroCadastro");
                    }                           
                });   
            }else{
                res.send("Ocorreu um erro ao cadastrar seus dados");
                console.log(sessao);
            }                          
        break;
    }    
});

router.get("/*", function(req, res){
    res.redirect("/");
});

function dadosPrimeiraTela(req, idEvento){
    let sessao = sessoes[acharSessao(idEvento)];  
    cliente = new Cliente(req.body.nome,req.body.cpf,null,null,null,null,null,null,
        req.body.telefone,req.body.telefoneAltarnativo,null,req.body.email,null);
    sessao.cliente = cliente;
}

function dadosSegundaTela(req, idEvento){ 
    let sessao = sessoes[acharSessao(idEvento)]; 
    if(sessao){
        sessao.cliente.logradouro = req.body.logradouro;
        sessao.cliente.numero = req.body.numero;
        sessao.cliente.complemento = req.body.complemento;
        sessao.cliente.bairro = req.body.bairro;
        sessao.cliente.cidade = req.body.cidade;
    
        sessao.evento.logradouro = req.body.logradouroFesta;
        sessao.evento.numero = Number(req.body.numeroFesta);
        sessao.evento.complemento = req.body.complementoFesta;
        sessao.evento.cidade = req.body.cidadeFesta;
    }     
}

function dadosTerceiraTela(req, idEvento){    
    let sessao = sessoes[acharSessao(idEvento)];
    let data = stringToDate(req.body.data);
    data.setHours(Number((req.body.hora).slice(0,2)));/*-(data.getTimezoneOffset())/60)*///para setar a hora, o sistema automaticamente guarda a hora utc, que é 
    // a hora de Brasília +3. Portanto foi subtraído a hora do retorno do método getTimezoneOffset() que mostra o desvio UTC em minutos.
    data.setMinutes((req.body.hora).slice(3,5)); 
    if(sessao){
        sessao.evento.data = data;
    }
}

function acharSessao(idEvento){
    let retorno = -1;
    sessoes.forEach(function(sessao, indice){ //laço que procura dentro da lista de sessoes, se existe uma com aquele id de evento
        if (sessao.evento.id_evento == idEvento){
            retorno = indice;
        }
    });
    return retorno;
}

module.exports = router;


