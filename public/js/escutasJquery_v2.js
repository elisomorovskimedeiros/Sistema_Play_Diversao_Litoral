$(document).ready(function(){ 
    perfil = $("body").attr("perfil");

    //solicita consulta inicial no bd
    if(window.location.pathname === "/"){
        socket.emit("proximos_eventos", perfil);
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
        console.log(moment(evento.data_evento).format("DD/MM/YYYY"));
        $("#titulo_modal_destaque_evento").html("Evento " + evento.id_evento);
        $("#nome_cliente_destaque_evento").val(evento.nome_cliente);
        $("#telefone_destaque_evento").val(evento.telefone);
        $("#telefone_alternativo_destaque_evento").val(evento.telefone_alternativo);
        $("#email_destaque_evento").val(evento.email);
        document.getElementById("data_destaque_evento").value = moment(evento.data_evento).format("DD/MM/YYYY");
        //$("#data_destaque_evento").val(moment(evento.data_evento).format("DD/MM/YYYY"));
    });
});