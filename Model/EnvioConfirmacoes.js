const nodemailer = require("nodemailer");

//Serviço de envio de email

class EnvioConfirmacoes{
    constructor(email, mensagem){
        this.email = email;
        this.mensagem = mensagem
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'playlitoral@gmail.com',
                pass: 'd09m04a11'
            }
        });
        this.mailOptions = {
            from: 'playlitoral@gmail.com',
            to: email,
            subject: 'Seus brinquedos estão reservados',
            text: mensagem
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
}

module.exports = EnvioConfirmacoes;

