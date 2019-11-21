//inicialização do socketIO
var socket = io("/");

let ultimo_filtro_eventos = {};

socket.on("receber_eventos", function(resposta){
    if(resposta.erro){
        $("#listagemFiltros").html(resposta.erro);
    }else{
        ultimo_filtro_eventos = resposta;
        $("#info_exibicao").html("Eventos até dia " + moment().add(15, "days").format("DD/MM/YYYY"));
        ultimo_filtro_eventos.forEach(function(evento, indice){
            
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
            campoBrinquedos.value = evento.brinquedos;
            
        });        
    }
});