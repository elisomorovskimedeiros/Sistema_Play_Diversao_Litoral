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
        let data = moment(evento.data).format("DD/MM/YYYY");
        let mensagemParaPlay = "Cadastro realizado\n"+
        "cliente: "+evento.cliente.nome+
        "\ndata: "+data+
        "\ntelefone: "+evento.cliente.telefone+
        "\nendereço: "+evento.logradouro+", "+evento.numero+", bairro: "+evento.bairro+
        "\ncidade: "+evento.cidade+".";
        if(evento.brinquedos.length > 0){
            mensagemParaPlay += "\nBrinquedos:\n";
            evento.brinquedos.forEach(function(brinquedo){
                mensagemParaPlay += " - " + brinquedo.nome_brinquedo + "\n";
            });
        }
        return mensagemParaPlay;
    }
    mensagemConfirmacaoEvento(){
        let evento = this.evento;
        if(evento.brinquedos){
            let listaBrinquedos = 'Os itens agendados são:\n';                                
            if( evento.brinquedos.length > 0){                
                evento.brinquedos.forEach(function(brinquedo, indice){                                              
                    listaBrinquedos += " - "+brinquedo.nome_brinquedo;                    
                });
            }else listaBrinquedos = undefined;                                
            let data = moment(evento.data).format("DD/MM/YYYY");
            let enderecoEvento = evento.logradouro+", "+evento.numero;
            let valorFinal = evento.valor_total - evento.valor_desconto - evento.valor_sinal;
            let mensagem = "--------------------------------------------------------------------------------"+
                            "    NOTIFICAÇÃO DE AGENDAMENTO DE FESTA \n"+
                            "              PLAY DIVERSÃO LOCAÇÕES         \n"+
                            "--------------------------------------------------------------------------------\n"+
                            "\n"+
                            "Sua locação de brinquedos foi agendada. Por favor, confira os dados abaixo:\n"+
                            "Data: "+data+ "\n"+
                            "Nome: "+evento.cliente.nome+ "\n";
                            if(listaBrinquedos){
                                mensagem += listaBrinquedos+"\n";
                            }
                            mensagem += "Valor Total: R$"+valorFinal+ 
                            "\n Endereço do Evento:"+evento.logradouro+", "+evento.numero+ "\n"+
                            "Qualquer dúvida entre em contato pelo telefone 995058704\n\n"+
                            "Att, Amilcar Medeiros - Play Diversão Locações.\n"+
                            "CNPJ: 23.198.315/0001-90\n"+
                            "tel.: (47) 997238663 [TIM]\n"+
                            "Endereço:\n"+
                            "Rua Rio Amazonas, 109, loja 1\n"+
                            "Novo Hamburgo - RS";         
            
            return mensagem;
        }else{return false};
    }
}

module.exports = Textos;