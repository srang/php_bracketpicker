$(function() {
    $('.btn-team').each(function () {
        var team = _getTeamInfo($(this));
        $(this).css('background-color',team.primaryColor);
        $(this).css('color',team.accentColor);
        $(this).find('.team-rank').text(team.rank);
        $(this).text(team.name);
    });

    function __getParentId(childId) {

        // id = R<round>G<game>T<team>
        var round = parseInt(childId.match(/R[0-9]+/)[0].substr(1));
        var game  = parseInt(childId.match(/G[0-9]+/)[0].substr(1));
        var team  = parseInt(childId.match(/T[0-9]+/)[0].substr(1));
        round = round+1;
        team = (game-1)%2+1;
        game = Math.ceil(game/2);
        var parentId = 'R'+round.toString()+'G'+game.toString()+'T'+team.toString();
        return parentId;

    }

    function __parseGameId(gameId) {

        // id = R<round>G<game>T<team>(B) when button
        var round = gameId.match(/R[0-9]+/)[0].substr(1);
        var game  = gameId.match(/G[0-9]+/)[0].substr(1);
        var team  = gameId.match(/T[0-9]+/)[0].substr(1);
        var ret = {
            "round": round,
            "game": game,
            "team": team
        };
        return ret;

    }

    function _getGameInfo(game) {

        var info = __parseGameId(game.attr('id'));
        info.name = game.find('.team-name').text();
        return info;

    }

    function _setWinner(info) {

        $('#R'+info.round+'G'+info.game+'W').val(info.name);

    }

    function _getTeamInfo(team) {

        var t = $('#'+$('#'+$(this).attr('id').slice(0,-1)).val());
        // find input for game, return winner.val
        var info = __parseGameId(team.attr('id'));
        var name = t.attr('id');
        // also want to pass team colors and rank

        var primaryColor = t.data('bg');
        var accentColor = t.data('fg');
        var rank = team.find('.team-rank').text();
        return {
            "name" : name,
            "jq" : t,
            "rank" : rank,
            "primary" : primaryColor,
            "accent" : accentColor
        };
    }

    function _updateGames(parentGame, winner, loser) {

        // save old value in case gets unset
        var old = parentGame.find('.team-name').text();
        parentGame.data('name', old);

        // set button text
        winner.css('background-color','#'+winner.data('bg'));
        winner.css('color', '#'+winner.data('fg'));
        var winnerInfo = _getWinnerInfo(winner);
        parentGame.find('.team-name').text(winnerInfo.name);
        parentGame.find('.team-rank').text(winnerInfo.rank);
        parentGame.css('background-color',winnerInfo.primary);
        parentGame.css('color',winnerInfo.accent);
        parentGame.data('bg',winnerInfo.primary);
        parentGame.data('fg',winnerInfo.accent);
        loser.css('background-color', _changeColorIntensity(loser.data('bg'), -0.7));
        loser.css('color', _changeColorIntensity(loser.data('fg'), -0.7));

        // update parent team(1|2) with winner
        $('#'+parentGame.attr('id').slice(0,-1)).val(winner.name);


    }

    function _getParentGame(game) {

        // returns parent game button
        // id = R<round>G<game>T<team>
        return $('#'+__getParentId(game.attr('id'))+'B');

    }

    function _unsetGame(game) {

        var old = game.data('name');
        game.val(old);
        // store previous value in data-[] tags
        // when child games change and game needs to be reset

    }

    function _changeColorIntensity(hex, lum) {

        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
        }

        return rgb;

    }


    $('.btn-team').on('click', function() {
        // read game info for button clicked
        var gameInfo = _getGameInfo($(this));
        var loser = $(this).parent().find('.btn-team').not('#'+$(this).attr('id'));
        // update this game's winner
        _setWinner(gameInfo);
        // get parent game button
        var parentGame = _getParentGame($(this));
        // update parent->team(1|2)
        // Needs to handle sub child changes (eg leaf game changed shouldn't break higher ups
        _updateGames(parentGame, $(this), loser);
    });
});
