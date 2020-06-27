class Tela{
    constructor(){
        this.campoDeTrabalho = $("#listagemFiltros");
        this.celulaCliente = $("#peleCelulaCliente");
                
    }
    conteudoEventos(conteudo){$("#conteudoEventos").html(conteudo)};

    carregar_eventos_na_tela(eventos){
        if(eventos.length > 0){
            let data_evento = moment(eventos[0].data_evento).format("DD/MM/YYYY");
            let div_data_evento = $("#div_data").clone().removeClass("invisible").removeClass("float").appendTo("#listagemFiltros").removeClass("invisible");
            $(div_data_evento).removeAttr("id");
            $($(div_data_evento).find(".data_cabecalho_eventos")[0]).html(data_evento);
            let cor_borda_fieldset = "borda_azul";
            //laço que exibe eventos recebidos do servidor
            eventos.forEach(function(eventoNoFor, indice){
                let data_no_array = moment(eventoNoFor.data_evento).format("DD/MM/YYYY");
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
                let campo_valor_evento = item.find(".valor")[0];
                $(campoId).html(eventoNoFor.id_evento);
                $(campoData).html(data_no_array);
                $(campoNomeCliente).html(eventoNoFor.nome_cliente);
                let endereco_evento = eventoNoFor.logradouro_evento + ", " + eventoNoFor.numero_evento;
                if (eventoNoFor.bairro_evento && eventoNoFor.bairro_evento.length > 2) endereco_evento += ", "+eventoNoFor.bairro_evento;
                if (eventoNoFor.cidade_evento && eventoNoFor.cidade_evento.length > 2) endereco_evento += ", "+eventoNoFor.cidade_evento + ".";
                else endereco_evento += "."
                $(campoEndereco).html(endereco_evento);
                $(campoTelefone).html(eventoNoFor.telefone);
                $(campoTelefoneRecado).html(eventoNoFor.telefone_recado);
                $(campo_valor_evento).html(Number(eventoNoFor.valor_total) - Number(eventoNoFor.valor_desconto) - Number(eventoNoFor.valor_sinal));
                $(campoBrinquedos).attr("id","campo_brinquedos_evento_"+eventoNoFor.id_evento);
                $(campoBrinquedos).html('');
                //laço que exibe brinquedos dentro do evento
                if(eventoNoFor.brinquedos && eventoNoFor.brinquedos.length > 0){
                    eventoNoFor.brinquedos.forEach(function(brinquedo, indice){
                    let celula_icone_brinquedo = $("#brinquedo_individual").clone();
                    $(celula_icone_brinquedo).removeClass("invisible")
                        .removeClass("float")
                        .attr("id","evento_"+eventoNoFor.id_evento+"_icone_brinquedo_"+indice)
                        .appendTo(campoBrinquedos);
                    let nome_brinquedo = celula_icone_brinquedo.find(".nome_brinquedo")[0];
                    let icone_brinquedo = celula_icone_brinquedo.find(".icone_brinquedo")[0];
                    $(nome_brinquedo).html(brinquedo.nome);
                    $(icone_brinquedo).attr("src",caminho_imagens_brinquedos+"/"+removeAcento(brinquedo.nome)+"/miniatura/miniatura_"+brinquedo.imagem);
                    });
                }else{
                    $(campoBrinquedos).html("<span style='margin-left: 1rem;'>Evento ainda sem brinquedos</span>");
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
                switch (eventoNoFor.status){
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
        }else{
            $("#listagemFiltros").html("");
        }  
    }
    
    info_exibicao(mensagem){
        $("#info_exibicao").html(mensagem);
    } 

    rolarParaCamposInvalidos(){
        let campoInvalido = $($(document).find(".is-invalid")[0]).parent().parent().parent().attr("id");
        window.location.href = "#" + campoInvalido;
    }

    exibirClientes(clientes, campoParaExibicao){
        $(campoParaExibicao).html("");
        if(clientes && clientes.length > 0){
            clientes.forEach(function(cliente, indice){
                $("#peleCelulaCliente").clone()
                                    .attr("id","cliente"+indice)
                                    .appendTo(campoParaExibicao)
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

    exibir_form_edicao_cliente(div_clicada){
        $("#janelaDeEdicaoCliente").modal("show");
        let posicao_array_clientes = $(div_clicada.currentTarget).find(".campo_id").attr("indice");
        cliente_em_destaque = ultimo_filtro_clientes[posicao_array_clientes];
        $("#nome_edicao_edicao").val(cliente_em_destaque.nome);
        $("#email_edicao").val(cliente_em_destaque.email);
        $("#cpf_edicao").val(cliente_em_destaque.cpf);
        $("#telefone_edicao").val(cliente_em_destaque.telefone);
        $("#telefone_recado_edicao").val(cliente_em_destaque.telefone_recado);
        $("#logradouro_edicao").val(cliente_em_destaque.logradouro);
        $("#numero_edicao").val(cliente_em_destaque.numero);
        $("#complemento_edicao").val(cliente_em_destaque.complemento);
        $("#bairro_edicao").val(cliente_em_destaque.bairro);
        $("#cidade_edicao").val(cliente_em_destaque.cidade);
        $("#observacao_endereco_edicao").val(cliente_em_destaque.observacao_endereco);
        $("#observacao_cliente_edicao").val(cliente_em_destaque.observacao_cliente);
    }
    fechamentoModalEdicaoCliente(){
        cliente_em_destaque = {};
        $("#nome_edicao_edicao, "+
        "#email_edicao, "+
        "#cpf_edicao, "+
        "#telefone_edicao, "+
        "#telefone_recado_edicao, " +
        "#logradouro_edicao, "+
        "#logradouro_edicao, "+
        "#numero_edicao, "+
        "#complemento_edicao, "+
        "#bairro_edicao, " +
        "#cidade_edicao, "+
        "#cidade_edicao, "+
        "#observacao_endereco_edicao, "+
        "#observacao_cliente_edicao").val("");
    }    
    fecharModalEdicaoCliente(){
        $("#janelaDeEdicaoCliente").modal("hide");
    }
    emitirConfirm(mensagem){
        return confirm(mensagem);
    }
    exibirMensagem(mensagem){
        let snackbar = document.getElementById("snackbar");
        snackbar.innerHTML = mensagem;
        snackbar.className = "show";
        setTimeout(function(){snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    }
    exibirAlert(mensagem){
        alert(mensagem);
    }
    exibir_barra_de_progresso_no_modal(){
        let progresso = $("body").find(".barra_progresso")[0];
        $(progresso).clone().appendTo("#corpoModal").addClass("show").attr("id","progresso_confirmacao");
    }
      
    remover_barra_de_progresso_do_modal(){
        $("#progresso_confirmacao").remove();
    }
    selecionar_botoes_controle_a_serem_exibidos(classe_botao){//evento || brinquedo || cliente
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
    exibirListaBrinquedos(brinquedos){
        this.selecionar_botoes_controle_a_serem_exibidos("brinquedo");
        $("#listagemFiltros").html('');
        if(brinquedos && brinquedos.length > 0){
            brinquedos.forEach(function(brinquedo, indice){
                let div_criada = ($("#divListaBrinquedos").clone()
                                                        .appendTo("#listagemFiltros")
                                                        .attr("id", "brinquedo"+indice)
                                                        .removeClass("invisible")
                                                        .removeClass("float")
                                                        .addClass("lista_todos_brinquedos link_fake"))[0];
                $(div_criada).find(".foto_brinquedo").attr("src", caminho_imagens_brinquedos+"/"+removeAcento(brinquedo.nome_brinquedo)+"/miniatura/miniatura_"+brinquedo.foto_brinquedo);
                $(div_criada).find(".checkbox_brinquedo").attr("id", "checkbox_brinquedo"+indice).attr("id_brinquedo", brinquedo.id_brinquedo).addClass("invisible");
                $(div_criada).find(".nome_brinquedo_troca_brinquedos").html(brinquedo.nome_brinquedo);
                $(div_criada).find(".qtd_disponivel_troca_brinquedos").html(brinquedo.quantidade);
                $(div_criada).find(".id_brinquedo").html(brinquedo.id_brinquedo);
            });
        }     
    }
    telaExibirBrinquedoParaEdicao(brinquedoClicado){
        $("#janelaDeEdicaoBrinquedo").modal("show");
        $("#id_brinquedo_edicao").val(brinquedoClicado.id_brinquedo);
        $("#nome_edicao").val(brinquedoClicado.nome_brinquedo);
        $("#caracteristicas_edicao").val(brinquedoClicado.caracteristicas);
        $("#valor_edicao").val(brinquedoClicado.valor_brinquedo);
        $("#quantidade_edicao").val(brinquedoClicado.quantidade);
        $("#observacao_edicao").val(brinquedoClicado.observacao);     
    }
    fecharModalEdicaoBrinquedo(){
        $("#id_brinquedo_edicao").val("");
        $("#nome_edicao").val("");
        $("#caracteristicas_edicao").val("");
        $("#valor_edicao").val("");
        $("#quantidade_edicao").val("");
        $("#observacao_edicao").val("");
        $("#foto").val("");
    }
    ordemFecharModalEdicaoBrinquedo(){
        $("#janelaDeEdicaoBrinquedo").modal("hide");
    }
    desabilitar_botao_copia(controle){
        $("#botao_copiar_evento").attr("disabled", controle);
    }
    desabilitar_botao_confirmacao(controle){
        $("#botao_confirmar_evento").attr("disabled", controle);
    }
    desabilitar_botao_cancelamento(controle){
        $("#botao_cancelar_evento").attr("disabled", controle);
    }
    desabilitar_botao_reagendamento(controle){
        $("#botao_reagendar_evento").attr("disabled", controle);
    }
    desabilitar_botao_edicao(controle){
        $("#botao_editar_evento").attr("disabled", controle);
    }
    preencherJanelaDeListarCliente(clientes){
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

    executar_no_fechamento_do_modal_evento_em_destaque(){
        if(!$("#rodape_modal_destaque_evento").hasClass("invisible")){
          evento.edicao.desabilitar_edicao_evento();
        }
        evento.reagendamento.desabilitar();
        evento.copiar.desabilitar();
        $("#div_lista_brinquedos_no_evento").html(""); 
        $("#linha_lista_brinquedos").html("");
        //evento_em_destaque = {};
        campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.lista = [];
        lista_brinquedos_disponiveis = [];
        ultimo_filtro_clientes = {};
        cliente_em_destaque = {};
        refazer_ultimo_filtro();
      }
}


var campoBrinquedosNoEventoEmDestaque = {
    campo: $("#container_de_controle_de_brinquedos"),
    brinquedosDoEvento: {
        campo: $("#div_lista_brinquedos_no_evento"),
        titulo: $("#titulo_div_lista_brinquedos_no_evento"),
        lista: [],
        exibir: function(lista){
            if(lista){
                this.lista = lista;
            }else if(evento_em_destaque && evento_em_destaque.brinquedos){
                this.lista = evento_em_destaque.brinquedos;
            }            
            this.campo.html("");
            if(this.lista && this.lista.length > 0){
                this.titulo.html("Brinquedos agendados para o evento "+ evento_em_destaque.id_evento);
                this.lista.forEach(function(brinquedo_no_for,indice){
                    if(brinquedo_no_for.nome){
                        brinquedo_no_for.nome_brinquedo = brinquedo_no_for.nome;
                    }
                    let div_criada = ($("#divListaBrinquedos").clone()
                                                                .appendTo("#div_lista_brinquedos_no_evento")
                                                                .attr("id", "evento_brinquedo"+indice)
                                                                .removeClass("invisible")
                                                                .removeClass("float")
                                                                .addClass("brinquedo_no_evento"))[0];
                    $(div_criada).find(".foto_brinquedo").attr("src", caminho_imagens_brinquedos+"/"+removeAcento(brinquedo_no_for.nome_brinquedo)+"/miniatura/miniatura_"+brinquedo_no_for.foto_brinquedo);
                    $(div_criada).find(".checkbox_brinquedo").attr("id", "checkbox_brinquedo_no_evento"+indice).attr("id_brinquedo", brinquedo_no_for.id_brinquedo).attr("checked", true).hide();
                    $(div_criada).find(".nome_brinquedo_troca_brinquedos").html(brinquedo_no_for.nome_brinquedo);
                    $(div_criada).find(".qtd").addClass("invisible");
                    $(div_criada).find(".id_brinquedo").html(brinquedo_no_for.id_brinquedo);
                });
            }
        },
        selecionarTodos: function(){
            if(!this.lista){
                this.lista = evento_em_destaque.brinquedos;
            }
            this.lista.forEach(function(brinquedo, indice){
                $("#checkbox_brinquedo_no_evento"+indice).show();
                document.getElementById("checkbox_brinquedo_no_evento"+indice).checked = true;
            });                    
        },
        esconderCheckBox: function(){
            if(evento_em_destaque && evento_em_destaque.brinquedos){
                this.lista.forEach(function(brinquedo, indice){
                    $("#checkbox_brinquedo_no_evento"+indice).hide();
                });
            }
        },
        exibirCheckBox: function(){
            if(evento_em_destaque && evento_em_destaque.brinquedos){
                this.lista.forEach(function(brinquedo, indice){
                    $("#checkbox_brinquedo_no_evento"+indice).show();
                });
            }  
        }      
    },
    brinquedosAindaDisponiveis: {
        campo: $("#div_lista_brinquedos_no_evento"),
        titulo: $("#titulo_div_lista_brinquedos_no_evento"),
        exibir: function(brinquedosDisponiveis){
            if(brinquedosDisponiveis.length == 0){
                this.campo.html("");
                campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.titulo.html("");
            }else{
                campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.exibir(brinquedosDisponiveis);
                campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.selecionarTodos();                 
            }
        }
    },
    brinquedosIndisponiveis: {
        campo: $("#div_lista_brinquedos_indisponiveis"),
        titulo: $("#titulo_div_brinquedos_indisponiveis_para_data"),
        lista: [],
        exibir: function(brinquedosIndisponiveis){
            this.lista = brinquedosIndisponiveis;
            this.campo.html("");
            if(this.lista && this.lista.length > 0){
                this.titulo.html("Brinquedos <strong style='color:red'>NÃO</strong> disponíveis nessa data:");
                this.lista.forEach(function(brinquedo_no_for,indice){
                    if(brinquedo_no_for.nome){
                        brinquedo_no_for.nome_brinquedo = brinquedo_no_for.nome;
                    }
                    let div_criada = ($("#divListaBrinquedos").clone()
                                                                .appendTo("#div_lista_brinquedos_indisponiveis")
                                                                .attr("id", "evento_indisponivel"+indice)
                                                                .removeClass("invisible")
                                                                .removeClass("float"));
                    $(div_criada).find(".foto_brinquedo").attr("src", caminho_imagens_brinquedos+"/"+removeAcento(brinquedo_no_for.nome_brinquedo)+"/miniatura/miniatura_"+brinquedo_no_for.foto_brinquedo)
                                                          .css("filter", "grayscale(100%)");
                    $(div_criada).find(".checkbox_brinquedo").attr("id", "checkbox_brinquedo_no_evento"+indice).attr("id_brinquedo", brinquedo_no_for.id_brinquedo).attr("checked", false).hide();
                    $(div_criada).find(".nome_brinquedo_troca_brinquedos").html(brinquedo_no_for.nome_brinquedo);
                    $(div_criada).find(".qtd").addClass("invisible");
                    $(div_criada).find(".id_brinquedo").html(brinquedo_no_for.id_brinquedo);
                });
            }else{
                this.titulo.html("");
            }
        },
        esconder: function(){
            this.campo.html("");
            this.titulo.html("");
        }
    },
    todosOsBrinquedosDisponiveis: {
        campo: $("#linha_lista_brinquedos"),
        titulo: $("#titulo_div_lista_brinquedos_ainda_disponiveis"),
        botao: $("#btn_editar_brinquedos_evento"),
        lista: lista_brinquedos_disponiveis,
        exibir: function(){
            if(evento_em_destaque.data_evento != moment($("#data_destaque_evento")).format("YYYY-MM-DD")){
                this.titulo.html("<center style='color:red'>Escolha dentre os brinquedos vagos para o dia!</center>")
            }
                
            $("#linha_lista_brinquedos").html('');
            if(lista_brinquedos_disponiveis && lista_brinquedos_disponiveis.length > 0){
                lista_brinquedos_disponiveis.forEach(function(brinquedo, indice){
                    let brinquedoJaExisteNoEvento = false;
                    if(evento_em_destaque.brinquedos){
                        evento_em_destaque.brinquedos.forEach(function(brinquedoDoEvento){
                            if(brinquedo.id_brinquedo == brinquedoDoEvento.id_brinquedo){
                                brinquedoJaExisteNoEvento = true;
                                return;
                            }
                        });
                    }                    
                    if(!brinquedoJaExisteNoEvento){
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
                    }
                    //console.log(brinquedo);                   
                });
            }
            this.campo.hide();
            this.botao.show();     
        },
        esconder: function(){
            this.campo.html("");
            this.botao.hide();
            this.titulo.html("");
        },
        botaoTrocaBrinquedos: {
            botao: $("#btn_editar_brinquedos_evento"),
            controleBotao(){
                if($("#janelaDestaqueEvento").find($(".brinquedo_disponivel")).length > 0){
                    campoBrinquedosNoEventoEmDestaque.todosOsBrinquedosDisponiveis.campo.html("");
                    campoBrinquedosNoEventoEmDestaque.todosOsBrinquedosDisponiveis.titulo.html("");
                    this.botao.removeClass("btn-outline-primary");
                    this.botao.addClass("btn-primary");
                }else{
                    $("body").addClass("cursor_progresso");
                    this.botao.removeClass("btn-primary");
                    this.botao.addClass("btn-outline-primary");
                    socket.emit("enviar_brinquedos_vagos", perfil, moment($("#data_destaque_evento").val()).format("YYYY-MM-DD"));
                }
            }
        }        
    },
    capturar_brinquedos_inseridos_no_evento: function(ehCopia){
        let checkbox_brinquedos_do_evento = [];
        //caso esteja sendo executada copia do evento, precisa pegar também brinquedos já presentes nele
        if(ehCopia){
            checkbox_brinquedos_do_evento = $(".container_dos_brinquedos_no_evento").find(".checkbox_brinquedo");
        }
        //capturando os novos brinquedos inseridos no evento
        let checkbox_brinquedos_disponiveis = $(".container_troca_dos_brinquedos").find(".checkbox_brinquedo");
        checkbox_brinquedos_disponiveis = [...checkbox_brinquedos_disponiveis,...checkbox_brinquedos_do_evento];
        let brinquedos_inseridos = [];
        for(let i = 0; i < checkbox_brinquedos_disponiveis.length; i++){
            if($(checkbox_brinquedos_disponiveis[i]).prop("checked")){
                brinquedos_inseridos.push($(checkbox_brinquedos_disponiveis[i]).attr("id_brinquedo"));
            }
        }
        return brinquedos_inseridos;
    },
    capturar_brinquedos_retirados_do_evento: function(){
        //capturando os brinquedos retirados do evento
        let checkbox_brinquedos_no_evento = $(".container_dos_brinquedos_no_evento").find(".checkbox_brinquedo");
        let brinquedos_retirados = [];
        for(let i = 0; i < checkbox_brinquedos_no_evento.length; i++){
            if(!$(checkbox_brinquedos_no_evento[i]).prop("checked")){
                brinquedos_retirados.push($(checkbox_brinquedos_no_evento[i]).attr("id_brinquedo"));
            }
        }
        return brinquedos_retirados;
    },
    retirar_brinquedos_indisponiveis: function(brinquedos_retirados){
        if(!brinquedos_retirados){
            brinquedos_retirados = [];
        }
        //retira os brinquedos selecionados originalmente, mas que não estão disponíveis na nova data
        if(evento_em_destaque.brinquedos && this.brinquedosIndisponiveis.lista && evento_em_destaque.brinquedos.length > 0 && this.brinquedosIndisponiveis.lista.length > 0){
            evento_em_destaque.brinquedos.forEach((brinquedoNoEvento) => {
                this.brinquedosIndisponiveis.lista.forEach((brinquedoIndisponivel) => {
                    if(brinquedoNoEvento.id_brinquedo == brinquedoIndisponivel.id_brinquedo){
                        brinquedos_retirados.push(brinquedoNoEvento.id_brinquedo);
                    }
                    return;
                });
            });
        }
        
        return brinquedos_retirados;
    }
}

var perfil = "";
var ultimo_filtro_eventos = {};
var nome_do_ultimo_filtro_utilizado;
var evento_em_destaque = {};
var lista_brinquedos_disponiveis = [];
var brinquedo_em_destaque = {};
var ultimo_filtro_clientes = {};
var cliente_em_destaque = {
    nome: ''
};
var ultimo_filtro_brinquedos = {};
var caminho_imagens_brinquedos = "imagens/brinquedos/";
var tela = new Tela();
if(typeof tela === undefined){
    
}
    

