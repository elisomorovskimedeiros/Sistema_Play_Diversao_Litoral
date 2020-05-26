$(document).ready(function(){ 
    perfil = $("body").attr("perfil");

    //solicita consulta inicial no bd
    if(window.location.pathname === "/teste_v2"){
        if(nome_do_ultimo_filtro_utilizado){
            socket.emit(nome_do_ultimo_filtro_utilizado, perfil);
        }else{
            socket.emit("proximos_eventos", perfil);
            nome_do_ultimo_filtro_utilizado = "proximos_eventos";
        }        
    };

    //exibe e esconde divs de opções no sidebar
    $(".botaoControleExibicao").click(function(){
        let elementoAManipular = $(this).parent().parent().find('[class="caixaOpcoes"]');
        elementoAManipular.toggle(500);
    });

    //exibe ajuda sobre a função de cada ícone
    $(".botaoControle").mouseover(function(){
        let posicao = $(document).mousemove(function(e){
            return {x: e.pageX, y: e.pageY};
        });
        let elementoAManipular = $(this).find('.escondida');     
        elementoAManipular.css("top",posicao.y);
        elementoAManipular.css("left",posicao.x);
        elementoAManipular.css("display","block");
    });

    //esconde a ajuda sobre a função de cada ícone
    $(".botaoControle").mouseout(function(){
        $(document).off("mousemove");
        let elementoAManipular = $(this).find('.escondida');
        elementoAManipular.css("display","none");
    });
    
    $("body").on("click", ".celulaEvento", function(celula){
        let posicao_array_eventos = $(celula.currentTarget).attr("id");
        let evento = ultimo_filtro_eventos[posicao_array_eventos];
        let status_evento = funcao_status_evento(evento.status); //troca o código númérico do status por uma string com seu significado
        evento_em_destaque = evento;
        $("#titulo_modal_destaque_evento").html("Evento " + evento.id_evento);
        $("#status_evento_em_destaque").html(status_evento);
        $("#nome_cliente_destaque_evento").val(evento.nome_cliente);
        $("#telefone_destaque_evento").val(evento.telefone);
        $("#telefone_alternativo_destaque_evento").val(evento.telefone_alternativo);
        $("#email_destaque_evento").val(evento.email);
        $("#data_destaque_evento").val(moment(evento.data_evento).format("YYYY-MM-DD"));
        $("#hora_destaque_evento").val(moment(evento.data_evento).format("HH:mm"));
        $("#email_destaque_evento").val(evento.email);
        $("#logradouro_destaque_evento").val(evento.logradouro_evento);
        $("#numero_destaque_evento").val(evento.numero_evento);
        $("#complemento_destaque_evento").val(evento.complemento_evento);
        $("#observacao_endereco_destaque_evento").val(evento.observacao_endereco_evento);
        $("#bairro_destaque_evento").val(evento.bairro_evento);
        $("#cidade_destaque_evento").val(evento.cidade_evento);
        $("#valor_total_destaque_evento").val(evento.valor_total);
        $("#valor_desconto_destaque_evento").val(evento.valor_desconto);
        $("#valor_sinal_destaque_evento").val(evento.valor_sinal);
        $("#receber_no_ato_destaque_evento").val(evento.valor_total - evento.valor_desconto - evento.valor_sinal);
        $("#observacao_destaque_evento").val(evento.observacao_evento);
        $("#abrigo_destaque_evento").val(evento.abrigo);
        $("#lista_brinquedos_destaque_evento").val(evento.brinquedos);
        socket.emit("brinquedos_no_evento", evento.id_evento, perfil);
        $("body").addClass("cursor_progresso");

        //utilizado para facilitar a manipulação direta dos dados do cliente.
        cliente_em_destaque.nome = evento.nome_cliente;
        cliente_em_destaque.id_cliente = evento.id_cliente;
        cliente_em_destaque.logradouro = evento.logradouro_cliente;
        cliente_em_destaque.numero = evento.numero_cliente;
        cliente_em_destaque.cidade = evento.cidade_cliente;
        cliente_em_destaque.bairro = evento.bairro_cliente;
        cliente_em_destaque.complemento = evento.complemento_endereco_cliente;
        cliente_em_destaque.observacao_endereco = evento.observacao_endereco_cliente;
        cliente_em_destaque.telefone = evento.telefone;
        cliente_em_destaque.telefone_recado = evento.telefone_recado;

        if(evento.status == 2){//evento cancelado
            $("#botao_cancelar_evento").attr("disabled", true);
            $("#texto_botao_confirmar_evento").html("Reconfirmar");
        }else{
            $("#botao_cancelar_evento").attr("disabled", false);
            $("#texto_botao_confirmar_evento").html("Confirmar Evento");
        }

    });

    $("#botao_editar_evento").click(function(){
        if($("#botao_editar_evento").hasClass("btn-outline-primary")){
            habilitar_edicao_evento();
        }else{
            desabilitar_edicao_evento();
        }
    });

    $("#janelaDestaqueEvento").on("hide.bs.modal", function(){
        executar_no_fechamento_do_modal();     
    });

    $("#btn_editar_brinquedos_evento").click(function(){
        if($("#janelaDestaqueEvento").find($(".brinquedo_disponivel")).length > 0){
            $("#linha_lista_brinquedos").html("");
        }else{
            $("body").addClass("cursor_progresso");
            socket.emit("enviar_brinquedos_vagos", perfil, evento_em_destaque.data_evento);
        }        
    });

    $("#btnEnviarEdicaoEvento").click(function(){
        editar_evento();
    });
/*
    $("#botao_trocar_cliente").click(function(){
        $("#teste").addClass("janelaModal").removeClass("invisible");
        
    });
    $("body").click(function(e){
        if(e.target.id != "teste" && $("#teste").hasClass("janelaModal")){

            $("#teste").removeClass("janelaModal").addClass("invisible");
        }else{
            console.log($("#teste").hasClass("janelaModal"));
            
        }
    });*/

   

    $("#botao_trocar_cliente").click(function(){
        let backup_evento_em_destaque = evento_em_destaque;
        let backup_lista_brinquedos_disponiveis = lista_brinquedos_disponiveis;
        let backup_brinquedos_do_evento_em_destaque = brinquedos_do_evento_em_destaque;
        
        $("#janelaDestaqueEvento").modal("hide");
        
        window.setTimeout(function(){
            $("#janela_troca_cliente_no_evento").modal("show");
        }, 500);  
        evento_em_destaque = backup_evento_em_destaque;
        lista_brinquedos_disponiveis = backup_lista_brinquedos_disponiveis;
        brinquedos_do_evento_em_destaque = backup_brinquedos_do_evento_em_destaque;
    });

    //pegar digitação nos campos da seleção do cliente para o evento já existente
    $("#nome_cliente_no_evento, #logradouro_cliente_no_evento, #cidade_cliente_no_evento").on("keyup change paste input", function(e){
        let nome= $("#nome_cliente_no_evento").val();
        let logradouro = $("#logradouro_cliente_no_evento").val();
        let cidade = $("#cidade_cliente_no_evento").val();
        let data = $("#data_cliente_no_evento").val();
        if(data){
            data = moment(data).format("YYYY-MM-DD");
        }
        //se todos os campos estiverem vazios, a div listaClientes é limpa
        if(nome.length < 3 &&
            logradouro.length < 3 &&
            cidade.length < 3 &&
            data.length < 10){
                $("#listaClientes").html('');
        }else{
            filtroCliente = {
                nome : nome, 
                data : data,
                logradouro : logradouro,
                cidade : cidade
            }
            socket.emit("filtroCliente", filtroCliente, perfil);//resposta vem no escutasSocketIO => mandarClientes
        };
        //tira o foco do campo utilizando para filtro
        setTimeout(function(){
            $(e.currentTarget).blur();
        },1500);        
    });

    $("#janela_troca_cliente_no_evento").on("hide.bs.modal", function(){
        window.setTimeout(function(){
            $("#janelaDestaqueEvento").modal('show');
        }, 500);
        exibir_brinquedos_do_evento_em_destaque();
        habilitar_edicao_evento();        
        exibir_brinquedos_disponiveis_dentro_do_evento_em_destaque();
        $("#nome_cliente_no_evento, #logradouro_cliente_no_evento, #cidade_cliente_no_evento, #data_cliente_no_evento").val('');
        $("#listaClientes").html("");
    });

    $("#janela_troca_cliente_no_evento").on("show", function () {
        $("body").addClass("modal-open");
    });

    //seleção do novo cliente para o evento
    $(document).on("click",".celula_cliente", function(div_clicada){
        let posicao_array_clientes = $(div_clicada.currentTarget).find(".campo_id").attr("indice");
        cliente_em_destaque = ultimo_filtro_clientes[posicao_array_clientes];
        console.log(posicao_array_clientes);
        $("#nome_cliente_destaque_evento").val(cliente_em_destaque.nome);
        $("#telefone_destaque_evento").val(cliente_em_destaque.telefone);
        $("#telefone_alternativo_destaque_evento").val(cliente_em_destaque.telefone_recado);
        $("#email_destaque_evento").val(cliente_em_destaque.email);
        $("#janela_troca_cliente_no_evento").modal("hide");
        $("#nome_cliente_destaque_evento").val(cliente_em_destaque.nome);
        ultimo_filtro_clientes = {};
    });

    $("#copia_endereco_cliente").click(function(){
        evento_em_destaque.nome_cliente = cliente_em_destaque.nome;
        evento_em_destaque.id_cliente = cliente_em_destaque.id_cliente;
        evento_em_destaque.logradouro_cliente = cliente_em_destaque.logradouro;
        evento_em_destaque.logradouro_evento = cliente_em_destaque.logradouro;
        evento_em_destaque.numero_cliente = cliente_em_destaque.numero;
        evento_em_destaque.numero_evento = cliente_em_destaque.numero;
        evento_em_destaque.bairro_cliente = cliente_em_destaque.bairro;
        evento_em_destaque.bairro_evento = cliente_em_destaque.bairro;
        evento_em_destaque.cidade_cliente = cliente_em_destaque.cidade;
        evento_em_destaque.cidade_evento = cliente_em_destaque.cidade;
        evento_em_destaque.complemento_endereco_cliente = cliente_em_destaque.complemento;
        evento_em_destaque.complemento_evento = cliente_em_destaque.complemento;
        evento_em_destaque.observacao_endereco_cliente = cliente_em_destaque.observacao_endereco;
        evento_em_destaque.observacao_endereco_evento = cliente_em_destaque.observacao_endereco;
        evento_em_destaque.telefone = cliente_em_destaque.telefone;
        evento_em_destaque.telefone_recado = cliente_em_destaque.telefone_recado;
        $("#logradouro_destaque_evento").val(evento_em_destaque.logradouro_evento);
        $("#numero_destaque_evento").val(evento_em_destaque.numero_evento);
        $("#complemento_destaque_evento").val(evento_em_destaque.complemento_evento);
        $("#observacao_endereco_destaque_evento").val(evento_em_destaque.observacao_endereco_evento);
        $("#bairro_destaque_evento").val(evento_em_destaque.bairro_evento);
        $("#cidade_destaque_evento").val(evento_em_destaque.cidade_evento);
    });

    $("#botao_confirmar_evento").click(function(){
        confirmarEvento();
    });
    
    //exibir brinquedos vagos na data selecionada
    $("#botaoBuscarBrinquedosVagosPorData").click(function(){
        let data = $("#buscarBrinquedosVagosPorData").val();
        if(data !== ''){
            socket.emit("buscarBrinquedosVagosPorData", {data, perfil});
        }
        nome_do_ultimo_filtro_utilizado = "buscarBrinquedosVagosPorData";
    });

    //exibe os eventos dos próximos 15 dias
    $("#btn_proximos_eventos").click(function(){
        socket.emit("proximos_eventos", perfil);
        nome_do_ultimo_filtro_utilizado = "proximos_eventos";
    });

    //busca evento por intervalo de datas ou por uma data especifica colocada nos campos "de" ou "ate"
    $("#iniciarBuscaPorData").click(function(){

        let data_inicio = $("#de").val();
        let data_fim = $("#ate").val();
       
        pedir_evento_por_data(data_inicio, data_fim);
        
    });

    $("#botao_cancelar_evento").click(function(){
        cancelar_evento(evento_em_destaque.id_evento);
    });

    $("#botao_reagendar_evento").click(function(){
        reagendar_evento();
    });

    $("#btnEnviarReagendamentoEvento").click(function(){
        editar_evento();
    });

    $("#botao_copiar_evento").click(function(){
        if($("#botao_copiar_evento").hasClass("btn-outline-warning")){
            habilitar_copia_do_evento();
        }else{
            desabilitar_copia_do_evento();
        }
    });

    $("#data_destaque_evento").change(function(e){
        let data = $(e.currentTarget).val();
        enviar_brinquedos_vagos_na_data(data);
    });

    $("#btn_concluir_copia_evento").click(function(){
        copiar_evento();
        desabilitar_copia_do_evento();
    });

    $("#adicionarEvento").click(function(){
        window.open("/inserirEvento");
    });

    //filtro de eventos por id, nome cliente ou endereço do evento
    $("#procurarEvento").on("change paste input", function(){
        socket.emit("buscaEvento", perfil, $("#procurarEvento").val());
    });

    //#################################################################
    //CLIENTES
    $("#adicionarCliente").click(function(){
        window.open("/inserirCliente");
    });


    //#################################################################
    //BRINQUEDOS
    $("#adicionarBrinquedo").click(function(){
        brinquedo.janelaInserirBrinquedo();
    });
});