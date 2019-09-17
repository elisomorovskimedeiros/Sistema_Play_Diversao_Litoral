const nodemailer = require("nodemailer"),
       Interface = require("../Controller/Interface");

//Serviço de envio de email

class Email{
    constructor(perfil){
        this.perfil = perfil = require("../Model/perfis/"+perfil+"/customizacao");
        this.int = new Interface();
        this.transporter = nodemailer.createTransport({
            pool: true,
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: this.perfil.email,
                pass: this.perfil.senhaEmail
            }
        });
        this.mailOptions = {
            from: this.perfil.email,
            to: this.email,
            subject: '',
            text: this.mensagem
        }; 
    }
    enviar(){
        let msg = this;
        return new Promise(function(resolve){
            msg.transporter.sendMail(msg.mailOptions, function(error, info){
                if (error){
                    console.log(error);
                    return resolve({status: false,
                            detalhes: error});
                }
                return resolve({status: true,
                        detalhes: info})
            });
        });        
    }

    async enviarEmailConfirmacao(idEvento){
        let int = this.int;
        let email = this;
        let perfil = this.perfil;
        let evento = await int.pegarEventoClienteEBrinquedosPorIdEvento(idEvento, email.perfil.perfil).then(function(resposta){
            return resposta;
        });
        if (evento){
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
            email.mailOptions.to = evento.cliente.email +", "+perfil.email;
            email.mailOptions.subject = "Seus brinquedos foram reservados";
            email.mailOptions.text = mensagem;                          
            return email.enviar().then(function(retorno){
                if(retorno.status){
                    return true;
                }else{
                    return false;
                }
            });
        }else{
            return false;
        }  
    }

    async enviarPreenchimentoCadastro(idEvento){
        let email = this;
        let int = new Interface();
        let evento = await int.pegarEventoClienteEBrinquedosPorIdEvento(idEvento, email.perfil.perfil).then(function(resposta){
            return resposta;
        }); 
        
        let mensagem  =  "O cliente " + evento.cliente.nome + " acaba de preencher o cadastro!\n" +
            "Até agora os dados do evento são os seguintes:\n" +
            " - Data do evento: " + moment(evento.data).format("DD/MM/YYYY") + ";\n" +
            " - Endereço: " + evento.logradouro + ", " + evento.numero + ", na cidade de " + evento.cidade + ".\n";
        if(evento.brinquedos.length > 0){
             mensagem += "Brinquedos:\n";
            evento.brinquedos.forEach(function(brinquedo){
                mensagem += " - " + brinquedo.nome_brinquedo + "\n";
            });
        }
        email.mailOptions.to = email.perfil.email;
        email.mailOptions.subject = "Cadastro preenchido por " + evento.cliente.nome;
        email.mailOptions.text = mensagem;                           
        let statusEnvioPlayDiversao = await email.enviar().then(function(retorno){
            return retorno;
        });
        mensagem = "Muito obrigado por preecher nosso cadastro.\n" +
                "Caso tenha ficado tudo certo em sua negociação com a Play Diversão " +
                "logo você estará recebendo uma mensagem de confirmação dos brinquedos para seu evento.\n" +
                "Atenciosamente,\n" +
                "Equipe Play Diversão"
        email.mailOptions.to = evento.cliente.email;
        email.mailOptions.subject = "Muito obrigado por preecher o nosso cadastro " + evento.cliente.nome + "!";
        email.mailOptions.text = mensagem;
        let statusEnvioCliente = await email.enviar().then(function(retorno){
            return retorno;
        });
        if(statusEnvioCliente.status && statusEnvioPlayDiversao.status){
            return true;
        }else return false; 
               
    }
}
module.exports = Email;

                                                        