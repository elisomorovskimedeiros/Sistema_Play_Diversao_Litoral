//inicialização do socketIO
var socket = io("/");
var clientesGlobal;


//função que envia ao servidor a requisição para envio da lista de clientes disponível no bd
function solicitarListaClientes(){
    //caso o campo nome_cliente tenha mais de dois caracteres, é feita a busca no bd, caso contrário a lista é mantida vazia.
    let nomeCliente = document.getElementById("nome_cliente").value;
    if(nomeCliente.length > 2){
        if ($("#listaClientes").parent().attr('id') == 'formulario_listagem_evento'){ //oção utilizada na tela de listagem de eventos
            let filtroDeBuscaEventos = {nomeCliente: cliente.id_cliente}; //filtro de busca é o objeto que contém os itens como nome de cliente e data para buscar eventos no bd
            socket.emit("listaEventos", filtroDeBuscaEventos);       
            return ('<input type="button" id="btnInserirClienteNoEvento" name="btn_inserir_cliente" id_cliente="'+cliente.id_cliente+'" class="btn btn-default" value="Inserir" onclick="inserirClienteNoEvento(this)">');
        }else {       
            socket.emit("listaClientesPorNome", nomeCliente);
        }
    }else{
        document.getElementById("listaClientes").innerHTML = '';
    }
}

//#################FUNÇÕES DE EVENTOS ########################### 

//Callback responsável por preencher a lista de eventos solicitada via filtro.
socket.on("receberEventos", function(eventos){
    let listaDeEventos = '';
    eventos.forEach( evento => {
        let brinquedos = '';
        //if para o caso da lista de brinquedos vir vazia
        if(evento.brinquedos != undefined && evento.brinquedos.length > 0){
            let tamanho = evento.brinquedos.length;
            evento.brinquedos.forEach(function(brinquedo, indice){
                brinquedos += brinquedo;
                if(indice == tamanho-1){
                    brinquedos += '.';
                }else{
                    brinquedos += ', '
                }
                 
            });                        
        }
       //montagem da lista a ser exibida
        console.log(evento.data);
        let data = new Date(evento.data);
        let dataParaExibir = (Number(data.getDate())) + '/' + (Number(data.getMonth())+1) + '/' + data.getFullYear();   
        let horaParaExibir = Number(data.getHours())+":"+Number(data.getMinutes());     
        listaDeEventos += '<div id="cliente_individual" style="margin-top: 30px; margin-left: auto; margin-right: auto; width: max-content;">' +
                          'Data do Evento: ' + dataParaExibir + '   Hora do Evento: ' + horaParaExibir + '<br>' +
                          'Nome do Cliente: ' + evento.nome + '   Telefone: ' + evento.telefone + '   Telefone para recado: ' + evento.telefone_recado + '<br>' +
                          'Endereço do Evento: ' + evento.logradouro +'&nbsp;&nbsp;' + evento.numero + ',&nbsp;&nbsp;';
                          if(evento.complemento)
                              listaDeEventos += evento.complemento+', &nbsp;&nbsp;';                    
                          if(evento.observacao_endereco)
                              listaDeEventos += evento.observacao_endereco;
                          listaDeEventos += '<br>Cidade: '+ evento.cidade + '<br>' +
                          'Brinquedos: <br>' + brinquedos + '<br>'
                          'Valor a receber no ato da montagem: ' + evento.valorLiquido;
    });

    document.getElementById('listaEventos').innerHTML = listaDeEventos;
});

//função que faz a troca dos campos dentro da div "espacoNomeCliente", recolocando o texto e o input text que existia ao carregamento da página
function trocarCliente(){
    
    let campoInserirCliente = '<label for="nome_cliente">Nome do Cliente</label>' +
                            '<input type="text" class="form-control" name="nome_cliente" id="nome_cliente" onkeyup="solicitarListaClientes()">';
    document.getElementById("espacoNomeCliente").innerHTML = campoInserirCliente;
}

//responsável pelo controle do botão que aparece dinâmicamente em cada cliente disponível para escolha
//o envio do id do cliente via post foi feito colocando um input type text oculto abaixo do botão "trocar cliente";
function inserirClienteNoEvento(botao){
    let paiBotao = botao.parentElement;//verifica o nome do elemento pai do botão inserir 
    let nomeClienteSelecionado = paiBotao.childNodes[3].innerText;//o terceiro elemento da div que contém o botão para inserir é o nome do cliente, portanto ele é copiado para a variável   
    let dadosDoClienteSelecionado = "Cliente Selecionado: "+ nomeClienteSelecionado + ", id: " + botao.getAttribute("id_cliente") + "<br>" +
    "<input type='button' value='Trocar cliente' class='btn btn-default' id='botaoTrocarCliente' onclick='trocarCliente()'>" +
    '<input type="text" class="form-control" value=' + botao.getAttribute("id_cliente") + ' id="id_cliente" name="id_cliente" style="display: none;">';
    //na variável dadosDoClienteSelecionado fica o html que contém o nome e o id do cliente selecionado
    console.log(dadosDoClienteSelecionado);
    document.getElementById("espacoNomeCliente").innerHTML = dadosDoClienteSelecionado;
    document.getElementById("listaClientes").innerHTML = '';
}


//inserção dos brinquedos no evento
function inserirBrinquedosNoEvento(){
    if (document.getElementById('data').value == ''){
        
    }
    socket.emit("enviarBrinquedosDisponiveis", document.getElementById("data").value);
    socket.on("receberBrinquedosDisponiveis", function(brinquedos){
        let listaBrinquedos = '<h1>Lista de brinquedos</h1>';

        brinquedos.forEach(brinquedo => {
            listaBrinquedos += '<div class="col-md-4" style="margin-top: 30px; margin-left: auto; margin-right: auto; height: 300px;">' +            
                                    '<div style="width: 200px;">' +
                                        '<img src="'+ brinquedo.foto_brinquedo +'" width="200px" >' +
                                    '</div>' +
                                    brinquedo.nome_brinquedo +
                               '</div>';
        });
        listaBrinquedos += '<input type="button" class="btn btn-default">';
        document.getElementById("espaco_lista_brinquedos").innerHTML = listaBrinquedos;
    });
}

 // A busca é via socketIO é somente solicitada caso existam mais de dois caracteres no input #nome_cliente_tela_evento e ou exista uma data definida para o evento
function filtrarEventos(){
    let criteriosDeBusca;
    criteriosDeBusca = {nomeCliente: document.getElementById("nome_cliente_tela_evento").value,
                        dataEvento: document.getElementById("data").value};
    if (((criteriosDeBusca.dataEvento == undefined) && (criteriosDeBusca.nomeCliente.length > 2)) || (criteriosDeBusca.dataEvento != undefined)) {   
        console.log("solicitou busca via socketio, data: "  + criteriosDeBusca.dataEvento + document.getElementById("data").value + ", cliente: " + criteriosDeBusca.nomeCliente);       
        socket.emit("listaEventos", criteriosDeBusca);
    }
}


//###################  Inicialização do JQuery  #######################


$(document).ready(function(){    
    
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

    //#################FUNÇÕES DE CLIENTES ###########################
    //função de evento keyup do campo nome_cliente
    //essa função é utilizada pela página inserirEvento e listarCliente

    
    $("#nome_cliente").keyup(function(){
        solicitarListaClientes();
    });

    

    //função que recebe a consulta da lista de clientes no bd, conforme o filtro solicitado
    //essa função é utilizada pela página inserirEvento e listarCliente
    socket.on("mandarClientes", function(clientes){
            clientesGlobal = clientes;
            let listaClientes = '';
            //preenchimento da lista de clientes filtrada na variável listaClientes
            clientes.forEach(cliente => {
                listaClientes += 
                '<div id="cliente_individual" style="margin-top: 30px; margin-left: auto; margin-right: auto; width: max-content;">' +
                    'Id de Cliente: '+ cliente.id_cliente +'<br>' +
                    'Nome: <span>'+ cliente.nome +'</span> <br>' +
                    'CPF: '+ cliente.cpf +'<br>' +
                    'Endereço: '+ cliente.logradouro +'&nbsp;&nbsp;' +
                    cliente.numero + ',&nbsp;&nbsp;';
                    if(cliente.complemento)
                        listaClientes += cliente.complemento+', &nbsp;&nbsp;';                    
                    if(cliente.observacao_endereco)
                        listaClientes += cliente.observacao_endereco;
                    listaClientes +=
                    'Cidade: '+ cliente.cidade +'<br>'+
                    'Telefone: '+ cliente.telefone +'<br>';
                    if(cliente.telefone_recado)
                        listaClientes += 'Telefone para recados: '+ cliente.telefone_recado +'<br>';
                    listaClientes +=
                    'Email: '+cliente.email +'<br>';
                    if(cliente.observacao_cliente)
                        listaClientes += 'Observação: '+cliente.observacao_cliente+'<br>';
                    listaClientes += verificarSeEEventoOuCliente(cliente) +
                    '<hr>'+
                '<div>';
            });
         
            //envio das informações para a página
            $("#listaClientes").wrapInner(listaClientes);       
    });


   

    //#################FUNÇÕES DE BRINQUEDOS ###########################
    $("#nome_brinquedo").keyup(function(){
        //caso o campo nome_brinquedo tenha mais de dois caracteres, é feita a busca no bd, caso contrário a lista é mantida vazia.
        //essa função é utilizada pela página listarBrinquedos
        if($("#nome_brinquedo").val().length > 2){
            socket.emit("listaBrinquedosPorNome",$("#nome_brinquedo").val());
        }else{
            document.getElementById("listaBrinquedos").innerHTML = '';
        }
    });

    //função que recebe a consulta da lista de clientes no bd, conforme o filtro solicitado
    //essa função é utilizada pela página listarBrinquedos
    socket.on("mandarBrinquedos", function(brinquedos){
        
        let listaBrinquedos = '';
        //preenchimento da lista de clientes filtrada na variável listaClientes
        brinquedos.forEach(brinquedo => {
            listaBrinquedos += 
            '<div class="col-md-4" style="margin-top: 30px; margin-left: auto; margin-right: auto; height: 300px;">' +
                '<div style="width: 200px;">'+
                    '<img src="'+brinquedo.foto_brinquedo+'" width="200px" >' +
                '</div>'+
                'Id do Brinquedo: '+ brinquedo.id_brinquedo +'<br>' +
                'Nome: '+ brinquedo.nome_brinquedo +' <br>' +
                'Características: '+ brinquedo.caracteristicas +'<br>' +
                'Valor da locação: '+ brinquedo.valor_brinquedo + '<br>' +
                'Quantidade em Estoque: ' + brinquedo.quantidade + '<br>';
                if(brinquedo.observacao)
                    listaBrinquedos += 'Observação: ' + brinquedo.observacao +
            '</div>';
        }); 
        //envio das informações para a página
        $("#listaBrinquedos").wrapInner(listaBrinquedos);     
    });

    //edição de clientes
    function exibirJanelaEdicaoCliente(nome, cpf, logradouro, numero, complemento, observacaoEndereco, cidade, telefone, telefoneRecado, cliente_evento, email, observacaoCliente){

    }


    //Essa função determina se a janela que está em uso é a de listagem de clientes, inserção ou listagem de eventos
    function verificarSeEEventoOuCliente(cliente){
        
        if ($("#listaClientes").parent().attr('id') == 'formulario_evento'){ //opção utilizada na tela de inserção de novo evento      
            return ('<input type="button" id="btnInserirClienteNoEvento" name="btn_inserir_cliente" id_cliente="'+cliente.id_cliente+'" class="btn btn-default" value="Inserir" onclick="inserirClienteNoEvento(this)">');
        }else if($("#listaClientes").parent().attr('id') == 'formulario_clientes'){  //opção utilizada na tela de listagem de clientes     
            return ('<button class="btn btn-default" id="btnEditarCliente"  data-toggle="modal" '+ 
                    'data-target="#janelaDeEdicaoCliente" value="'+cliente.id_cliente+'">Editar</button>&nbsp;&nbsp;<button class="btn btn-default">Excluir</button>');
        }
       
        /*
onclick="exibirJanelaEdicaoCliente(\''+cliente.nome+ '\',\''+cliente.cpf+ '\',\''+cliente.logradouro+ 
            '\',\''+cliente.numero+ '\',\''+cliente.complemento+ '\',\''+cliente.observacaoEndereco+ '\',\''+cliente.cidade+ '\',\''+cliente.telefone+ '\',\''+
                    cliente.telefoneRecado+ '\',\''+cliente.email+ '\',\''+cliente.observacaoCliente+'\')"
         */
    }

    //preencher janela para edição do cliente
    $(document).on("click", "#btnEditarCliente", function(origemClick){
        let idCliente = origemClick.target.value;
        clientesGlobal.forEach(cliente => {
            if(cliente.id_cliente == idCliente){
                $("#id_cliente").val(cliente.id_cliente);
                $("#nome").val(cliente.nome);
                $("#cpf").val(cliente.cpf);
                $("#logradouro").val(cliente.logradouro);
                $("#numero").val(cliente.numero);
                $("#complemento").val(cliente.complemento);
                $("#observacao_endereco").val(cliente.observacao_endereco);
                $("#cidade").val(cliente.cidade);
                $("#telefone").val(cliente.telefone);
                $("#telefone_recado").val(cliente.telefone_recado);
                $("#email").val(cliente.email);
                $("#observacao_cliente").val(cliente.observacao_cliente);
            }
        });
    });

    $('#form-cliente').submit(function(){
        var dados = $( this ).serialize();

        $.ajax({
            type: "POST",
            url: "/editarCliente",
            data: dados,
            success: function( data )
            {
                $("#fecharModal").trigger("click");
                alert(data);
                $("#nome_cliente").trigger("keyup");                
            }
        });

        return false;
    });
    
    

/*
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            console.log('style changed!');
        });    
    });
    
    var target = document.getElementById('janelaDeEdicaoCliente');
    observer.observe(target, { attributes : true, attributeFilter : ['style'] });
  */
   

    
});

