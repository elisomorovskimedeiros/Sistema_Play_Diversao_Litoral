class Brinquedo{
    constructor(nome_brinquedo, caractaristicas, foto_brinquedo, valor_brinquedo, estaDisponivel, observacao){
        this.id_brinquedo = null;
        this. nome_brinquedo = nome_brinquedo;
        this.caractaristicas = caractaristicas;
        this. foto_brinquedo = foto_brinquedo;
        this.valor_brinquedo = valor_brinquedo;
        this.estaDisponivel = estaDisponivel;
        this.observacao = observacao;
    }
}
module.exports = Brinquedo;