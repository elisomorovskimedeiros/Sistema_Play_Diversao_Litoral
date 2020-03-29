class Textos{
    constructor(evento){
        this.evento = evento;        
    }
    mensagemCadastroCliente(){
        let evento = this.evento;
        let mensagemCliente = "Muito obrigado por preecher nosso cadastro.\n" +
        "Caso tenha ficado tudo certo em sua negociação com a Play Diversão " +
        "logo você estará recebendo uma mensagem de confirmação dos brinquedos para seu evento.\n" +
        "Atenciosamente,\n" +
        "Equipe Play Diversão";        
        return mensagemCliente;
    }
    mensagemCadastroPlay(){
        let evento = this.evento;
        let mensagemParaPlay = "O cliente "+ evento.cliente.nome +" acaba de preencher o cadastro!\n" +
        "Até agora os dados do evento são os seguintes:\n" +
        " - Data do evento: " + moment(evento.data).format("DD/MM/YYYY") + ";\n" +
        " - Endereço: " + evento.logradouro + ", " + evento.numero + ", na cidade de " + evento.cidade + ".\n";
        if(evento.brinquedos.length > 0){
            mensagemParaPlay += "Brinquedos:\n";
            evento.brinquedos.forEach(function(brinquedo){
                mensagemParaPlay += " - " + brinquedo.nome_brinquedo + "\n";
            });
        }
        return mensagemParaPlay;
    }
    mensagemConfirmacaoEvento(){
        let evento = this.evento;
        if(evento.brinquedos){
            let listaBrinquedos = 'Irá no dia ';                                
            if( evento.brinquedos.length > 0){                
                evento.brinquedos.forEach(function(brinquedo, indice){                                              
                    listaBrinquedos += brinquedo.nome_brinquedo;
                    if(indice == evento.brinquedos.length - 1){
                        listaBrinquedos += ". ";
                    }else if(indice == evento.brinquedos.length - 2){
                        listaBrinquedos += " e ";
                    }else{
                        listaBrinquedos += ", ";
                    }
                });
            }else listaBrinquedos = undefined;                                
            let data = moment(evento.data).format("DD/MM/YYYY");
            let enderecoEvento = evento.logradouro+", "+evento.numero;
            let valorFinal = evento.valor_total - evento.valor_desconto - evento.valor_sinal;
            let mensagem = "Parabéns "+ evento.cliente.nome+", sua festa já esta agendada!!\n Dia "+data+
            " estaremos no endereço "+enderecoEvento+", para realizar a montagem dos brinquedos.\n";                                
            if(listaBrinquedos){
                mensagem += listaBrinquedos;
            }
            mensagem += "\nApós o término da montagem você pode tirar todas as suas "+
                    "dúvidas e acertar o valor de R$"+valorFinal+",00 com o montador.\n"+
                    "Atenciosamente,\n"+
                    "Equipe Play Diversão";
            return mensagem;
        }else{return false};
    }
}

module.exports = Textos;