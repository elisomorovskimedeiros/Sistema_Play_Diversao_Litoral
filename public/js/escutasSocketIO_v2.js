//inicialização do socketIO
var socket = io("/");

socket.on("receber_eventos", function(resposta){
    tela.selecionar_botoes_controle_a_serem_exibidos("evento");
   
    
    if(resposta.erro){
        tela.info_exibicao(resposta.erro);
    }else if(resposta.length > 0){
        tela.info_exibicao("");
        $("#listagemFiltros").html("");
        ultimo_filtro_eventos = resposta;        
        if(resposta.length == 1){
            tela.info_exibicao("Exibindo o evento " +  resposta[0].id_evento);
        }else{
            tela.info_exibicao("Eventos até dia " + moment().add(15, "days").format("DD/MM/YYYY"));
        }
    }else{
        tela.info_exibicao( "Sem resultados");
    }
    tela.carregar_eventos_na_tela(resposta);
});

// exibe os brinquedos disponíveis para o dia do evento, usado na edição de evento
socket.on("receber_brinquedos_vagos", function(resposta){ //solicitado em "enviar_brinquedos_vagos"
    if(resposta.status){
        lista_brinquedos_disponiveis = resposta.resultado;
        evento.edicao.gerenciarBrinquedosVagos();
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
        evento_em_destaque.brinquedos = resultado;
        campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.exibir(resultado);
    }    
    $("body").removeClass("cursor_progresso");        
});

//função que recebe a consulta da lista de clientes no bd, conforme o filtro solicitado
//usada em: inserirEvento.ejs, listarCliente.ejs
socket.on("mandarClientes", function(clientes){
    //tela.exibirClientes(clientes, "#listaClientes");
    carregar_clientes_para_troca_na_edicao_evento(clientes);
});


socket.on("resposta_edicao_evento", function(resposta){
    if(resposta.status){
        tela.exibirMensagem("Evento editado com sucesso");
    }else{
        tela.exibirMensagem("Ocorreu um erro na edição do evento");
    }    
    $("#janelaDestaqueEvento").modal("hide");
    $("body").removeClass("cursor_progresso");
    refazer_ultimo_filtro();    
});
//retorno do envio de confirmação via email
socket.on("retorno_mudanca_status_evento", function(mensagem){
    alert(mensagem.mensagem);
    $("body").removeClass("cursor_progresso");
    tela.remover_barra_de_progresso_do_modal();
    if(mensagem.status){
        $("#status_evento_em_destaque").html(evento.controle_status_evento(mensagem.status_evento));
    }
    if(mensagem.status_evento == 2){
        $("#texto_botao_confirmar_evento").html("Reconfirmar");
    } 
});

socket.on("receberBrinquedosVagosPorData", function(lista_brinquedos,data){
    brinquedo.receberBrinquedosVagosPorData(lista_brinquedos,data);    
});

socket.on("resposta_consulta_evento_por_intervalo_data", function(resposta){
    tela.selecionar_botoes_controle_a_serem_exibidos("evento"); 
    
    if(!resposta.status){
        $("#listagemFiltros").html(resposta.resultado);
    }else if(resposta.resultado.length > 0){
        let eventos = resposta.resultado;
        $("#listagemFiltros").html("");
        ultimo_filtro_eventos = eventos;
        if(eventos.length == 1){
            tela.info_exibicao("Exibindo o evento " + eventos[0].id_evento);
        }else if(eventos.length > 1){
            tela.info_exibicao("Exibindo eventos de " + moment(eventos[0].data_evento).format("DD/MM/YYYY") 
            + " até " + moment(eventos[eventos.length - 1].data_evento).format("DD/MM/YYYY"));
        }else if(evento.length == 0){
            tela.info_exibicao("");
        }
        
        tela.carregar_eventos_na_tela(eventos);
    }else{
        tela.info_exibicao("Sem resultados");
        $("#listagemFiltros").html("");
    }
});

socket.on("receber_evento_copiado", function(resposta){
    evento.copiar.receber_resposta_evento_copiado(resposta);
});

socket.on("pedirJanelaAdicionarBrinquedo", function(janela){
    brinquedo.renderizarAdicionarBrinquedo(janela);
});

socket.on("receberFiltroClientes", function(resposta){
    cliente.receberBuscaCliente(resposta);
});

socket.on("respostaEdicaoCliente", function(resposta){
    cliente.respostaEdicaoCliente(resposta);
});

socket.on("listaDeTodosBrinquedos", function(brinquedos){
    ultimo_filtro_brinquedos = brinquedos;
    brinquedo.exibirListaBrinquedos(brinquedos);
});

socket.on("receberEventos", function(resposta){
    cliente.solicitarExclusaoCliente(resposta);
});

socket.on("resultadoExclusaoCliente", function(resposta){
    cliente.resultadoExclusaoCliente(resposta);
});
