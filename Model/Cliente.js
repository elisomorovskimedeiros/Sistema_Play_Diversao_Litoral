class Cliente{
    constructor(nome, cpf, logradouro, numero, complemento, observacaoEndereco, bairro, cidade, telefone, telefoneRecado, cliente_evento, email, observacaoCliente){
        this.id_cliente = null;
        this.nome = nome;
        this.cpf = cpf;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.observacao_endereco = observacaoEndereco;
        this.bairro = bairro;
        this.cidade = cidade;
        this.telefone = telefone;
        this.telefone_recado = telefoneRecado;
        this.cliente_evento = cliente_evento;
        this.email = email;
        this.observacao_cliente = observacaoCliente;
    }
}
module.exports = Cliente;
