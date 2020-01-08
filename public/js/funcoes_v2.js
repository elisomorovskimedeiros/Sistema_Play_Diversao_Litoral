
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
