$(function() {
    function __getParentId(childId) {

        // id = R<round>G<game>T<team>
        var round = parseInt(childId.match(/R[0-9]+/)[0].substr(1));
        var game  = parseInt(childId.match(/G[0-9]+/)[0].substr(1));
        var team  = parseInt(childId.match(/T[0-9]+/)[0].substr(1));
        round = round+1;
        team = (game-1)%2+1;
        game = Math.ceil(game/2);
        var parentId = 'R'+round.toString()+'G'+game.toString()+'T'+team.toString();
        console.log('Parent: '+parentId);
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
    function _setWinner(game, winner) {

        // find input associated with this game, update winner
        var info = __parseGameId(game.attr('id'));
        $('#R'+info.round+'G'+info.game+'W').val(winner);

    }

    function _getWinner(game) {

        // find input for game, return winner.val
        var info = __parseGameId(game.attr('id'));
        var name = $('#R'+info.round+'G'+info.game+'W').val();
        // also want to pass team colors and rank
        var teamButton;
        if(name === $('#R'+info.round+'G'+info.game+'T1').val()) {
            teamButton = $('#R'+info.round+'G'+info.game+'T1B');
        } else if (name === $('#R'+info.round+'G'+info.game+'T1').val()) {
            teamButton = $('#R'+info.round+'G'+info.game+'T2B');
        } else {
            teamButton = $('#R'+info.round+'G'+info.game+'T2B');
            console.log("ERROR");
        }

        var primaryColor = teamButton.css('background-color');
        var accentColor = teamButton.css('color');
        var rank = teamButton.find('.team-rank').text();
        return {
            "name" : name,
            "rank" : rank,
            "primary" : primaryColor,
            "accent" : accentColor
        };
    }

    function _updateGames(childGame, parentGame) {

        // save old value in case gets unset
        var old = parentGame.find('.team-name').text();
        parentGame.data('name', old);

        // set button text
        var winner = _getWinner(childGame);
        parentGame.find('.team-name').text(winner.name);
        parentGame.find('.team-rank').text(winner.rank);
        parentGame.css('background-color',winner.primary);
        parentGame.css('color',winner.accent);

        // --set losing teams colors to grey or something

        // update parent team(1|2) with winner
        console.log("parent team: "+ parentGame.attr('id').slice(0,-1));
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


    function _changeColorIntensity(col, amt) {

        var usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }
        var color = {
            "r": { "val": 0, "mask":0xFF0000, "offset": 16},
            "g": { "val": 0, "mask":0x00FF00, "offset": 8},
            "b": { "val": 0, "mask":0x0000FF, "offset": 0}
        };
        var num = parseInt(col,16);

        for(var channel in color) {
            var val = (num >> color[channel].offset & color[channel].mask ) + amt;
            if (val > 255) val = 255;
            else if  (val < 0) val = 0;
            color[channel].val = val;
        }
        var ret=0x000000;
        for(var channel in color) {
            ret = ret | (color[channel].val << color[channel].offset);
        }
        var ret_string = (usePound?"#":"")+ret.toString(16);


        return ret_string;

    }


    $('.btn-team').on('click', function() {
        // read game info for button clicked
        var gameInfo = _getGameInfo($(this));
        // update this game's winner
        _setWinner($(this), gameInfo.name);
        // get parent game button
        var parentGame = _getParentGame($(this));
        // update parent->team(1|2)
        // Needs to handle sub child changes (eg leaf game changed shouldn't break higher ups
        _updateGames($(this), parentGame);
    });
});
