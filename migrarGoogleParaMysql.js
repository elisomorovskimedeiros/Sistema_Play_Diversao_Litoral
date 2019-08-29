var Interface = require("./Controller/Interface"),
       Evento = require("./Model/Evento"),
      Cliente = require("./Model/Cliente"),
           fs = require("fs");

let eventos = [];
let clientes = [];
fs.readFile('/home/eli/Downloads/Cadastro de clientes e aceites de contratos - Respostas ao formulário 1.tsv', 'utf-8', function(err, data){
    if (err){
        console.log(err);
    }else{
        var linhas = data.split(/\r?\n/);
    
        linhas.forEach(function(linha, indice){
            if(indice > 2){
                let tabela = linha.split(/\t/);
                let data = tabela[0],
                cidadeEvento = tabela[1],
                nome = tabela[2],
                enderecoCliente = tabela[4],
                enderecoEvento = tabela[5],
                referenciaEvento = tabela[6],
                telefone = tabela[7],
                telefoneAlternativo = tabela[8],
                horaEvento = tabela[9],                
                cpf = tabela[12],
                email = tabela[15];
                
                if(data.length==10){
                    data = data.substring(6,10)+'-'+data.substring(3,5)+'-'+data.substring(0,2)+' '+horaEvento;
                }
                
                let cliente = new Cliente(nome, cpf, enderecoCliente, 0, '', '', '', cidadeEvento, telefone, telefoneAlternativo, null, email, '');
                clientes.push(cliente);
                let evento = new Evento(0, data, enderecoEvento, 0, referenciaEvento, '', cidadeEvento, 0, 0, 0, '');
                eventos.push(evento);                                              
            }                          
        });
        //tive que retirar o último elementos dos arrays por problema na tabulação
        eventos.pop();
        clientes.pop();
        
        
        let interface = new Interface();

        interface.inserirDiversosClientes(clientes).then(function(resposta){
            console.log(resposta);
            eventos.forEach(function(evento, indice){
                evento.id_cliente = resposta.resultado.insertId+indice;
            });
            //interface.inserirDiversosEventos(eventos);
            interface.inserirDiversosEventos(eventos).then(function(resultado){
                console.log(resultado);
            });
        });  
    }  
});