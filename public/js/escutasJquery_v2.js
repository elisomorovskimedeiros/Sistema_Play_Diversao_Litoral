$(document).ready(function(){ 
    perfil = $("body").attr("perfil");    

    //solicita consulta inicial no bd
    if(window.location.pathname === "/"){
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
    $(".botaoControle").mouseover(function(e){
        posicao = {
            x: e.pageX,
            y: e.pageY
        }
        let elementoAManipular = $(this).find('.escondida');     
        elementoAManipular.css("top",posicao.y-100);
        elementoAManipular.css("left",posicao.x-100);
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
        evento_em_destaque = ultimo_filtro_eventos[posicao_array_eventos];
        let status_evento = evento.controle_status_evento(evento_em_destaque.status); //troca o código númérico do status por uma string com seu significado
        
        $("#titulo_modal_destaque_evento").html("Evento " + evento_em_destaque.id_evento);
        $("#status_evento_em_destaque").html(status_evento);
        $("#nome_cliente_destaque_evento").val(evento_em_destaque.nome_cliente);
        $("#telefone_destaque_evento").val(evento_em_destaque.telefone);
        $("#telefone_alternativo_destaque_evento").val(evento_em_destaque.telefone_alternativo);
        $("#email_destaque_evento").val(evento_em_destaque.email);
        $("#data_destaque_evento").val(moment(evento_em_destaque.data_evento).format("YYYY-MM-DD"));
        $("#hora_destaque_evento").val(moment(evento_em_destaque.data_evento).format("HH:mm"));
        $("#email_destaque_evento").val(evento_em_destaque.email);
        $("#logradouro_destaque_evento").val(evento_em_destaque.logradouro_evento);
        $("#numero_destaque_evento").val(evento_em_destaque.numero_evento);
        $("#complemento_destaque_evento").val(evento_em_destaque.complemento_evento);
        $("#observacao_endereco_destaque_evento").val(evento_em_destaque.observacao_endereco_evento);
        $("#bairro_destaque_evento").val(evento_em_destaque.bairro_evento);
        $("#cidade_destaque_evento").val(evento_em_destaque.cidade_evento);
        $("#valor_total_destaque_evento").val(evento_em_destaque.valor_total);
        $("#valor_desconto_destaque_evento").val(evento_em_destaque.valor_desconto);
        $("#valor_sinal_destaque_evento").val(evento_em_destaque.valor_sinal);
        $("#receber_no_ato_destaque_evento").val(evento_em_destaque.valor_total - evento_em_destaque.valor_desconto - evento_em_destaque.valor_sinal);
        $("#observacao_destaque_evento").val(evento_em_destaque.observacao_evento);
        $("#abrigo_destaque_evento").val(evento_em_destaque.abrigo);
        $("#lista_brinquedos_destaque_evento").val(evento_em_destaque.brinquedos);
        socket.emit("brinquedos_no_evento", evento_em_destaque.id_evento, perfil); //resposta em "lista_brinquedos_do_evento"
        $("body").addClass("cursor_progresso");

        //utilizado para facilitar a manipulação direta dos dados do cliente.
        cliente_em_destaque.nome = evento_em_destaque.nome_cliente;
        cliente_em_destaque.id_cliente = evento_em_destaque.id_cliente;
        cliente_em_destaque.logradouro = evento_em_destaque.logradouro_cliente;
        cliente_em_destaque.numero = evento_em_destaque.numero_cliente;
        cliente_em_destaque.cidade = evento_em_destaque.cidade_cliente;
        cliente_em_destaque.bairro = evento_em_destaque.bairro_cliente;
        cliente_em_destaque.complemento = evento_em_destaque.complemento_endereco_cliente;
        cliente_em_destaque.observacao_endereco = evento_em_destaque.observacao_endereco_cliente;
        cliente_em_destaque.telefone = evento_em_destaque.telefone;
        cliente_em_destaque.telefone_recado = evento_em_destaque.telefone_recado;

        if(evento_em_destaque.status == 2){//evento cancelado
            $("#botao_cancelar_evento").attr("disabled", true);
            $("#texto_botao_confirmar_evento").html("Reconfirmar");
        }else{
            $("#botao_cancelar_evento").attr("disabled", false);
            $("#texto_botao_confirmar_evento").html("Confirmar Evento");
        }
    });

    $("#botao_editar_evento").click(function(){
        evento.edicao.controle();
    });

    $("#janelaDestaqueEvento").on("hide.bs.modal", function(){
        tela.executar_no_fechamento_do_modal_evento_em_destaque();     
    });

    $("#btn_editar_brinquedos_evento").click(function(){
        campoBrinquedosNoEventoEmDestaque.todosOsBrinquedosDisponiveis.botaoTrocaBrinquedos.controleBotao();
    });

    $("#btnEnviarEdicaoEvento").click(function(){
        evento.edicao.executar();
    });

    $("#botao_trocar_cliente").click(function(){
        let backup_evento_em_destaque = evento_em_destaque;
        let backup_lista_brinquedos_disponiveis = lista_brinquedos_disponiveis;
        let backup_brinquedos_do_evento_em_destaque = evento_em_destaque.brinquedos;        
        $("#janelaDestaqueEvento").modal("hide");
        
        window.setTimeout(function(){
            $("#janela_troca_cliente_no_evento").modal("show");
        }, 500);  
        evento_em_destaque = backup_evento_em_destaque;
        lista_brinquedos_disponiveis = backup_lista_brinquedos_disponiveis;
        if(backup_brinquedos_do_evento_em_destaque){
            campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.lista = backup_brinquedos_do_evento_em_destaque;
        }else{

        }
            campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.lista = [];

        console.log("brinquedos evento em destaque ao escolher cliente");
        console.log(campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.lista);
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
        campoBrinquedosNoEventoEmDestaque.brinquedosDoEvento.exibir();
        evento.edicao.habilitar_edicao_evento();        
        //tela.exibir_brinquedos_disponiveis_dentro_do_evento_em_destaque();
        $("#nome_cliente_no_evento, #logradouro_cliente_no_evento, #cidade_cliente_no_evento, #data_cliente_no_evento").val('');
        $("#listaClientes").html("");
    });

    $("#janela_troca_cliente_no_evento").on("show", function () {
        $("body").addClass("modal-open");
    });

    //seleção do novo cliente para o evento
    $(document).on("click",".celula_cliente", function(div_clicada){
        if($(div_clicada.currentTarget).parent().parent().attr("id") === "listaClientes"){
            cliente.inserirClienteNoEvento(div_clicada);            
            
        }else if($(div_clicada.currentTarget).parent().parent().attr("id") === "listagemFiltros"){
            tela.exibir_form_edicao_cliente(div_clicada);
        }
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
        evento.confirmarEvento();
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
       
        evento.filtrar_evento_por_data(data_inicio, data_fim);
        
    });

    $("#botao_cancelar_evento").click(function(){
        cancelar_evento(evento_em_destaque.id_evento);
    });

    $("#botao_reagendar_evento").click(function(){
        evento.reagendamento.controle();
    });

    $("#btnEnviarReagendamentoEvento").click(function(){
        editar_evento();
    });

    $("#botao_copiar_evento").click(function(){
        evento.copiar.controle();
    });

    $("#data_destaque_evento").change(function(e){
        let data = $(e.currentTarget).val();
        brinquedo.enviar_brinquedos_vagos_na_data(data);
    });

    $("#btn_concluir_copia_evento").click(function(){
        evento.copiar.efetivarCopia();        
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
        cliente.janelaInserirCliente();
    });

    $("#procurarCliente").on("change paste input", function(e){
        let filtroDeBusca = $("#procurarCliente").val();
        if(filtroDeBusca.length > 0){
            cliente.procurarCliente(filtroDeBusca);
        }        
    });

    $("#janelaDeEdicaoCliente").on("hide.bs.modal", function(){
        tela.fechamentoModalEdicaoCliente();
    });

    $("#btnEnviarEdicaoCliente").click(function(){
        cliente.editarCliente();
    });

    $("#btn_exluir_cliente").click(function(){ 
        cliente.clienteASerRemovido = cliente_em_destaque;       
        socket.emit("listarEventosPorIdCliente", cliente_em_destaque.id_cliente, perfil);
    });

    //retirar o bug que faz com que seja necessário dar dois cliques no cliente
    $("#listagemFiltros").hover(function(){
        $("#procurarCliente").blur();
    });

    //#################################################################
    //BRINQUEDOS
    $("#adicionarBrinquedo").click(function(){
        brinquedo.janelaInserirBrinquedo();
    });

    //vou aproveitar a rota http que já existe   
    $(document).on("submit","#form-inserir-brinquedo",function(){
        var dados = new FormData(this);
        return brinquedo.inserirNovoBrinquedo(dados);        
    });

    $("#botao_listar_todos_brinquedos").click(function(){
        brinquedo.listarTodos();
    });

    $(document).on("submit","#form-inserir-cliente",function(){
        var dados = $(this).serialize();
        return cliente.inserirNovoCliente(dados);
    });
    //abrir modal edição brinquedo
    $(document).on("click", ".lista_todos_brinquedos", function(e){
        brinquedo.telaExibirBrinquedoParaEdicao(e.currentTarget);        
    });

    $("#form-brinquedo").submit(function(){
        var dados = new FormData(this);
        return brinquedo.editarBrinquedo(dados);
    });

    $("#janelaDeEdicaoBrinquedo").on("hide.modal.bs", function(){
        tela.fecharModalEdicaoBrinquedo();
    });
});


