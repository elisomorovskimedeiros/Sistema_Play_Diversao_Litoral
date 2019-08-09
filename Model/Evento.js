class Evento{
    constructor(id_cliente, data, logradouro, numero, complemento, bairro, cidade, valor_total, valor_desconto, valor_sinal, observacao){
        this.id_evento = null;
        this.id_cliente = id_cliente;
        this.data = data;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.valor_total = valor_total;
        this.valor_desconto =  valor_desconto;
        this.valor_sinal = valor_sinal;;
        this.observacao = observacao;
    }    
}
module.exports = Evento;
