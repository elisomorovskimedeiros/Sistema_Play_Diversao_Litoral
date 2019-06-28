var Interface = require("./Controller/Interface"),
       Evento = require("./Model/Evento"),
      Cliente = require("./Model/Cliente"),
           fs = require("fs");

let eventos = [];
let clientes = [];
fs.readFile('/home/eli/cadastro_google_atualizacao.csv', 'utf-8', function(err, data){
    if (err){
        console.log(err);
    }else{
        var linhas = data.split(/\r?\n/);
    
        linhas.forEach(function(linha, indice){
            if(indice > 0){
                let tabela = linha.split(',');
                let data = tabela[0],
                cidadeEvento = tabela[1],
                nome = tabela[2];
                                
                if (tabela.length == 18){
                    enderecoCliente = tabela[4]+tabela[5],
                    enderecoEvento = tabela[6],
                    referenciaEvento = tabela[7],
                    telefone = tabela[8],
                    telefoneAlternativo = tabela[9],
                    cpf = tabela[13],
                    email = tabela[16];
                }else if (tabela.length == 19){
                    enderecoCliente = tabela[4]+tabela[5],
                    enderecoEvento = tabela[6]+tabela[7],
                    referenciaEvento = tabela[8],
                    telefone = tabela[9],
                    telefoneAlternativo = tabela[10],
                    cpf = tabela[14],
                    email = tabela[17];
                }else{
                    enderecoCliente = tabela[4],
                    enderecoEvento = tabela[5],
                    referenciaEvento = tabela[6],
                    telefone = tabela[7],
                    telefoneAlternativo = tabela[8],
                    cpf = tabela[12],
                    email = tabela[15];
                }
                let cliente = new Cliente(nome, cpf, enderecoCliente, 0, '', '', cidadeEvento, telefone, telefoneAlternativo, null, email, '');
                clientes.push(cliente);
                let evento = new Evento(0, data, enderecoEvento, 0, '', cidadeEvento, 0, 0, 0, '');
                eventos.push(evento);
                if(tabela.length > 19){
                    cliente.enderecoCliente = tabela[4]+tabela[5]+tabela[6],
                    cliente.enderecoEvento = tabela[7]+tabela[8]+tabela[9],
                    cliente.referenciaEvento = tabela[10]+tabela[11]+tabela[12];
                    tabela.forEach(function(tab, indice){
                        if(indice > 12){
                            cliente.observacao_cliente += tab;
                        }
                    });           
                }                                 
            }                          
        });
        

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