const multer = require("multer"),
arquivo = require("./Arquivo");

const Upload = {storage : multer.diskStorage({
        destination: async function(req, file, cb){
            //criando o diretorio do arquivo
            let dir = '';
            let nome_brinquedo = '';
            if (req.body.nome_insercao_brinquedo)
                nome_brinquedo = req.body.nome_insercao_brinquedo;
            else
                nome_brinquedo = req.body.nome_edicao;
            dir = "public/imagens/brinquedos/"+nome_brinquedo;
            dir = arquivo.removeAcento(dir);
            await arquivo.criar_diretorios_arquivos(diretorio_brinquedo);
            console.log(dir);
            cb(null, dir);//local de gravação do arquivo
        },
        filename: function (req, file,cb){
            cb(null, file.originalname);//nome do arquivo
        }
    }),
    upload: multer({storage: this.storage}),
    single: {async function(name_do_arquivo_no_form){
        await this.upload.single(name_do_arquivo_no_form);
        }  
    }
};

module.exports = Upload;