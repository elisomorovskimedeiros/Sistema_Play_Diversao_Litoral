const fs = require("fs-extra");
class teste{
    constructor(){}

    //########################
    //função utilizada para criar a árvore de diretórios que contém as fotos dos brinquedos
    //fs-extra para manipular arquivos e diretórios
     criar_diretorios_arquivos(dir){
        setTimeout(async function(){return "true"}, 3000);
            /*
            try {
                if (!(fs.exists(dir))) {
                    console.log(dir);
                    fs.mkdir(dir);
                }
                if (!(fs.exists(dir+"/miniatura"))) {
    
                    fs.mkdir(dir+"/miniatura");
                }
                return resolve(true);
            } catch (e) {
                console.log("deu erro na manipulação dos diretórios");
                console.log(e);
                return resolve(false);
            }*/
            /*
            if (!(await fs.exists(dir))) {
                console.log(dir);
                return await fs.mkdir(dir);
            }
            if (!(await fs.exists(dir+"/miniatura"))) {

                return await fs.mkdir(dir+"/miniatura");
            }*/
            
           
                   
    }
}

let t = new teste();
async function b(){
    let a = await t.criar_diretorios_arquivos("castelo");
    console.log(a);
}
b();

