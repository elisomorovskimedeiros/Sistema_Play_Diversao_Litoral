const arquivo = require("./Arquivo.js");

class Brinquedo{
    constructor(){
        this.id_brinquedo = null;
        this.nome_brinquedo = String;
        this.caracteristicas = String;
        this.foto_brinquedo = String;
        this.valor_brinquedo = Number;
        this.quantidade = Number;
        this.observacao = String;
        this.caminho_imagens_brinquedo = "public/imagens/brinquedos/";          
    };
    
    async processo_de_insercao_do_brinquedo(req,res, int){
        const file = req.file;
        let foto_brinquedo = '';
        if(file){
            //Veio foto
            //criar diretório para receber a foto
            let diretorio_brinquedo = '';
            if(req.body.nome_insercao_brinquedo){
                diretorio_brinquedo = arquivo.removeAcento(this.caminho_imagens_brinquedo+req.body.nome_insercao_brinquedo);
            }else if(req.body.nome_edicao){
                diretorio_brinquedo = arquivo.removeAcento(this.caminho_imagens_brinquedo+req.body.nome_edicao);
            }
            foto_brinquedo = req.file.originalname;
            let caminho_arquivo_origem = diretorio_brinquedo+"/"+file.originalname;
            let caminho_arquivo_destino = diretorio_brinquedo+"/miniatura/miniatura_"+file.originalname;
            await arquivo.redimensionar_imagem(caminho_arquivo_origem, caminho_arquivo_destino, 40);//miniatura usada para a lista geral
            await arquivo.redimensionar_imagem(caminho_arquivo_origem, caminho_arquivo_origem, 200);//imagem usada para a tela de detalhes
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

        let perfil = require("../../perfis/"+req.user.perfil+"/customizacao");

        int.inserirBrinquedo(brinquedo,perfil.perfil).then(function(resultado){
            let resposta;
            if(resultado.status){
                resposta = "Brinquedo inserido com sucesso!";
            }else{
                console.log(resultado);
                resposta = "Ocorreu um erro na inserção do brinquedo";
            }
            res.render("inserirBrinquedo", {resposta, perfil});
        });
        //remover foto antiga do brinquedo
        //arquivo.remover_foto_brinquedo(perfil.perfil, brinquedo.nome_brinquedo, int);        
    }

    remover_brinquedo(req,res, int){
        let perfil = require("../../perfis/"+req.user.perfil+"/customizacao");
        int.select_nome_imagem_brinquedo(perfil.perfil,req.body.id_brinquedo_excluir).then(function(resposta){
            if(resposta.status){
                let nome_brinquedo = arquivo.removeAcento(resposta.resultado[0].nome_brinquedo);
                let local_imagens_brinquedo = "public/imagens/brinquedos/"+nome_brinquedo;
                arquivo.remover_arquivo(local_imagens_brinquedo);                
            }
        });

        int.excluirBrinquedo(req.body.id_brinquedo_excluir, perfil.perfil).then(function(resposta){        
            let brinquedos = {status: resposta.status};
            if(!resposta.status){
                console.log(resposta.resultado);
            }
            res.render("listarBrinquedos.ejs", {brinquedos, perfil});
        });
        
    }

    editar_brinquedo(req,res,int){
        let obj_brinquedo = this;
        const file = req.file;
        let perfil = require("../../perfis/"+req.user.perfil+"/customizacao");
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
            brinquedo.foto_brinquedo = req.file.originalname;

            let diretorio_brinquedo = arquivo.removeAcento(req.body.nome_edicao);
            let caminho_arquivo_origem = this.caminho_imagens_brinquedo+diretorio_brinquedo+"/"+file.originalname;
            let caminho_arquivo_destino = this.caminho_imagens_brinquedo+diretorio_brinquedo+"/miniatura/miniatura_"+file.originalname;
            arquivo.redimensionar_imagem(caminho_arquivo_origem, caminho_arquivo_destino, 40);//miniatura usada para a lista geral
            arquivo.redimensionar_imagem(caminho_arquivo_origem, caminho_arquivo_origem, 200);//imagem usada para a tela de detalhes 
        }
        int.select_nome_imagem_brinquedo(perfil.perfil, brinquedo.id_brinquedo).then(function(resposta){
            if(resposta.status && resposta.resultado.length > 0){
                if(resposta.resultado[0].nome_brinquedo != brinquedo.nome_brinquedo)
                    arquivo.renomear_arquivo(obj_brinquedo.caminho_imagens_brinquedo+resposta.resultado[0].nome_brinquedo,"public/imagens/brinquedos/"+brinquedo.nome_brinquedo)
                if(file && resposta.resultado[0].foto_brinquedo != file.originalname){
                    arquivo.remover_arquivo(obj_brinquedo.caminho_imagens_brinquedo+brinquedo.nome_brinquedo+"/"+resposta.resultado[0].foto_brinquedo);
                    arquivo.remover_arquivo(obj_brinquedo.caminho_imagens_brinquedo+brinquedo.nome_brinquedo+"/miniatura/miniatura_"+resposta.resultado[0].foto_brinquedo);
                }
            }
            int.editarBrinquedo(brinquedo,perfil.perfil).then(function(brinquedos){
                let resposta;
                if(brinquedos.status){
                    resposta = "Brinquedo editado com sucesso!";            
                }else{
                    resposta = "Ocorreu um erro na edição do brinquedo";
                }
                res.render("listarBrinquedos", {brinquedos, perfil});
            });
        });        
    }
    
    listar_todos_brinquedos(req, res, int){
        let perfil = require("../../perfis/"+req.user.perfil+"/customizacao");
        int.listarTodosBrinquedos(perfil.perfil).then(function(resposta){  
            let brinquedos;
            if(resposta.status){
                brinquedos = resposta.resultado;
                brinquedos.forEach(brinquedo => {
                    brinquedo.nome_brinquedo = arquivo.removeAcento(brinquedo.nome_brinquedo);
                });                
                res.render("listarBrinquedos.ejs",{brinquedos, perfil});
            }else{
                console.log(resposta.resultado);
            }             
        }); 
    }
}


module.exports = Brinquedo;

