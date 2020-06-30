const nodemailer = require("nodemailer"),
       Interface = require("../Controller/Interface");

//Serviço de envio de email
const caminho_perfil = "../../perfis/";
class Email{
    constructor(perfil){
        this.perfil = perfil = require(caminho_perfil+perfil+"/customizacao");
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
            const Textos = require(caminho_perfil+perfil.perfil+"/Textos");
            let textos = new Textos(evento);
     
            let mensagem = textos.mensagemConfirmacaoEvento();
            console.log("mensagem no email.js");
            console.log(mensagem);
            email.mailOptions.to = evento.cliente.email +", "+perfil.email;
            email.mailOptions.subject = perfil.subjectConfirmacaoEvento;
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
        const Textos = require(caminho_perfil+email.perfil.perfil+"/Textos");
        let textos = new Textos(evento);
        
        let mensagemCliente = textos.mensagemCadastroCliente();
        let mensagemSistema =  textos.mensagemCadastroPlay();

        email.mailOptions.to = email.perfil.email;
        email.mailOptions.subject = "Cadastro preenchido por " + evento.cliente.nome;
        email.mailOptions.text = mensagemSistema;                           
        let statusEnvioPlayDiversao = await email.enviar().then(function(retorno){
            return retorno;
        });
      
        email.mailOptions.to = evento.cliente.email;
        email.mailOptions.subject = "Muito obrigado por preecher o nosso cadastro " + evento.cliente.nome + "!";
        email.mailOptions.text = mensagemCliente;
        
        let statusEnvioCliente = await email.enviar().then(function(retorno){
            return retorno;
        });
        if(statusEnvioCliente.status && statusEnvioPlayDiversao.status){
            return true;
        }else return false; 
    }
}
module.exports = Email;

                                                        