$(function () {    

    $(".painel-de-controle [data-controle]").on('click', function () {
        var seletor = $(this).parent('[data-controle]').attr('data-controle');
        var func = $(this).attr('data-controle');
        animacao[func]($("[data-animar-group=" + seletor + "]"))
    });

    var animacao = (function () {
        var animationGroups = {};
        var bOptions = {timeOut:5000, carregando: 'top', position_x: 'Bottom', position_y: 'Left', useImage: true   }

        var iniciar = function (group) {
            var groupid = checarGrupo(group);

            var index = animationGroups[groupid].animationCounter++;
            if (animationGroups[groupid].maxCounter < animationGroups[groupid].animationCounter) {
                Balloon.danger("Você chegou ao fim.", bOptions);
            }

            $(animationGroups[groupid].filhos[index]).toggle();

        }

        var recomecar = function (group) {
            var groupid = checarGrupo(group);
                        
            animationGroups[groupid].filhos.each(function (i, e) {
                $(animationGroups[groupid].filhos[i]).hide();
            })
            animationGroups[groupid].animationCounter = 0;
        }

        function checarGrupo(group) {
            var groupid = $(group).attr('data-animar-group');
            if (groupid === undefined) {
                Balloon.info("Grupo de animação inexistente", bOptions);
                return null;
            }

            if (animationGroups[groupid] == undefined) {
                animationGroups[groupid] = {};
                animationGroups[groupid].animationCounter = 0;
                animationGroups[groupid].filhos = $(group).children('[data-animar-ordem]');
                animationGroups[groupid].maxCounter = animationGroups[groupid].filhos.length;
            }

            return groupid;
        }

        return {init: iniciar, restart: recomecar}
    })();

    $('[data-animar-group]').each(function (i, e) {
        animacao.restart(e);        
    })
});

// Є Ω ϴ 