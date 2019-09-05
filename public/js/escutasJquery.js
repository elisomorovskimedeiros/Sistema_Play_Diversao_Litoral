var perfil;

$(document).ready(function(){ 
    perfil = $("body").attr("perfil");

    //usando em:
    //listarCliente.ejs, inserirEvento.ejs
    $("#data, #nome, #logradouro, #cidade").on("keyup change paste input", function(){
        let data = $("#data").val();
        let nome= $("#nome").val();
        let logradouro = $("#logradouro").val();
        let cidade = $("#cidade").val();
        //se todos os campos estiverem vazios, a div listaClientes é limpa
        if(nome.length < 3 &&
            logradouro.length < 3 &&
            cidade.length < 3 &&
            data.length < 10){
                $("#listaClientes").html('');
        }else{
            filtrarClientes(nome, data, logradouro, cidade);
        };        
    });

    //Listar todos os clientes
    //usado em:
    //listarCliente.ejs
    $("#listar-todos-clientes").click(function(){
        document.getElementById("listaClientes").innerHTML = '';
        let filtroCliente = {
            nome : "", 
            data : "",
            logradouro : "",
            cidade : ""
        }
        $("#nome").val(""); 
        $("#data").val("");
        $("#logradouro").val("");
        $("#cidade").val("");
        socket.emit("filtroCliente", filtroCliente, perfil);
    });

    //preenche janela de edição do cliente
    //usado em: listarClientes.ejs => editar
    $(document).on("click", "#btnEditarCliente", function(origemClick){
        let idCliente = origemClick.target.value;
        
        clientesGlobal.forEach(cliente => {
            if(cliente.id_cliente == idCliente){

                $("#id_cliente_edicao").val(cliente.id_cliente);
                $("#nome_edicao_edicao").val(cliente.nome);
                $("#cpf_edicao").val(cliente.cpf);
                $("#logradouro_edicao").val(cliente.logradouro);
                $("#numero_edicao").val(cliente.numero);
                $("#complemento_edicao").val(cliente.complemento);
                $("#observacao_endereco_edicao").val(cliente.observacao_endereco);
                $("#bairro_edicao").val(cliente.bairro);
                $("#cidade_edicao").val(cliente.cidade);
                $("#telefone_edicao").val(cliente.telefone);
                $("#telefone_recado_edicao").val(cliente.telefone_recado);
                $("#email_edicao").val(cliente.email);
                $("#observacao_cliente_edicao").val(cliente.observacao_cliente);
            }
        });        
    });

    //SUBMIT da edição do cliente //SAIU DE USO, ESSA FUNÇÃO É EXECUTADA VIA SOCKETIO
    //usado em: listarClientes.ejs => editar
    $('#form-cliente').submit(function(){
        let id = $("#id"), nome = $("#nome").val(), endereco = $("#logradouro").val(), cidade = $("#cidade").val(), dia = $("#data").val();
        /*let filtroCliente = {
            nome : nome, 
            data : dia,
            logradouro : endereco,
            cidade : cidade
        }*/
        var dados = $( this ).serialize();        
        $.ajax({
            type: "POST",
            url: "/editarCliente",
            data: dados,
            success: function( data )
            {
                $("#fecharModal").trigger("click");
                alert(data);
                $("#nome").val(nome), $("#logradouro").val(endereco), $("#cidade").val(cidade), $("#data").val(dia);
                filtrarClientes(nome,dia,endereco,cidade);//realiza nova busca de clientes com o mesmo filtro da última 
                //socket.emit("filtroCliente", filtroCliente, perfil);//realiza nova busca de clientes com o mesmo filtro da última                   
            }
        });

        return false;
    });
    
    //SUBMIT da exclusão do cliente //SAIU DE USO, ESSA FUNÇÃO É EXECUTADA VIA SOCKETIO
    //usado em: listarClientes.ejs => editar => excluir
    $('#form-excluir-cliente').submit(function(){
        var nome = $("#nome").val(), endereco = $("#logradouro").val(), cidade = $("#cidade").val(), dia = $("#data").val();
        var dados = $( this ).serialize();
        $.ajax({
            type: "POST",
            url: "/excluirCliente",
            data: dados,
            success: function( data )
            {
                $("#fecharModalExcluir").trigger("click");
                alert(data);
                $("#nome").val(nome), $("#logradouro").val(endereco), $("#cidade").val(cidade), $("#data").val(dia);
                //filtrarClientes(nome,dia,endereco,cidade);//realiza nova busca de clientes com o mesmo filtro da última                           
            }
        });

        return false;
    });

    //SUBMIT da iserção do cliente
    //usado em: inserirClientes.ejs
    $('#form-inserir-cliente').submit(function(){
        var dados = $( this ).serialize();        
        $.ajax({
            type: "POST",
            url: "/inserirCliente",
            data: dados,
            success: function( data )
            {   
                emitirAviso(data, "snackbar", 3000);
                setTimeout(function() {
                    window.location.href = "/inserirCliente";
                }, 3100);                
            }
        });
        return false;
    });

/*
    //SUBMIT da edição de brinquedo
    //usado em: listarBrinquedo.ejs => editar
    $('#form-editar-brinquedo').submit(function(){
        console.log("submit");
        var dados = $( this ).serialize();

        $.ajax({
            type: "POST",
            url: "/editarBrinquedo",
            data: dados,
            success: function( data )
            {
                console.log(data);
                $("#fecharModalExcluir").trigger("click");
                if(!data.status){
                    alert("Ocorreu um erro na edição");
                    console.log(data.sqlMessage);
                    console.log(data.sql);
                }else{
                    alert("Edição Ok!!");
                }                    
                window.location.href = "/listarTodosBrinquedos";//lista todos os brinquedos novamente       
            }
        });

        return false;
    });     
*/
    //emite o status da inserção de um novo brinquedo
    //usado em: inserirBrinquedo.ejs 
    if($("#resposta_insercao_brinquedo").length && $("#resposta_insercao_brinquedo").val() != ''){
        emitirAviso($("#resposta_insercao_brinquedo").val(), "snackbar", 3000);
    }

    //EDIÇÃO DE CLIENTE, usa socketio para envio e recebimento dos dados
    $("#btnEnviarEdicaoCliente").click(function(){
        let cliente = {
            id_cliente: $("#id_cliente_edicao").val(),
            nome: $("#nome_edicao_edicao").val(),
            cpf: $("#cpf_edicao").val(),
            logradouro: $("#logradouro_edicao").val(),
            numero: $("#numero_edicao").val(),
            complemento: $("#complemento_edicao").val(),
            observacao_endereco: $("#observacao_endereco_edicao").val(),
            bairro: $("#bairro_edicao").val(),
            cidade: $("#cidade_edicao").val(),
            telefone: $("#telefone_edicao").val(),
            telefone_recado: $("#telefone_recado_edicao").val(),
            email: $("#email_edicao").val(),
            observacao_cliente: $("#observacao_cliente_edicao").val()
        }
        //teste de campos importantes vazios
        if(cliente.nome.length == 0 ||
           cliente.cpf.length == 0 ||
           cliente.logradouro.length == 0 ||
           cliente.cidade.length == 0 ||
           cliente.telefone.length == 0){
               emitirAviso("Por favor preenha os itens circulados em vermelho","snackbar", 5000 );
           }else{
               socket.emit("editarCliente", cliente, perfil);
               $("#fecharModal").trigger("click");
               $("#nome").trigger("change");//change realizado só para a tela atualizar    
           }//resultado da edição de cliente em escutasSocketIO => resultadoEdicaoCliente
    });

    //EXCLUSÃO DE CLIENTE, usa socketio para envio e recebimento dos dados
    $(document).on("click", "#btn_excluir_cliente", function(botao){
        let idCliente = botao.target.value;
        console.log(idCliente);
        console.log(perfil);
        socket.emit("listarEventosPorIdCliente", idCliente, perfil);
        $("#btnExcluirCliente").val(idCliente); 
    });    

    //EXCLUSÃO DE CLIENTE, usa socketio para envio e recebimento dos dados
    //usado em:
        //listarCliente.ejs => excluirCliente
    $("#btnExcluirCliente").click(function(origemClick){      
        let idCliente = origemClick.target.value;
        socket.emit("excluirCliente", idCliente, perfil);
        $("#fecharModalExcluir").trigger("click");
        $("#nome").trigger("change");//change realizado só para a tela atualizar    
    });//resultado da exclusão de cliente em escutasSocketIO => resultadoExclusaoCliente    

    //LISTAGEM DE BRINQUEDOS
    //usado em: listarBrinquedos.ejs
    $("#nome_brinquedo").keyup(function(){
        //caso o campo nome_brinquedo tenha mais de dois caracteres, é feita a busca no bd, caso contrário a lista é mantida vazia.
        //essa função é utilizada pela página listarBrinquedos
        if($("#nome_brinquedo").val().length > 2){
            //função que recebe no escutasSocketIO.js: "mandarBrinquedos"
            socket.emit("listaBrinquedosPorNome",$("#nome_brinquedo").val(), perfil);
        }else{
            document.getElementById("listaBrinquedos").innerHTML = '';
        }
    });
    
    $("#btn_iserir_brinquedos_no_evento").click(function(){
        inserirBrinquedosNoEvento();
    });

    $("#nome_cliente_tela_evento").keyup(function(){
        if ($("#nome_cliente_tela_evento").val().length > 2) {
            filtrarEventos();
        }else{//caso tenha menos de dois caracteres no input text #nome_cliente_tela_evento, mantenha a div #listaClientes vazia
            $("#listaClientes").wrapInner("");
        }      
    });

    //Controle da div que exibe a lista de brinquedos para cada evento na janela de edição
    $("#exibirListaBrinquedos").click(function(){
        if($("#listaBrinquedos").hasClass("naoMostrar")){
            $("#listaBrinquedos").removeClass("naoMostrar");
        }else{
            $("#listaBrinquedos").addClass("naoMostrar");
        }        
    });

    $("#valor_total, #valor_sinal, #valor_desconto").keyup(function(){        
        let valor = $("#valor_total").val() - $("#valor_sinal").val() - $("#valor_desconto").val();
        $("#receber_no_ato").val(valor);
    });   
    

    //Código muito sinistro que suaviza o scroll ## retirado de: https://www.origamid.com/codex/scroll-suave-para-link-interno/
    $('.scrollSuave').on('click', function(e) {
        e.preventDefault();
        var id = $(this).attr('href'),
                targetOffset = $(id).offset().top;
                
        $('html, body').animate({ 
            scrollTop: targetOffset - 0
        }, 1000);
    });

 //edição dos eventos
    $('#form-editar-evento').submit(function(){
        var dados = $( this ).serialize();

        $.ajax({
            type: "POST",
            url: "/editarEvento",
            data: dados,
            success: function( data )
            {
                $("#fecharModalEditar").trigger("click");
                if(!data.status){
                    alert("Ocorreu um erro na edição");
                    console.log(data.sqlMessage);
                    console.log(data.sql);
                }else{
                    alert("Edição Ok!!");
                }                    
                window.location.href = "/listarEvento";//lista todos os brinquedos novamente       
            }
        });
        return false;
    });
    
    //listagem de brinquedos na janela de inserção de evento

    $("#listarBrinquedos").click(function(){
        socket.emit("listaBrinquedosDisponiveis", undefined);//retornará em escutasSocketIO => envioListaBrinquedos
    });

    $("#selecionarBrinquedos").click(function(){
        //console.log($("#listaBrinquedos").children()[0].childNodes);
        let nodes = $("input[id='selBrinquedo']:checked");//pega só quem está checado
        let brinquedos = '';
        for(let i = 0; i < nodes.length; i++){
            brinquedos += (nodes[i].attributes.id_brinquedo.value);
            if(i < nodes.length - 1){
                brinquedos += ',';
            }           
        }    
        $("#listaBrinquedosInseridos").val(brinquedos);  
    });
});