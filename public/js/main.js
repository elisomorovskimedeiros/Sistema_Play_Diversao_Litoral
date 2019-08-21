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
        console.log(evento);
        let data = new Date(evento.data);
        let dataParaExibir = (Number(data.getDate())) + '/' + (Number(data.getMonth())+1) + '/' + data.getFullYear();   
        let horaParaExibir = Number(data.getHours())+":"+Number(data.getMinutes());     
        listaDeEventos += '<div id="cliente_individual" style="margin-top: 30px; margin-left: auto; margin-right: auto; width: max-content;">' +
                          'Data do Evento: ' + dataParaExibir + '   | Hora do Evento: ' + horaParaExibir + '<br>' +
                          'Nome do Cliente: ' + evento.nome + '   Telefone: ' + evento.telefone + '   Telefone para recado: ' + evento.telefone_recado + '<br>' +
                          'Endereço do Evento: ' + evento.logradouro +'&nbsp;&nbsp;' + evento.numero + ',&nbsp;&nbsp;';
                          if(evento.complemento)
                              listaDeEventos += evento.complemento+', &nbsp;&nbsp;';                    
                          if(evento.observacao_endereco)
                              listaDeEventos += evento.observacao_endereco;
                          listaDeEventos += '<br>Cidade: '+ evento.cidade + '<br>' +
                          'Brinquedos: <br>' + brinquedos + '<br>' +
                          'Valor a receber no ato da montagem: ' + evento.valorLiquido + '<br>' +
                          '<button class="btn btn-default" id="btnEditarEvento"  data-toggle="modal" '+ 
                          'data-target="#janelaDeEdicaoEvento" value="'+evento.id_evento+'">Editar</button>&nbsp;&nbsp;'+
                          '<button class="btn btn-default" id="btn_excluir_evento" data-toggle="modal"'+
                          'data-target="#janelaDeRemocaoEvento" onclick="pegarEventos('+ evento.id_evento +')">Excluir</button>';
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
        console.log("brinquedos recebidos");
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
                        dataEvento: document.getElementById("dataEvento").value};
    if (((criteriosDeBusca.dataEvento == undefined) && (criteriosDeBusca.nomeCliente.length > 2)) || (criteriosDeBusca.dataEvento != undefined)) {   
        console.log("solicitou busca via socketio, data: "  + criteriosDeBusca.dataEvento + document.getElementById("dataEvento").value + ", cliente: " + criteriosDeBusca.nomeCliente);       
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
    

    //Código muito sinistro que suaviza o scroll ## retirado de: https://www.origamid.com/codex/scroll-suave-para-link-interno/
    $('.scrollSuave').on('click', function(e) {
        e.preventDefault();
        var id = $(this).attr('href'),
                targetOffset = $(id).offset().top;
                
        $('html, body').animate({ 
            scrollTop: targetOffset - 0
        }, 1000);
    });
});

