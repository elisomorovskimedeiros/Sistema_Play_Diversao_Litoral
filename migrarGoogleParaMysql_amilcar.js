var Interface = require("./Controller/Interface"),
       Evento = require("./Model/Evento"),
      Cliente = require("./Model/Cliente"),
           fs = require("fs");

let eventos = [];
let clientes = [];
fs.readFile('/home/eli/planilha_amilcar.tsv', 'utf-8', function(err, data){
    if (err){
        console.log(err);
    }else{
        var linhas = data.split(/\r?\n/);
    
        linhas.forEach(function(linha, indice){
            if(indice > 0){
                let tabela = linha.split(/\t/);
                let data = tabela[0],
                cidadeEvento = tabela[2],
                nome = tabela[1],
                valor_total = tabela[3],
                valor_sinal = tabela[4]
                enderecoCliente = tabela[5],
                enderecoEvento = tabela[6],
                cpf = tabela[7],
                dataNascimento = tabela[8],                
                telefone = tabela[9],
                email = tabela[10];
                
                if(data.length==10){
                    data = data.substring(6,10)+'-'+data.substring(3,5)+'-'+data.substring(0,2);
                }
                
                let cliente = new Cliente(nome, cpf, enderecoCliente, 0, '', '', '', cidadeEvento, telefone, null, null, email, '');
                cliente.data_nascimento = dataNascimento;
                clientes.push(cliente);
                let evento = new Evento(0, data, enderecoEvento, 0, '', '', cidadeEvento, valor_total, 0, valor_sinal, '');
                eventos.push(evento);                                              
            }                          
        });
        //tive que retirar o último elementos dos arrays por problema na tabulação
        //eventos.pop();
        //clientes.pop();
        //console.log(clientes);
        //console.log(eventos);
        
        let interface = new Interface();

        interface.inserirDiversosClientes(clientes,'play_nh').then(function(resposta){
            console.log(resposta);
            eventos.forEach(function(evento, indice){
                evento.id_cliente = resposta.resultado.insertId+indice;
            });
            //interface.inserirDiversosEventos(eventos);
            interface.inserirDiversosEventos(eventos, 'play_nh').then(function(resultado){
                console.log(resultado);
            });
        });  
        
    }  
});