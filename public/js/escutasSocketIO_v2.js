//inicialização do socketIO
var socket = io("/");

socket.on("receber_eventos", function(resposta){
    selecionar_botoes_controle_a_serem_exibidos("evento"); 
    if(resposta.erro){
        $("#listagemFiltros").html(resposta.erro);
    }else{
        $("#listagemFiltros").html("");
        ultimo_filtro_eventos = resposta;
        $("#info_exibicao").html("Eventos até dia " + moment().add(15, "days").format("DD/MM/YYYY"));
        carregar_eventos_na_tela(ultimo_filtro_eventos);
    }
});

// exibe os brinquedos disponíveis para o dia do evento
socket.on("receber_brinquedos_vagos", function(resposta){
    if(resposta.status){
        lista_brinquedos_disponiveis = resposta.resultado;
        exibir_brinquedos_disponiveis_dentro_do_evento_em_destaque();
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


socket.on("resposta_edicao_evento", function(resposta){
    if(resposta.status){
        emitirAviso("Evento editado com sucesso", "snackbar", 3000);
    }else{
        emitirAviso("Ocorreu um erro na edição do evento", "snackbar", 3000);
    }    
    $("#janelaDestaqueEvento").modal("hide");
    $("body").removeClass("cursor_progresso");
    refazer_ultimo_filtro();    
});
//retorno do envio de confirmação via email
socket.on("retorno_mudanca_status_evento", function(mensagem){
    alert(mensagem.mensagem);
    $("body").removeClass("cursor_progresso");
    remover_barra_de_progresso_do_modal();
    if(mensagem.status){
        $("#status_evento_em_destaque").html(funcao_status_evento(mensagem.status_evento));
    } 
});

socket.on("receberBrinquedosVagosPorData", function(lista_brinquedos,data){
    $("#info_exibicao").html("Brinquedos disponíveis para "+ moment(data).format("DD/MM/YYYY"));
    $("#listagemFiltros").html("");
    selecionar_botoes_controle_a_serem_exibidos("brinquedo"); 
    lista_brinquedos.forEach(function(brinquedo, indice){
        let novaDiv = $("#divListaBrinquedos").clone();
        $(novaDiv).attr("id", "brinquedo_diponivel"+indice)
                  .appendTo("#listagemFiltros")
                  .removeClass("invisible")
                  .removeClass("float");
        $(novaDiv).find(".foto_brinquedo").attr("src", caminho_imagens_brinquedos+"/"+removeAcento(brinquedo.nome_brinquedo)+"/miniatura/miniatura_"+brinquedo.foto_brinquedo);
        $(novaDiv).find(".checkbox_brinquedo").attr("id", "checkbox_inserir_brinquedo"+indice);
        $(novaDiv).find(".nome_brinquedo_troca_brinquedos").html(brinquedo.nome_brinquedo); 
        $(novaDiv).find(".qtd_disponivel_troca_brinquedos").html(brinquedo.quantidade);        
    });
    ultimo_filtro_brinquedos = lista_brinquedos;
});

socket.on("resposta_consulta_evento_por_intervalo_data", function(resposta){
    selecionar_botoes_controle_a_serem_exibidos("evento"); 
    if(!resposta.status){
        $("#listagemFiltros").html(resposta.resultado);
    }else{
        let eventos = resposta.resultado;
        $("#listagemFiltros").html("");
        ultimo_filtro_eventos = eventos;
        console.log(eventos);
        $("#info_exibicao").html("Exibindo eventos de " + moment(eventos[0].data_evento).format("DD/MM/YYYY") 
            + " até " + moment(eventos[eventos.length - 1].data_evento).format("DD/MM/YYYY"));
        carregar_eventos_na_tela(eventos);
    }
});


