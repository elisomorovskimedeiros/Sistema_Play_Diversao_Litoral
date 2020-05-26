const Interface = require("./Interface");
let int = new Interface();
let eventoController = {
    buscaPorEvento: function(perfil, itemDeBusca){
        let idParaBusca = '';
        if(itemDeBusca && itemDeBusca.length && itemDeBusca.length > 0){
            for(let indice = 0; indice < itemDeBusca.length; indice++){
                if(itemDeBusca.charCodeAt(indice) >= 48 && itemDeBusca.charCodeAt(0) <= 57){ //caso seja um número, busca por id
                    idParaBusca += itemDeBusca[indice];
                }
            }
            
            return int.filtrarEventoPorIdEvento(idParaBusca, perfil).then(function(resultado){
                return resultado;
            });
        }else{
            return({status: true,
                resultado:"Ser resultados"});
        }
    }
}

module.exports = eventoController;