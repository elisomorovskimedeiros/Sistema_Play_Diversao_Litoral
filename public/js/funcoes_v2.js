
    function habilitar_edicao_evento(){
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
        "#abrigo_destaque_evento").prop("readonly", true);
      $("#botao_trocar_cliente, #btn_editar_brinquedos_evento, #rodape_modal_destaque_evento, #div_botao_copia_endereco").addClass("invisible");
      brinquedos_do_evento_em_destaque.forEach(function(brinquedo, indice){
        $("#checkbox_brinquedo_no_evento"+indice).hide();
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
          $(div_criada).find(".foto_brinquedo").attr("src", brinquedo.foto_brinquedo);
          $(div_criada).find(".checkbox_brinquedo").attr("id", "checkbox_brinquedo_no_evento"+indice).attr("id_brinquedo", brinquedo.id_brinquedo).hide();
          $(div_criada).find(".nome_brinquedo_troca_brinquedos").html(brinquedo.nome_brinquedo);
          $(div_criada).find(".qtd").addClass("invisible");
        });  
      }            
    }

    function exibir_brinquedos_disponiveis(){      
      if(lista_brinquedos_disponiveis && lista_brinquedos_disponiveis.length > 0){
        lista_brinquedos_disponiveis.forEach(function(brinquedo, indice){
          let div_criada = ($("#divListaBrinquedos").clone()
                                                    .appendTo("#linha_lista_brinquedos")
                                                    .attr("id", "brinquedo"+indice)
                                                    .removeClass("invisible")
                                                    .removeClass("float")
                                                    .addClass("brinquedo_disponivel"))[0];
          $(div_criada).find(".foto_brinquedo").attr("src", brinquedo.foto_brinquedo);
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

function enviarEmailConfirmacao(){
  let idEvento = evento_em_destaque.id_evento;
  socket.emit("enviarEmailConfirmacao", idEvento, perfil);
  $("body").addClass("cursor_progresso");
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
  }else{
    emitirAviso("Insira pelo menos uma data válida", "snackbar", 3000);
  }  
}

function carregar_eventos_na_tela(eventos){
  eventos.forEach(function(evento, indice){
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
    let lista_brinquedos = "";
    evento.brinquedos.forEach(function(brinquedo, indice){
      lista_brinquedos += " " + brinquedo.nome;
      if(indice == evento.brinquedos.length - 1){
        lista_brinquedos += ". ";
      }else{
        lista_brinquedos += ", ";
      }
    });
    campoBrinquedos.value = lista_brinquedos;    
  });    
}
