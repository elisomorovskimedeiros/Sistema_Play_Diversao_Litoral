//inicialização do socketIO
var socket = io("/");


//função que recebe a consulta da lista de clientes no bd, conforme o filtro solicitado
    //usada em: inserirEvento.ejs, listarCliente.ejs
socket.on("mandarClientes", function(clientes){
    enviarClientesParaPagina(clientes);       
});

//função que recebe o resultado da edição de cliente no bd
    //usado em: listarCliente.ejs, editarCliente
socket.on("resultadoEdicaoCliente", function(resultado){
    if(resultado){
        emitirAviso("Editado com sucesso!", "snackbar", 3000);
    }else{
        emitirAviso("Ocorreu um erro ao editar o cliente", "snackbar", 3000);
    }
});

//função que exclui determinado cliente a ser excluído
    //usado em: listarCliente.ejs, excluirCliente
socket.on("resultadoExclusaoCliente", function(mensagem){
    if(mensagem){
        emitirAviso("Excluído com sucesso!", "snackbar", 3000);
    }else{
        emitirAviso("Ocorreu um erro ao excluir o cliente", "snackbar", 3000);
    }
});

//#################FUNÇÕES DE EVENTOS ########################### 
//função que recebe lista de eventos 
    //usado em: listarCliente.ejs => excluirCliente / listarEvento.ejs
//Callback responsável por preencher a lista de eventos solicitada via filtro.
listaDeEventos = socket.on("receberEventos", function(eventos){
    let paiDaListaDeEventos = document.getElementById("listaEventos").parentElement.attributes.id.value;
    let listaDeEventos = '';
    listaEventosGlobal = eventos;
    if(eventos.length > 0 && eventos[0]){
        eventos.forEach( evento => {
            let brinquedos = '';
            //if para o caso da lista de brinquedos vir vazia
            if(evento){
                if(evento.brinquedos != undefined && evento.brinquedos.length > 0){
                    let tamanho = evento.brinquedos.length;
                    evento.brinquedos.forEach(function(brinquedo, indice){
                        brinquedos += brinquedo;
                        if(indice == tamanho-1){
                            brinquedos += '.';
                        }else{
                            brinquedos += ', '
                        }              
                    });                        
                }
            }           
           //montagem da lista de eventos a ser exibida na listagem de eventos
            //let data = new Date(evento.data);
            //let dataParaExibir = (Number(data.getDate())) + '/' + (Number(data.getMonth())+1) + '/' + data.getFullYear();   
            //let horaParaExibir = Number(data.getHours())+":"+Number(data.getMinutes()); 
            
            let valorLiquido = evento.valor_total - evento.valor_sinal - evento.valor_desconto;
            listaDeEventos += '<div id="cliente_individual" style="margin-top: 30px; margin-left: auto; margin-right: auto; width: max-content;">' +
                              'Id do Evento: ' + evento.id_evento + '<br>' +
                              'Data do Evento: ' + moment(evento.data).format("DD/MM/YYYY") + '   | Hora do Evento: ' +moment(evento.data).format("HH:mm")+  '<br>' +
                              'Nome do Cliente: ' + evento.nome + '   Telefone: ' + evento.telefone + '   Telefone para recado: ' + evento.telefone_recado + '<br>' +
                              'Endereço do Evento: ' + evento.logradouro +'&nbsp;&nbsp;' + evento.numero + ',&nbsp;&nbsp;';
                              if(evento.complemento)
                                  listaDeEventos += evento.complemento+', &nbsp;&nbsp;';                    
                              if(evento.observacao_endereco)
                                  listaDeEventos += evento.observacao_endereco;
                              listaDeEventos += '<br>Cidade: '+ evento.cidade + '<br>' +
                              'Brinquedos: <br>' + brinquedos + '<br>' +
                              'Valor a receber no ato da montagem: ' + valorLiquido + '<br>';
                              //botões para exclusão do evento não são exibidos durante as exclusão de cliente
                              if(paiDaListaDeEventos != "corpoModalExcluirCliente" && paiDaListaDeEventos != "corpoModalExcluirBrinquedo"){
                                listaDeEventos += '<button class="btn btn-default" id="btnEditarEvento"  data-toggle="modal" '+ 
                                'data-target="#janelaDeEdicaoEvento" value="'+evento.id_evento+'" onclick="preencherJanelaDeEdicaoDoEvento('+evento.id_evento+')">Editar</button>&nbsp;&nbsp;'+
                                '<button class="btn btn-default" id="btn_excluir_evento" data-toggle="modal"'+
                                'data-target="#janelaDeRemocaoEvento" onclick="setarIdAExcluir('+ evento.id_evento +')">Excluir</button>';
                              }
                              
        });
    }  
    document.getElementById('listaEventos').innerHTML = listaDeEventos;
});

//#################FUNÇÕES DE BRINQUEDOS ########################### 
//recebe a lista de eventos alterados com a exclusão do brinquedo
socket.on("mandarEssesEventos", function(resultado){
    let eventos = "";
    if(resultado.length){
        document.getElementById("tituloModalExcluirBrinquedos").innerHTML = "Eventos que serão afetados com a exclusão desse brinquedo:";
        resultado.forEach(function(evento){
            let data = new Date(evento.data);
            let dataParaExibir = moment(evento.data).format("DD/MM/YYYY");
            let horaParaExibir = moment(evento.data).format("HH:mm");
            //let dataParaExibir = (Number(data.getDate())) + '/' + (Number(data.getMonth())+1) + '/' + data.getFullYear();   
            //let horaParaExibir = Number(data.getHours())+":"+Number(data.getMinutes()); 
            eventos += '<div id="cliente_individual" style="margin-top: 30px; margin-left: auto; margin-right: auto; width: max-content;">' +
                          'Numero do evento: '+evento.id_evento+' Data do Evento: ' + dataParaExibir + '   | Hora do Evento: ' + horaParaExibir + '<br>' +
                          'Nome do Cliente: ' + evento.nome + '   Telefone: ' + evento.telefone + '<br>' +
                          'Endereço do Evento: ' + evento.logradouro +'&nbsp;&nbsp;' + evento.numero + ',&nbsp;&nbsp;';
                          if(evento.complemento)
                              eventos += evento.complemento+', &nbsp;&nbsp;';                    
                          if(evento.observacao_endereco)
                              eventos += evento.observacao_endereco;
                          eventos += '<br>Cidade: '+ evento.cidade + '<br>';
        });
    }    
    $("#listaEventos").wrapInner(eventos);   
});

//função que recebe a consulta da lista de brinquedos no bd, conforme o filtro solicitado
        //essa função é utilizada pela página listarBrinquedos
        
    socket.on("mandarBrinquedos", function(brinquedos){
        let listaBrinquedos = '';
        
        brinquedos.forEach(brinquedo => {
            listaBrinquedos += 
            '<div class="col-md-4" style="margin-top: 30px; margin-left: auto; margin-right: auto; height: max-content; width: max-content;">' +
                '<div style="width: 200px;">'+
                    '<img src="'+brinquedo.foto_brinquedo+'" width="200px" >' +
                '</div>'+
                'Id do Brinquedo: '+ brinquedo.id_brinquedo +'<br>' +
                'Nome: '+ brinquedo.nome_brinquedo +' <br>' +
                'Características: '+ brinquedo.caracteristicas +'<br>' +
                'Valor da locação: R$'+ brinquedo.valor_brinquedo + ',00<br>' +
                'Quantidade em Estoque: ' + brinquedo.quantidade + '<br>';
                if(brinquedo.observacao)
                    listaBrinquedos += 'Observação: ' + brinquedo.observacao + '<br>';
                listaBrinquedos +=
                '<div>' +
                    '<button class="btn btn-primary" id="btnEditarBrinquedo"  data-toggle="modal" '+ 
                    'data-target="#janelaDeEdicaoBrinquedo" onclick="preencherModalEdicaoBrinquedo(\''+
                        brinquedo.id_brinquedo+'\',\''+
                        brinquedo.nome_brinquedo+'\',\''+
                        brinquedo.caracteristicas+'\',\''+
                        brinquedo.valor_brinquedo+'\',\''+
                        brinquedo.quantidade+'\',\''+
                        brinquedo.observacao+'\')" value="'+brinquedo.id_brinquedo+'">Editar</button>&nbsp;&nbsp;'+
                    '<button class="btn btn-danger" id="btn_excluir_brinquedo" data-toggle="modal"'+
                    'data-target="#janelaDeRemocaoBrinquedo" onclick="preencharJanelaExclusaoBrinquedo('+ brinquedo.id_brinquedo +')">Excluir</button>'+
                '</div>'+
            '</div>';
        }); 
        //envio das informações para a página
        document.getElementById("listaBrinquedos").innerHTML = "";
        document.getElementById("listaBrinquedos").innerHTML = listaBrinquedos;     
    });

    socket.on("retorno", function(mensagem){
        alert(mensagem);
    });

    socket.on("envioListaBrinquedos", function(brinquedos){
        let listaDeBrinquedos = "<div class='row'>";
        brinquedos.forEach(function(brinquedo){
            listaDeBrinquedos += 
                "<div class='col-md-3 divListaBrinquedos'>"+
                    "<div>"+
                        "<span>"+
                            "<img src='"+brinquedo.foto_brinquedo+"' width='50px'>"+
                        "</span>"+
                        "<span class='form-group' style='margin-left: 30px;'>"+
                            "<input type='checkbox' class='form-group-checkbox brinqudo-evento' id='selBrinquedo' id_brinquedo='"+brinquedo.id_brinquedo+"'>"+
                        "</span>"+
                    "</div>"+                    
                    "Nome: "+brinquedo.nome_brinquedo+"<br>"+
                    "Qtd disponível: "+brinquedo.quantidade+"<br>"+
                "</div>";
        });
        listaDeBrinquedos += "</div>";
        document.getElementById("listaBrinquedos").innerHTML = listaDeBrinquedos;
    });
        
