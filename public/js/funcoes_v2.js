//Refaz o último filtro de informções exibidas na tela, de forma manter a lista exibida atualizada
function refazer_ultimo_filtro(){
  socket.emit(nome_do_ultimo_filtro_utilizado,perfil);
}

//########################
//função que remove acentos que possam existir nos nomes que serão dados aos arquivos ou diretórios
function removeAcento(text){       
  text = text.toLowerCase();                                                         
  text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
  text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
  text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
  text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
  text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
  text = text.replace(new RegExp('[Ç]','gi'), 'c');
  return text;                 
}



function cancelar_evento(id_evento){
  tela.exibir_barra_de_progresso_no_modal();
  socket.emit("cancelar_evento", perfil, id_evento);
}


function receber_evento_copiado(resposta){
  tela.remover_barra_de_progresso_do_modal();
  if(resposta.status){
    tela.exibirMensagem("Evento copiado com sucesso.");
  }else{
    tela.exibirMensagem("Ocorreu algum erro ao copiar o evento.");
  }
}



const evento = {
  backupBrinquedosEventoEmDestaque: [],
  //########### COPIA DE UM EVENTO ############
  copiar: {    
    controle: function(){
      if($("#botao_copiar_evento").hasClass("btn-outline-warning")){
        this.habilitar();
      }else{
        this.desabilitar();
      }
    },
    efetivarCopia: function(){
      if(evento.testeDeDataEvento()){        
        let eventoParaCopia = evento.edicao.capturar_campos_do_modal_evento_em_destaque();
        eventoParaCopia.brinquedos = campoBrinquedosNoEventoEmDestaque.capturar_brinquedos_inseridos_no_evento(true);
        console.log(eventoParaCopia);
        socket.emit("copiar_evento", perfil, eventoParaCopia);
        tela.exibir_barra_de_progresso_no_modal();
        this.desabilitar();        
      }else{
        tela.rolarParaCamposInvalidos();
      }
    },
    habilitar: function(){
      evento.edicao.liberar_campos_para_edicao();      
      $("#data_destaque_evento").val("");       
      $("#motivo_edicao").html("<center style='color: red;'>Modifique o dados necessários e clique em concluir cópia na parte de baixo.</center>")
      $("#btn_concluir_copia_evento").attr("hidden", false);
      tela.desabilitar_botao_reagendamento(true);
      tela.desabilitar_botao_confirmacao(true);
      tela.desabilitar_botao_cancelamento(true);
      tela.desabilitar_botao_edicao(true);
      $("#btnEnviarEdicaoEvento").attr("hidden", true);
      $("#botao_copiar_evento").removeClass("btn-outline-warning").addClass("btn-warning");
    },
    desabilitar:  function(){
      evento.edicao.bloquear_campos_para_edicao();
      campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.exibir(evento_em_destaque.brinquedos);
      $("#rodape_modal_destaque_evento").addClass("invisible");
      $("#motivo_edicao, #linha_lista_brinquedos").html('');
      $("#btn_concluir_copia_evento").attr("hidden", true);
      $("#btnEnviarEdicaoEvento").attr("hidden", false);
      tela.desabilitar_botao_reagendamento(false);
      tela.desabilitar_botao_confirmacao(false);
      tela.desabilitar_botao_cancelamento(false);
      tela.desabilitar_botao_edicao(false);
      $("#botao_copiar_evento").removeClass("btn-warning").addClass("btn-outline-warning");
      $("#titulo_div_lista_brinquedos_no_evento").html("Brinquedos agendados para o evento " + evento_em_destaque.id_evento);
      campoBrinquedosNoEventoEmDestaque.todosOsBrinquedosDisponiveis.botao.hide();
    },
    receber_resposta_evento_copiado: function(resposta){
      tela.remover_barra_de_progresso_do_modal();
      if(resposta.status){
        tela.exibirAlert("Evento copiado com sucesso.");
      }else{
        tela.exibirAlert("Ocorreu algum erro ao copiar o evento.");
      }
    }
  },
  testeDeDataEvento: function(){
    if(moment($("#data_destaque_evento").val()).isValid()){
      $("#data_destaque_evento").removeClass("is-invalid");
      return true;
    }else{
      $("#data_destaque_evento").addClass("is-invalid");
      return false;
    }
  },
  //############ REAGENDAMENTO DE UM EVENTO ##########
  reagendamento: {
    controle: function(){
      if($("#botao_reagendar_evento").hasClass("btn-outline-secondary")){
        this.habilitar();
      }else{
        this.desabilitar();
      }
    },
    habilitar: function(){
      $("#data_destaque_evento, #hora_destaque_evento").removeAttr("readonly");
      $("#btnEnviarReagendamentoEvento").show();
      $("#rodape_modal_destaque_evento").removeClass("invisible");
      $("#botao_reagendar_evento").removeClass("btn-outline-secondary");
      $("#botao_reagendar_evento").addClass("btn-secondary");  
      tela.desabilitar_botao_copia(true);
      tela.desabilitar_botao_confirmacao(true);
      tela.desabilitar_botao_cancelamento(true);
      tela.desabilitar_botao_edicao(true);
      campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.selecionarTodos();
      campoBrinquedosNoEventoEmDestaque.todosOsBrinquedosDisponiveis.botao.show();      
    },
    desabilitar: function(){
      tela.desabilitar_botao_copia(false);
      tela.desabilitar_botao_confirmacao(false);
      tela.desabilitar_botao_cancelamento(false);
      tela.desabilitar_botao_edicao(false);
      $("#botao_reagendar_evento").removeClass("btn-secondary");
      $("#botao_reagendar_evento").addClass("btn-outline-secondary");
      $("#data_destaque_evento").attr("readonly", true);
      $("#hora_destaque_evento").attr("readonly", true);
      $("#btnEnviarReagendamentoEvento").hide();
      $("#data_destaque_evento").val(moment(evento_em_destaque.data_evento).format("YYYY-MM-DD"));
      $("#titulo_div_lista_brinquedos_no_evento, #linha_lista_brinquedos").html("");
      $("#titulo_div_lista_brinquedos_no_evento").html("Brinquedos agendados para o evento  545" + evento_em_destaque.id_evento);
      campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.esconderCheckBox();
      campoBrinquedosNoEventoEmDestaque.todosOsBrinquedosDisponiveis.botao.hide();
    }
  },
  //################### EDIÇÃO DE UM EVENTO ##################3
  edicao: {
    controle: function(){
      if($("#botao_editar_evento").hasClass("btn-outline-primary")){
        this.habilitar_edicao_evento();
      }else{
        this.desabilitar_edicao_evento();
      }
    },

    habilitar_edicao_evento: function(){
      this.liberar_campos_para_edicao();
      $("#botao_editar_evento").removeClass("btn-outline-primary");
      $("#botao_editar_evento").addClass("btn-primary"); 
      tela.desabilitar_botao_copia(true);
      tela.desabilitar_botao_confirmacao(true);
      tela.desabilitar_botao_cancelamento(true);
      tela.desabilitar_botao_reagendamento(true);
      evento.backupBrinquedosEventoEmDestaque = campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.lista;   
    },

    liberar_campos_para_edicao: function(){
      $("#data_destaque_evento, "+
      "#hora_destaque_evento, "+
      "#logradouro_destaque_evento, "+
      "#numero_destaque_evento, "+
      "#complemento_destaque_evento, "+
      "#observacao_destaque_event, "+
      "#bairro_destaque_evento, "+
      "#cidade_destaque_evento, "+
      "#valor_total_destaque_evento, "+
      "#valor_desconto_destaque_evento, "+
      "#valor_sinal_destaque_evento, "+
      "#observacao_destaque_evento, "+
      "#abrigo_destaque_evento").removeAttr("readonly");
      $("#botao_trocar_cliente, #rodape_modal_destaque_evento, #div_botao_copia_endereco").removeClass("invisible");
      campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.selecionarTodos();
      campoBrinquedosNoEventoEmDestaque.todosOsBrinquedosDisponiveis.botao.show();      
    },

    desabilitar_edicao_evento: function(){
      this.bloquear_campos_para_edicao();
      $("#linha_lista_brinquedos").html("");
      $("#botao_editar_evento").removeClass("btn-primary");
      $("#botao_editar_evento").addClass("btn-outline-primary");
      $("#titulo_div_lista_brinquedos_no_evento").html("Brinquedos agendados para o  593 evento " + evento_em_destaque.id_evento);
      tela.desabilitar_botao_copia(false);
      tela.desabilitar_botao_confirmacao(false);
      tela.desabilitar_botao_cancelamento(false);
      tela.desabilitar_botao_reagendamento(false);
      campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.lista = evento.backupBrinquedosEventoEmDestaque;
      evento.backupBrinquedosEventoEmDestaque = [];
      campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.exibir(evento_em_destaque.brinquedos);
      this.cancelarTrocarDeCliente();
    },
      
    bloquear_campos_para_edicao: function(){
      $("#botao_trocar_cliente, #rodape_modal_destaque_evento, #div_botao_copia_endereco").addClass("invisible");
      $("#botao_reagendamento_evento").addClass("invisible");
      $("#data_destaque_evento, "+
      "#hora_destaque_evento, "+
      "#logradouro_destaque_evento, "+
      "#numero_destaque_evento, "+
      "#complemento_destaque_evento, "+
      "#observacao_destaque_event, "+
      "#bairro_destaque_evento, "+
      "#cidade_destaque_evento, "+
      "#valor_total_destaque_evento, "+
      "#valor_desconto_destaque_evento, "+
      "#valor_sinal_destaque_evento, "+
      "#observacao_destaque_evento, "+
      "#abrigo_destaque_evento").attr("readonly", true);
      campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.exibir(evento_em_destaque.brinquedos);
      campoBrinquedosNoEventoEmDestaque.brinquedosIndisponiveis.esconder();
      campoBrinquedosNoEventoEmDestaque.todosOsBrinquedosDisponiveis.esconder();
      campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.esconderCheckBox();
    },
    gerenciarBrinquedosVagos: function(){
      backupBrinquedosEventoEmDestaque = evento_em_destaque.brinquedos;
      let listaIndisponivel = [];
      let listaDisponivel = [];
      //será preenchida a lista de indisponíveis somente caso a data selecionada seja diferente
      if(moment($("#data_destaque_evento").val()).format("YYYY-MM-DD") == moment(evento_em_destaque.data_evento).format("YYYY-MM-DD")){
        listaDisponivel = evento_em_destaque.brinquedos;
      }else{
       
        if(evento_em_destaque.brinquedos){
          evento_em_destaque.brinquedos.forEach(function(brinquedoEvento){
            let estaDisponivel = false;
            lista_brinquedos_disponiveis.forEach(function(brinquedoDisponivel){
              if(brinquedoDisponivel.id_brinquedo == brinquedoEvento.id_brinquedo){
                estaDisponivel = true;
                listaDisponivel.push(brinquedoEvento);
                return;
              }
            });
            if(!estaDisponivel){
              listaIndisponivel.push(brinquedoEvento);
            }
          });
        }        
      }      
      campoBrinquedosNoEventoEmDestaque.brinquedosAindaDisponiveis.exibir(listaDisponivel);
      campoBrinquedosNoEventoEmDestaque.brinquedosIndisponiveis.exibir(listaIndisponivel);
      campoBrinquedosNoEventoEmDestaque.todosOsBrinquedosDisponiveis.exibir();
    },
    cancelarTrocarDeCliente: function(){
      this.preencharCamposClienteNoEventoEmDestaque(evento_em_destaque);
    },
    preencharCamposClienteNoEventoEmDestaque: function(objQueContemCliente){
      if(objQueContemCliente.nome){
        $("#nome_cliente_destaque_evento").val(objQueContemCliente.nome);
      }else{
        $("#nome_cliente_destaque_evento").val(objQueContemCliente.nome_cliente);
      }
      $("#telefone_destaque_evento").val(objQueContemCliente.telefone);
      $("#telefone_alternativo_destaque_evento").val(objQueContemCliente.telefone_recado);
      $("#email_destaque_evento").val(objQueContemCliente.email);
      $("#janela_troca_cliente_no_evento").modal("hide");
    },
    capturar_campos_do_modal_evento_em_destaque: function(){
      let eventoEditado = {};
      eventoEditado.id_evento = evento_em_destaque.id_evento;
      eventoEditado.id_cliente = cliente_em_destaque.id_cliente;
      eventoEditado.data = moment($("#data_destaque_evento").val() + " " + $("#hora_destaque_evento").val()).format("YYYY/MM/DD HH:mm:ss");               
      eventoEditado.logradouro = $("#logradouro_destaque_evento").val();
      eventoEditado.numero = $("#numero_destaque_evento").val();
      eventoEditado.complemento = $("#complemento_destaque_evento").val();
      eventoEditado.observacao = $("#observacao_endereco_destaque_evento").val();
      eventoEditado.bairro = $("#bairro_destaque_evento").val();
      eventoEditado.cidade = $("#cidade_destaque_evento").val();
      eventoEditado.valor_total = Number($("#valor_total_destaque_evento").val());
      eventoEditado.valor_desconto = Number($("#valor_desconto_destaque_evento").val());
      eventoEditado.valor_sinal = Number($("#valor_sinal_destaque_evento").val());        
      eventoEditado.observacao_evento = $("#observacao_destaque_evento").val();
      eventoEditado.possui_local_abrigado = $("#abrigo_destaque_evento").val();
      return eventoEditado;
    },
    executar: function(){
      let brinquedos_inseridos = campoBrinquedosNoEventoEmDestaque.capturar_brinquedos_inseridos_no_evento();
      let brinquedos_retirados = campoBrinquedosNoEventoEmDestaque.capturar_brinquedos_retirados_do_evento();
      brinquedos_retirados = [...brinquedos_retirados,...campoBrinquedosNoEventoEmDestaque.retirar_brinquedos_indisponiveis()];
      //capturando os itens do formulário  
      let evento = this.capturar_campos_do_modal_evento_em_destaque();
      let dados_para_envio = {brinquedos_inseridos: brinquedos_inseridos,brinquedos_retirados: brinquedos_retirados, evento: evento};
      socket.emit("editar_evento", dados_para_envio, perfil);
      $("body").addClass("cursor_progresso");
    }    
  },
  confirmarEvento: function(){
    let idEvento = evento_em_destaque.id_evento;
    socket.emit("enviarEmailConfirmacao", idEvento, perfil);
    $("body").addClass("cursor_progresso");
    tela.exibir_barra_de_progresso_no_modal();
  },

  filtrar_evento_por_data: function(data_inicio, data_fim){
    let de_valido = false;
    let ate_valido = false;
    if(moment(data_inicio).isValid()){
        data_inicio = String(moment(data_inicio).format("YYYY-MM-DD"));
        de_valido = true;
    } 
    if(moment(data_fim).isValid()){
        data_fim = String(moment(data_fim).format("YYYY-MM-DD"));
        ate_valido = true;
    }
    if(ate_valido || de_valido){
      socket.emit("eventos_por_intervalo_de_data",perfil, data_inicio, data_fim);
      nome_do_ultimo_filtro_utilizado = "eventos_por_intervalo_de_data";
    }else{
      tela.exibirMensagem("Insira pelo menos uma data válida");
    }  
  },

  controle_status_evento: function(codigo_status){
    switch (codigo_status){
      case 0: return "Não Confirmado";
      case 1: return "Confirmado";
      case 2: return "CANCELADO";
    }
  },
  atualizarCampoReceberNoAto: function(total, desconto, sinal){
    $("#receber_no_ato_destaque_evento").val(total-desconto-sinal);
  }
}

//#################################################################
//CLIENTES

const cliente = {
  clienteASerRemovido: {},
  procurarCliente: function(valorDeBusca){
    socket.emit("buscarClientePorIdouNome", valorDeBusca, perfil);
  },
  receberBuscaCliente: function(resultado){//clientes buscados por id ou nome
    if(resultado && resultado.status){
      ultimo_filtro_clientes = resultado.resultado;
      if(resultado.resultado.length && resultado.resultado.length > 0){
        tela.info_exibicao("Exibindo os seguintes clientes:");
        tela.exibirClientes(resultado.resultado, "#listagemFiltros");        
      }else if(resultado.resultado.length == 1){
        tela.info_exibicao("Exibindo o cliente " + resultado.resultado.id_cliente);
        tela.exibirClientes(resultado.resultado, "#listagemFiltros");  
      }else{
        tela.info_exibicao("Sem resultados");
        tela.exibirClientes("", "#listagemFiltros");  
      }
    }
  },
  inserirClienteNoEvento(div_clicada){
    let posicao_array_clientes = $(div_clicada.currentTarget).find(".campo_id").attr("indice");
    cliente_em_destaque = ultimo_filtro_clientes[posicao_array_clientes];
    evento.edicao.preencharCamposClienteNoEventoEmDestaque(cliente_em_destaque);    
    ultimo_filtro_clientes = {};
  },
  //envia os dados para filtro no db e caso não exista nenhum campo com mais de 3
  //caracteres ela apaga os dados da div listaClientes
  filtrarClientes:  function(nome, data, logradouro, cidade){
    filtroCliente = {
        nome : nome, 
        data : data,
        logradouro : logradouro,
        cidade : cidade
    }
    socket.emit("filtroCliente", filtroCliente, perfil);//resposta vem no escutasSocketIO => mandarClientes              
  },
  editarCliente(){
    cliente_em_destaque = {
      id_cliente: cliente_em_destaque.id_cliente,
      nome: $("#nome_edicao_edicao").val(),
      email:  $("#email_edicao").val(),
      cpf:  $("#cpf_edicao").val(),
      telefone:  $("#telefone_edicao").val(),
      telefone_recado:  $("#telefone_recado_edicao").val(),
      logradouro:  $("#logradouro_edicao").val(),
      numero:  $("#numero_edicao").val(),
      complemento:  $("#complemento_edicao").val(),
      bairro:  $("#bairro_edicao").val(),
      cidade:  $("#cidade_edicao").val(),
      observacao_endereco:  $("#observacao_endereco_edicao").val(),
      observacao_cliente: $("#observacao_cliente_edicao").val()
    }
    socket.emit("editarCliente", cliente_em_destaque, perfil);
  },
  respostaEdicaoCliente(mensagem){
    if(mensagem.status){
      tela.exibirMensagem("Editado com sucesso");
    }else{
      tela.exibirMensagem("Ocorreu um erro na edição");
    }
    tela.fecharModalEdicaoCliente();
    let filtroDeBusca = $("#procurarCliente").val();
    if(filtroDeBusca.length > 0){
        this.procurarCliente(filtroDeBusca);
    }     
  },
  async solicitarExclusaoCliente(listaEventos){
    let mensagem = "VOCÊ TEM ABSOLUTA CERTEZA DISSO?";    
    if(listaEventos && listaEventos.length > 0){
      mensagem += "\nLista de eventos desse cliente que serão removidos também:\n";
      listaEventos.forEach(function(evento){
        mensagem += "Evento: "+ evento.id_evento + " Data: " + moment(evento.data).format("DD/MM/YYYY") + "\n";
      });
    }
    
    if(await tela.emitirConfirm(mensagem)){
      socket.emit("excluirCliente", cliente.clienteASerRemovido.id_cliente, perfil);
    }
  },
  resultadoExclusaoCliente: function(resposta){
    if(resposta.status){
      tela.exibirMensagem("Cliente excluído com sucesso!");
    }else{
      tela.exibirMensagem("Ocorreu algum problema na exclusão do cliente.");
    }
    cliente.procurarCliente($("#procurarCliente").val());    
  },
  janelaInserirCliente: function(){
    $("#listagemFiltros").html("");
    $("#info_exibicao").html("");
    let janela = $("#matriz_inserir_cliente").clone();
    $(janela).attr("id", "matriz_inserir_cliente").attr("id","tela_inserir_cliente").removeClass("invisible").appendTo("#listagemFiltros");
    $(janela).find("#matriz-form-inserir-cliente").attr("id","form-inserir-cliente");    
  },
  inserirNovoCliente(dados){
    $.ajax({
      type: "POST",
      url: "/inserirCliente",
      data: dados,
      success: function(resposta){
        tela.exibirMensagem(resposta);        
        cliente.janelaInserirCliente();
      }
    });
    return false;
  },
  carregar_clientes_para_troca_na_edicao_evento: function(clientes){
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
          if(clientes.length > 1){
            tela.info_exibicao("Exibindo os seguintes clientes:");
          }else{
            tela.info_exibicao("Exibindo o cliente " + clientes[0].id_cliente);
          }                    
      }else{
        $("#listaClientes").html("");
        TextTrackList.info_exibicao("Sem resultados");
      }
  }
}

//#################################################################
//BRINQUEDOS
const brinquedo = {
  janelaInserirBrinquedo: function(){
    $("#listagemFiltros").html("");
    $("#info_exibicao").html("");
    let janela = $("#matriz_tela_insercao_brinquedos").clone();
    $(janela).attr("id", "tela_insercao_brinquedos").removeClass("invisible").appendTo("#listagemFiltros");
    $(janela).find("#matriz_botao_cadastrar_novo_brinquedo").attr("id","botao_cadastrar_novo_brinquedo");
    $(janela).find("#matriz-form-inserir-brinquedo").attr("id","form-inserir-brinquedo")    
  },
  inserirNovoBrinquedo(dados){
    $.ajax({
      type: "POST",
      url: "/inserirBrinquedo",
      data: dados,
      cache: false,
      contentType: false,
      processData: false,
      success: function(resposta){
        if(resposta.status){
          tela.exibirMensagem("Brinquedo Inserido com Sucesso");
        }else{
          tela.exibirMensagem("Ocorreu um erro na inserção do brinquedo");
        }
        brinquedo.listarTodos();
      }
    });
    return false;
  },
  listarTodos(){
    socket.emit("listarTodosBrinquedos", perfil);
  },
  exibirListaBrinquedos(brinquedos){
    tela.info_exibicao("Brinquedos cadastrados:");
    tela.exibirListaBrinquedos(brinquedos);      
  },
  telaExibirBrinquedoParaEdicao(campoClicado){
    let id_brinquedo = $(campoClicado).find(".id_brinquedo").html()
    let brinquedoClicado = {};
    ultimo_filtro_brinquedos.forEach(function(brinquedo){
      if(brinquedo.id_brinquedo == id_brinquedo){
        brinquedoClicado = brinquedo;
      }
    });
    tela.telaExibirBrinquedoParaEdicao(brinquedoClicado);
  },
  editarBrinquedo(dados){
    $.ajax({
      type: "POST",
      url: "/editarBrinquedo",
      data: dados,
      cache: false,
      contentType: false,
      processData: false,
      success: function(resposta){
        if(resposta.status){
          tela.exibirMensagem("Brinquedo Editado com Sucesso");
        }else{
          tela.exibirMensagem("Ocorreu um erro na edição do brinquedo");
        }
        tela.ordemFecharModalEdicaoBrinquedo();
        brinquedo.listarTodos();
      }
    });
    return false;
  },
  enviar_brinquedos_vagos_na_data: function(data){
    socket.emit("enviar_brinquedos_vagos", perfil, data); // resposta em "receberBrinquedosVagosPorData"
  },
  receberBrinquedosVagosPorData: function(lista_brinquedos,data){
    $("#info_exibicao").html("Brinquedos disponíveis para "+ moment(data).format("DD/MM/YYYY"));
    $("#listagemFiltros").html("");
    tela.selecionar_botoes_controle_a_serem_exibidos("brinquedo"); 
    lista_brinquedos.forEach(function(brinquedo, indice){
        let novaDiv = $("#divListaBrinquedos").clone();
        $(novaDiv).attr("id", "brinquedo_diponivel"+indice)
                  .appendTo("#listagemFiltros")
                  .removeClass("invisible")
                  .removeClass("float");
        $(novaDiv).find(".id_brinquedo").html(brinquedo.id_brinquedo);
        console.log(brinquedo);
        $(novaDiv).find(".foto_brinquedo").attr("src", caminho_imagens_brinquedos+"/"+removeAcento(brinquedo.nome_brinquedo)+"/miniatura/miniatura_"+brinquedo.foto_brinquedo);
        $(novaDiv).find(".checkbox_brinquedo").attr("id", "checkbox_inserir_brinquedo"+indice).hide();
        $(novaDiv).find(".nome_brinquedo_troca_brinquedos").html(brinquedo.nome_brinquedo); 
        $(novaDiv).find(".qtd_disponivel_troca_brinquedos").html(brinquedo.quantidade);        
    });
    ultimo_filtro_brinquedos = lista_brinquedos;
  }
}