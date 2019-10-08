$(document).ready(function(){ 
    perfil = $("body").attr("perfil");

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
});