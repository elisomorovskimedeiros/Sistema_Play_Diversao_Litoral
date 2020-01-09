//inicialização do socketIO
var socket = io("/");

socket.on("receber_eventos", function(resposta){
    if(resposta.erro){
        $("#listagemFiltros").html(resposta.erro);
    }else{
        ultimo_filtro_eventos = resposta;
        $("#info_exibicao").html("Eventos até dia " + moment().add(15, "days").format("DD/MM/YYYY"));
        ultimo_filtro_eventos.forEach(function(evento, indice){
            let item = $("#peleCelulaEvento").clone().removeClass("invisible").removeClass("float").appendTo("#listagemFiltros").removeClass("invisible");
            let celulaEvento = item.find(".celulaEvento")[0];
            $(celulaEvento).attr("id", indice);
            let campoId = item.find(".idListaEventos")[0];
            let campoData = item.find(".dataListaEventos")[0];
            let campoNomeCliente = item.find(".nomeClienteListaEventos")[0];
            let campoEndereco = item.find(".enderecoListaEventos")[0];
            let campoBrinquedos = item.find(".brinquedosListaEventos")[0];
            campoId.innerHTML = evento.id_evento;
            campoData.innerHTML = moment(evento.data_evento).format("DD/MM/YYYY");
            campoNomeCliente.innerHTML = evento.nome_cliente;
            campoEndereco.innerHTML = evento.logradouro_evento + ", " + evento.numero_evento;
            campoBrinquedos.value = evento.brinquedos;
            
        });        
    }
});

// exibe os brinquedos disponíveis para o dia do evento
socket.on("receber_brinquedos_vagos", function(resposta){
    if(resposta.status){
        lista_brinquedos_disponiveis = resposta.resultado;
        exibir_brinquedos_disponiveis();
    }else{
        $("#titulo_div_lista_brinquedos").clone().appendTo("#linha_lista_brinquedos").html(resposta.erro);
    }
    $("body").removeClass("cursor_progresso");     
});

// exibe os brinquedos atualmente marcados para o evento em destaque na janela
socket.on("lista_brinquedos_do_evento", function(resultado){
    if(resultado.erro){
        $("#titulo_div_lista_brinquedos_no_evento").clone().appendTo("#div_lista_brinquedos_no_evento").html(resultado.erro);
    }else{
        brinquedos_do_evento_em_destaque = resultado;
        exibir_brinquedos_do_evento_em_destaque();
    }    
    $("body").removeClass("cursor_progresso");        
});

//função que recebe a consulta da lista de clientes no bd, conforme o filtro solicitado
//usada em: inserirEvento.ejs, listarCliente.ejs
socket.on("mandarClientes", function(clientes){
    $("#listaClientes").html("");    
    ultimo_filtro_clientes = clientes;
    if(clientes && clientes.length > 0){
        clientes.forEach(function(cliente, indice){
            $("#peleCelulaCliente").clone()
                                .attr("id","cliente"+indice)
                                .appendTo("#listaClientes")
                                .removeClass("invisible")
                                .removeClass("float");
            $("#id_lista").attr("id", "id_lista_"+indice).attr("indice", indice).html(cliente.id_cliente);
            $("#nome_lista").attr("id", "nome_lista_"+indice).html(cliente.nome);
            $("#telefone_lista").attr("id", "telefone_lista_"+indice).html(cliente.telefone);
            $("#tel_alt_lista").attr("id", "tel_alt_lista_"+indice).html(cliente.telefone_recado);
            $("#email_lista").attr("id", "email_lista_"+indice).html(cliente.email);
            $("#cpf_lista").attr("id", "cpf_lista_"+indice).html(cliente.cpf);
            $("#end_lista").attr("id", "end_lista_"+indice).html(cliente.logradouro + ", " + cliente.numero);
            $("#cidade_lista").attr("id", "cidade_lista_"+indice).html(cliente.cidade); 
        });
    }
});


socket.on("resultado_edicao_evento", function(resposta){
    emitirAviso(resposta, "snackbar", 3000);
    $("#janelaDestaqueEvento").modal("hide");
    $("body").removeClass("cursor_progresso");    
});


