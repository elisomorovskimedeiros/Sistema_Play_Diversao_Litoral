const multer = require("multer"),
fs = require("fs-extra");

let Arquivo = {

    //############ UPLOAD DAS IMAGENS DOS BRINQUEDOS ################
    //utilizado o midlleware Multer para captura do upload do arquivo contendo a foto do brinquedo
    //utilizado o Jimp para redimensionar as imagens dos brinquedos
    //utilizado fs-extra para manipular a árvore de diretórios que contém as imagens

    //configuração do multer
    //site que ajudou: https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088
    


    //########################
    //variável que manipula o post
    

    //########################
    //função que faz o redirecionamento de imagens utilizando o framework Jimp
    redimensionar_imagem: async function (caminho_arquivo_origem, caminho_arquivo_destino, height){
        //framework de redimensionamento de imagens
        Jimp.read(caminho_arquivo_origem)
            .then(lenna => {
                return lenna
            .resize(Jimp.AUTO, height) // resize
            .write(caminho_arquivo_destino); // save
        })
        .catch(err => {
            console.error(err);
        });
    },

    //########################
    //função que remove acentos que possam existir nos nomes que serão dados aos arquivos ou diretórios
    removeAcento: function (text){       
        text = text.toLowerCase();                                                         
        text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
        text = text.replace(new RegExp('[Ç]','gi'), 'c');
        return text;                 
    },

    //########################
    //essa função é utilizada para remover as fotos de brinquedos que não são mais usadas
    remover_arquivo: async function (arquivo){
        arquivo = this.removeAcento(arquivo);
        try {
            await fs.remove(arquivo, (err) => {
                if (err) {
                    console.error(err)
                    return false;
                }
                return true;
            });
        } catch (e) {
            console.log("deu erro");
            console.log(e);
            return false;
        }        
     
    },

    //########################
    //função utilizada para criar a árvore de diretórios que contém as fotos dos brinquedos
    //fs-extra para manipular arquivos e diretórios
    criar_diretorios_arquivos: async function (dir){
        try {
            if (!(await fs.exists(dir))) {
                await fs.mkdir(dir, 0744);
            }
            if (!(await fs.exists(dir+"/miniatura"))) {
                await fs.mkdir(dir+"/miniatura", 0744);
            }
            return true;
        } catch (e) {
            console.log("deu erro na manipulação dos diretórios");
            console.log(e);
            return false;
        }
    },


    //########################
    //pode ser usada tanto para renomear quanto para mover algum arquivo, sendo que o comando move serve para os dois
    renomear_arquivo: async function (nome_antigo, nome_novo){
        nome_antigo = this.removeAcento(nome_antigo);
        nome_novo = this.removeAcento(nome_novo);
        await fs.move(nome_antigo, nome_novo)
            .catch((e) => {
                console.log("Ocorreu um erro ao renomear o arquivo "+ nome_antigo);
                console.log(e);
                return false;
        });
        return true;
    },

    //########################
    //função usada  para remover específicamente as fotos do brinquedo solicitado
    remover_foto_brinquedo: function (perfil, id_brinquedo, int){
        int.select_nome_imagem_brinquedo(perfil,id_brinquedo).then(function(resposta){ 
            if (resposta.status && resposta.resultado.length > 0){
                let nome_imagem_brinquedo = resposta.resultado[0].foto_brinquedo;
                let diretorio_brinquedo = this.removeAcento(resposta.resultado[0].nome_brinquedo);
                diretorio_brinquedo = this.removeAcento(diretorio_brinquedo);
                let local_imagem_principal = "public/imagens/brinquedos/"+diretorio_brinquedo+"/"+nome_imagem_brinquedo;
                this.remover_arquivo(local_imagem_principal);
                let local_imagem_miniatura = "public/imagens/brinquedos/"+diretorio_brinquedo+"/miniatura/miniatura_"+nome_imagem_brinquedo;
                this.remover_arquivo(local_imagem_miniatura);
            } 
        });
    }


}
module.exports = Arquivo;