
    function habilitar_edicao_evento(){
        liberar_campos_para_edicao();
        $("#botao_editar_evento").removeClass("btn-outline-primary");
        $("#botao_editar_evento").addClass("btn-primary");
              
    }

    function liberar_campos_para_edicao(){
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
      $("#botao_trocar_cliente, #btn_editar_brinquedos_evento, #rodape_modal_destaque_evento, #div_botao_copia_endereco").removeClass("invisible");
      brinquedos_do_evento_em_destaque.forEach(function(brinquedo, indice){
        $("#checkbox_brinquedo_no_evento"+indice).show();
        document.getElementById("checkbox_brinquedo_no_evento"+indice).checked = true;
      });
    }

    function desabilitar_edicao_evento(){
      bloquear_campos_para_edicao();
      $("#linha_lista_brinquedos").html("");
      $("#botao_editar_evento").removeClass("btn-primary");
      $("#botao_editar_evento").addClass("btn-outline-primary");
    }
    
    function bloquear_campos_para_edicao(){
      $("#botao_trocar_cliente, #btn_editar_brinquedos_evento, #rodape_modal_destaque_evento, #div_botao_copia_endereco").addClass("invisible");
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
      console.log(brinquedos_do_evento_em_destaque);
      brinquedos_do_evento_em_destaque.forEach(function(brinquedo, indice){
        $("#checkbox_brinquedo_no_evento"+indice).hide();
      });
    }

    function desabilitar_reagendamento_do_evento(){
      $("#botao_editar_evento").removeAttr("disabled");
      $("#botao_reagendar_evento").removeClass("btn-secondary");
      $("#botao_reagendar_evento").addClass("btn-outline-secondary");
      $("#data_destaque_evento").attr("readonly", true);
      $("#hora_destaque_evento").attr("readonly", true);
      $("#btnEnviarReagendamentoEvento").hide();
      $("#data_destaque_evento").val(moment(evento_em_destaque.data_evento).format("YYYY-MM-DD"));
      $("#titulo_div_lista_brinquedos_no_evento, #linha_lista_brinquedos").html("");
      $("#btn_editar_brinquedos_evento").addClass("invisible");
    }

    function reagendar_evento(evento){
      if($("#botao_reagendar_evento").hasClass("btn-outline-secondary")){
        habilitar_reagendamento();
        console.log(evento_em_destaque.data_evento);
      }else{
        desabilitar_reagendamento_do_evento();
      }
    }
    
    function habilitar_reagendamento(){
      $("#data_destaque_evento, #hora_destaque_evento").removeAttr("readonly");
      $("#btnEnviarReagendamentoEvento").show();
      $("#btn_editar_brinquedos_evento, #rodape_modal_destaque_evento").removeClass("invisible");
      $("#botao_reagendar_evento").removeClass("btn-outline-secondary");
      $("#botao_reagendar_evento").addClass("btn-secondary");  
      $("#botao_editar_evento").attr("disabled", true);
      brinquedos_do_evento_em_destaque.forEach(function(brinquedo, indice){
        document.getElementById("checkbox_brinquedo_no_evento"+indice).checked = true;
      });
    }
    

    function exibir_brinquedos_do_evento_em_destaque(){
      if(brinquedos_do_evento_em_destaque && brinquedos_do_evento_em_destaque.length > 0){
        $("#titulo_div_lista_brinquedos_no_evento").html("Brinquedos agendados para o evento "+ evento_em_destaque.id_evento);
        brinquedos_do_evento_em_destaque.forEach(function(brinquedo,indice){
          let div_criada = ($("#divListaBrinquedos").clone()
                                                    .appendTo("#div_lista_brinquedos_no_evento")
                                                    .attr("id", "evento_brinquedo"+indice)
                                                    .removeClass("invisible")
                                                    .removeClass("float")
                                                    .addClass("brinquedo_no_evento"))[0];
          $(div_criada).find(".foto_brinquedo").attr("src", caminho_imagens_brinquedos+"/"+removeAcento(brinquedo.nome_brinquedo)+"/miniatura/miniatura_"+brinquedo.foto_brinquedo);
          $(div_criada).find(".checkbox_brinquedo").attr("id", "checkbox_brinquedo_no_evento"+indice).attr("id_brinquedo", brinquedo.id_brinquedo).attr("checked", true).hide();
          $(div_criada).find(".nome_brinquedo_troca_brinquedos").html(brinquedo.nome_brinquedo);
          $(div_criada).find(".qtd").addClass("invisible");
        });  
      }            
    }

    function exibir_brinquedos_disponiveis_dentro_do_evento_em_destaque(){
      if(evento_em_destaque.data_evento != moment($("#data_destaque_evento")).format("YYYY-MM-DD")){
        $("#div_lista_brinquedos_no_evento").find(".checkbox_brinquedo").attr("checked", false);
        $(".brinquedo_no_evento").hide();
        $("#titulo_div_lista_brinquedos_no_evento").html("<center style='color:red'>Escolha dentre os brinquedos vagos para o dia!</center>")
        $("#btn_editar_brinquedos_evento").addClass("invisible");
      }
        
    //  }
      $("#linha_lista_brinquedos").html('');
      if(lista_brinquedos_disponiveis && lista_brinquedos_disponiveis.length > 0){
        lista_brinquedos_disponiveis.forEach(function(brinquedo, indice){
          let div_criada = ($("#divListaBrinquedos").clone()
                                                    .appendTo("#linha_lista_brinquedos")
                                                    .attr("id", "brinquedo"+indice)
                                                    .removeClass("invisible")
                                                    .removeClass("float")
                                                    .addClass("brinquedo_disponivel"))[0];
          $(div_criada).find(".foto_brinquedo").attr("src", caminho_imagens_brinquedos+"/"+removeAcento(brinquedo.nome_brinquedo)+"/miniatura/miniatura_"+brinquedo.foto_brinquedo);
          $(div_criada).find(".checkbox_brinquedo").attr("id", "checkbox_brinquedo"+indice).attr("id_brinquedo", brinquedo.id_brinquedo);
          $(div_criada).find(".nome_brinquedo_troca_brinquedos").html(brinquedo.nome_brinquedo);
          $(div_criada).find(".qtd").addClass("invisible");
        });

        
      }      
    }

    //envia os dados para filtro no db e caso não exista nenhum campo com mais de 3
    //caracteres ela apaga os dados da div listaClientes
    function filtrarClientes(nome, data, logradouro, cidade){
      filtroCliente = {
          nome : nome, 
          data : data,
          logradouro : logradouro,
          cidade : cidade
      }
      socket.emit("filtroCliente", filtroCliente, perfil);//resposta vem no escutasSocketIO => mandarClientes              
    }

    function preencherJanelaDeListarCliente(clientes){
      let listaClientes = '';
      
      //preenchimento da lista de clientes filtrada na variável listaClientes
      clientes.forEach(cliente => {
          listaClientes += 
          '<div id="cliente_individual" style="margin-top: 30px; width: max-content;">' +
              'Id de Cliente: <span>'+ cliente.id_cliente +'</span><br>' +
              'Nome: <span>'+ cliente.nome +'</span> <br>' +
              'CPF: <span>'+ cliente.cpf +'</span><br>' +
              'Endereço: <span>'+ cliente.logradouro +'</span>&nbsp;&nbsp;<span>' +
              cliente.numero + '</span>,&nbsp;&nbsp;';
              if(cliente.complemento)
                  listaClientes += "Complemento: <span>" + cliente.complemento+'</span>, &nbsp;&nbsp;';                    
              if(cliente.observacao_endereco)
                  listaClientes += "Observação do endereço: <span>" + cliente.observacao_endereco +'</span>';
              listaClientes +=
              ' Cidade: <span>'+ cliente.cidade +'</span><br>'+
              'Telefone: <span>'+ cliente.telefone +'</span><br>';
              if(cliente.telefone_recado)
                  listaClientes += 'Telefone para recados: <span>'+ cliente.telefone_recado +'</span><br>';
              listaClientes +=
              'Email: <span>'+cliente.email +'</span><br>';
              if(cliente.observacao_cliente)
                  listaClientes += 'Observação: <span>'+cliente.observacao_cliente+'</span><br>';
              listaClientes += 
              '<button class="btn btn-default" id="btnEditarCliente"  data-toggle="modal" '+ 
                  'data-target="#janelaDeEdicaoCliente" value="'+cliente.id_cliente+'">Editar</button>&nbsp;&nbsp;'+
              '<button class="btn btn-default" id="btn_excluir_cliente" data-toggle="modal"'+
                  'data-target="#janelaDeRemocaoCliente" value="'+cliente.id_cliente+'">Excluir</button>' +
              '<hr>'+
          '</div>';
      });
        document.getElementById("listaClientes").innerHTML = listaClientes;
    }

    //Emissor de mensagems tipo "snackbar"
function emitirAviso(mensagem, id, tempo){
  let snackbar = document.getElementById(id);
  snackbar.innerHTML = mensagem;
  snackbar.className = "show";
  setTimeout(function(){snackbar.className = snackbar.className.replace("show", ""); }, tempo);
}

//Refaz o último filtro de informções exibidas na tela, de forma manter a lista exibida atualizada
function refazer_ultimo_filtro(){
  socket.emit(nome_do_ultimo_filtro_utilizado,perfil);
}

function confirmarEvento(){
  let idEvento = evento_em_destaque.id_evento;
  socket.emit("enviarEmailConfirmacao", idEvento, perfil);
  $("body").addClass("cursor_progresso");
  exibir_barra_de_progresso_no_modal();
}

function selecionar_botoes_controle_a_serem_exibidos(classe_botao){
  //exibir somente os botôes de controle correspondentes ao filtro brinquedo
  let botoes = $("#navbarSupportedContent").find(".nav-item")
  for(let indice = 0; indice < botoes.length; indice++){
    if($(botoes[indice]).hasClass(classe_botao)){
      $(botoes[indice]).css("display","inline");
    }else{
      $(botoes[indice]).css("display", "none");
    }
  }
}

function pedir_evento_por_data(data_inicio, data_fim){
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
    emitirAviso("Insira pelo menos uma data válida", "snackbar", 3000);
  }  
}

function carregar_eventos_na_tela(eventos){
  console.log(eventos);

  let data_evento = moment(eventos[0].data_evento).format("DD/MM/YYYY");
  let div_data_evento = $("#div_data").clone().removeClass("invisible").removeClass("float").appendTo("#listagemFiltros").removeClass("invisible");
  $(div_data_evento).removeAttr("id");
  $($(div_data_evento).find(".data_cabecalho_eventos")[0]).html(data_evento);
  let cor_borda_fieldset = "borda_azul";
  //laço que exibe eventos recebidos do servidor 
  eventos.forEach(function(evento, indice){
    let data_no_array = moment(evento.data_evento).format("DD/MM/YYYY");
    if(data_no_array != data_evento){
      data_evento = data_no_array;
      let div_data_evento1 = $("#div_data").clone().removeClass("invisible").removeClass("float").appendTo("#listagemFiltros").removeClass("invisible");
      $(div_data_evento1).removeAttr("id");
      $($(div_data_evento1).find(".data_cabecalho_eventos")[0]).html(data_evento);
    }    
    let item = $("#peleCelulaEvento").clone().removeClass("invisible").removeClass("float").appendTo("#listagemFiltros").removeClass("invisible");
    let celulaEvento = item.find(".celulaEvento")[0];
    $(celulaEvento).attr("id", indice);
    let campoId = item.find(".idListaEventos")[0];
    let campoData = item.find(".dataListaEventos")[0];
    let campoNomeCliente = item.find(".nomeClienteListaEventos")[0];
    let campoEndereco = item.find(".enderecoListaEventos")[0];
    let campoBrinquedos = item.find(".brinquedosListaEventos")[0];
    let campoTelefone = item.find(".telefone_cliente")[0];
    let campoTelefoneRecado = item.find(".telefone_recado")[0];
    let status_evento = item.find(".status")[0];
    campoId.innerHTML = evento.id_evento;
    campoData.innerHTML = data_no_array;
    campoNomeCliente.innerHTML = evento.nome_cliente;
    let endereco_evento = evento.logradouro_evento + ", " + evento.numero_evento;
    if (evento.bairro_evento && evento.bairro_evento.length > 2) endereco_evento += ", "+evento.bairro_evento;
    if (evento.cidade_evento && evento.cidade_evento.length > 2) endereco_evento += ", "+evento.cidade_evento + ".";
    else endereco_evento += "."
    campoEndereco.innerHTML = endereco_evento;
    campoTelefone.innerHTML = evento.telefone;
    campoTelefoneRecado.innerHTML = evento.telefone_recado;
    $(campoBrinquedos).attr("id","campo_brinquedos_evento_"+evento.id_evento);
    $(campoBrinquedos).html('');
    //laço que exibe brinquedos dentro do evento
    if(evento.brinquedos.length > 0){
      evento.brinquedos.forEach(function(brinquedo, indice){
        let celula_icone_brinquedo = $("#brinquedo_individual").clone();
        $(celula_icone_brinquedo).removeClass("invisible")
          .removeClass("float")
          .attr("id","evento_"+evento.id_evento+"_icone_brinquedo_"+indice)
          .appendTo(campoBrinquedos);
        let nome_brinquedo = celula_icone_brinquedo.find(".nome_brinquedo")[0];
        let icone_brinquedo = celula_icone_brinquedo.find(".icone_brinquedo")[0];
        nome_brinquedo.innerHTML = brinquedo.nome;
        $(icone_brinquedo).attr("src",caminho_imagens_brinquedos+"/"+removeAcento(brinquedo.nome)+"/miniatura/miniatura_"+brinquedo.imagem);
      });
    }else{
      campoBrinquedos.innerHTML = "<span style='margin-left: 1rem;'>Evento ainda sem brinquedos</span>";
    }
    
    //lógica para alteração a cor do fieldset
    let fieldset = $(item).find(".field_set_modulo_evento")[0];
    switch (cor_borda_fieldset){
      case "borda_azul": $(fieldset).addClass("borda_azul");
                         cor_borda_fieldset = "borda_amarela";
                         break;
      case "borda_amarela": $(fieldset).addClass("borda_amarela");
                            cor_borda_fieldset = "borda_vermelha";
                            break;
      case "borda_vermelha": $(fieldset).addClass("borda_vermelha");
                            cor_borda_fieldset = "borda_verde";
                            break;
      case "borda_verde": $(fieldset).addClass("borda_verde");
                            cor_borda_fieldset = "borda_azul";
                            break;
    }
    //seletor do status do evento ---- status 0: "Não confirmado", 1: "Confirmado", 2: Cancelado
    switch (evento.status){
      case 0: $(fieldset).css("background-color","#a7fff0");
              $(status_evento).html("Não Confirmado");
              break;
      case 1: $(fieldset).css("background-color","#ffffff");
              $(status_evento).html("Confirmado");
              break;
      case 2: $(fieldset).css("background-color","#f867a467");
              $(status_evento).html("CANCELADO");
              break;
    }
  });    
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

function funcao_status_evento(codigo_status){
  switch (codigo_status){
    case 0: return "Não Confirmado";
    case 1: return "Confirmado";
    case 2: return "CANCELADO";
  }
}

function executar_no_fechamento_do_modal(){
  if(!$("#rodape_modal_destaque_evento").hasClass("invisible")){
    desabilitar_edicao_evento();
  }
  desabilitar_reagendamento_do_evento();
  desabilitar_copia_do_evento();
  $("#div_lista_brinquedos_no_evento").html(""); 
  $("#linha_lista_brinquedos").html("");
  evento_em_destaque = {};
  brinquedos_do_evento_em_destaque = [];
  lista_de_brinquedos_disponiveis = [];
  ultimo_filtro_clientes = {};
  cliente_em_destaque = {};
  refazer_ultimo_filtro();
  console.log("fechei o modal");
}

function exibir_barra_de_progresso_no_modal(){
  let progresso = $("body").find(".barra_progresso")[0];
  $(progresso).clone().appendTo("#corpoModal").addClass("show").attr("id","progresso_confirmacao");
}

function remover_barra_de_progresso_do_modal(){
  $("#progresso_confirmacao").remove();
}

function cancelar_evento(id_evento){
  exibir_barra_de_progresso_no_modal();
  socket.emit("cancelar_evento", perfil, id_evento);
}

function capturar_brinquedos_inseridos_no_evento(){
  //capturando os novos brinquedos inseridos no evento
  let checkbox_brinquedos_disponiveis = $(".container_troca_dos_brinquedos").find(".checkbox_brinquedo");
  let brinquedos_inseridos = [];
  for(let i = 0; i < checkbox_brinquedos_disponiveis.length; i++){
      if($(checkbox_brinquedos_disponiveis[i]).prop("checked")){
          brinquedos_inseridos.push($(checkbox_brinquedos_disponiveis[i]).attr("id_brinquedo"));
      }
  }
  return brinquedos_inseridos;
}

function capturar_brinquedos_retirados_do_evento(){
  //capturando os brinquedos retirados do evento
  let checkbox_brinquedos_no_evento = $(".container_dos_brinquedos_no_evento").find(".checkbox_brinquedo");
  let brinquedos_retirados = [];
  for(let i = 0; i < checkbox_brinquedos_no_evento.length; i++){
    if(!$(checkbox_brinquedos_no_evento[i]).prop("checked")){
        brinquedos_retirados.push($(checkbox_brinquedos_no_evento[i]).attr("id_brinquedo"));
    }
  }
  return brinquedos_retirados;
}

function editar_evento(){
  let brinquedos_inseridos = capturar_brinquedos_inseridos_no_evento();
  let brinquedos_retirados = capturar_brinquedos_retirados_do_evento();
   
   
   //capturando os itens do formulário  
   let evento = capturar_campos_do_modal_evento_em_destaque();
      
   let dados_para_envio = {brinquedos_inseridos: brinquedos_inseridos,brinquedos_retirados: brinquedos_retirados, evento: evento};
   socket.emit("editar_evento", dados_para_envio, perfil);
   $("body").addClass("cursor_progresso");        

}

function capturar_campos_do_modal_evento_em_destaque(){
  let evento = {};
  evento.id_evento = evento_em_destaque.id_evento;
  evento.id_cliente = cliente_em_destaque.id_cliente;              
  evento.data = moment($("#data_destaque_evento").val()).format("YYYY-MM-DD") + " ";//hora sempre deve ser tratada em formato de string
  evento.data += moment($("#data_destaque_evento").val()).format("HH:mm");
  evento.logradouro = $("#logradouro_destaque_evento").val();
  evento.numero = $("#numero_destaque_evento").val();
  evento.complemento = $("#complemento_destaque_evento").val();
  evento.observacao = $("#observacao_endereco_destaque_evento").val();
  evento.bairro = $("#bairro_destaque_evento").val();
  evento.cidade = $("#cidade_destaque_evento").val();
  evento.valor_total = $("#valor_total_destaque_evento").val();
  evento.valor_desconto = $("#valor_desconto_destaque_evento").val();
  evento.valor_sinal = $("#valor_sinal_destaque_evento").val();        
  evento.observacao_evento = $("#observacao_destaque_evento").val();
  evento.possui_local_abrigado = $("#abrigo_destaque_evento").val();
  return evento;
}

function carregar_clientes_para_troca_na_edicao_evento(clientes){
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
}

function copiar_evento(){
  let evento = capturar_campos_do_modal_evento_em_destaque();
  evento.brinquedos = capturar_brinquedos_inseridos_no_evento();
  console.log(evento);
  socket.emit("copiar_evento", perfil, evento);
  exibir_barra_de_progresso_no_modal();
}

function receber_evento_copiado(resposta){
  remover_barra_de_progresso_do_modal();
  if(resposta.status){
    emitirAviso("Evento copiado com sucesso.", "snackbar", 4000);
  }else{
    emitirAviso("Ocorreu algum erro ao copiar o evento.", "snackbar", 3000);
  }
  executar_no_fechamento_do_modal();
}

function enviar_brinquedos_vagos_na_data(data){
  console.log("enviar");
  socket.emit("enviar_brinquedos_vagos", perfil, data);
}

function habilitar_copia_do_evento(){
  liberar_campos_para_edicao();
  evento_em_destaque.brinquedos = [];
  
  let lista_de_brinquedos_no_evento_copiado = $("#div_lista_brinquedos_no_evento").find(".checkbox_brinquedo");//achar os brinquedos para desmarcá-los
  
  for(let i = 0; i < lista_de_brinquedos_no_evento_copiado.length; i++ ){
    lista_de_brinquedos_no_evento_copiado[i].checked = false;
    $(lista_de_brinquedos_no_evento_copiado[i]).parent().parent().parent().hide();
  }
  $("#titulo_div_lista_brinquedos_no_evento").html("<center style='color: red;'>Escolha os brinquedos do evento copiado</center>");
  $("#btn_editar_brinquedos_evento").click().hide();

  $("#motivo_edicao").html("<center style='color: red;'>Modifique o dados necessários e clique em concluir cópia na parte de baixo.</center>")
  $("#btn_concluir_copia_evento").attr("hidden", false);
  $("#botao_reagendar_evento, #botao_cancelar_evento, #botao_confirmar_evento, #botao_editar_evento")
    .attr("disabled", true);
  $("#btnEnviarEdicaoEvento").attr("hidden", true);
  $("#botao_copiar_evento").removeClass("btn-outline-warning").addClass("btn-warning");
}

function desabilitar_copia_do_evento(){
  bloquear_campos_para_edicao();
  exibir_brinquedos_do_evento_em_destaque();
  $("#btn_editar_brinquedos_evento, #rodape_modal_destaque_evento").addClass("invisible");
  $("#motivo_edicao, #linha_lista_brinquedos").html('');
  $("#btn_concluir_copia_evento").attr("hidden", true);
  $("#btnEnviarEdicaoEvento").attr("hidden", false);
  $("#botao_reagendar_evento, #botao_cancelar_evento, #botao_confirmar_evento, #botao_editar_evento")
    .removeAttr("disabled", false);
  $("#botao_copiar_evento").removeClass("btn-warning").addClass("btn-outline-warning");
  $("#titulo_div_lista_brinquedos_no_evento").html($("#titulo_div_lista_brinquedos_no_evento").innerHTML);
}



//#################################################################
//CLIENTES

//#################################################################
//BRINQUEDOS
const brinquedo = {
  janelaInserirBrinquedo: function(){
    $("#listagemFiltros").html("");
    $("#info_exibicao").html("");
    let janela = $("#matriz_tela_insercao_brinquedos").clone();
    $(janela).attr("id", "tela_insercao_brinquedos").removeClass("invisible").appendTo("#listagemFiltros");
  }
}