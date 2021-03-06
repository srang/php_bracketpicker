function searchTeams(query, sync_cb) {
    var results = $.grep(teams,function(e){ return e.name.toLowerCase().indexOf(query.toLowerCase())>=0; });
    sync_cb(results);
}

// initialize all tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$('#start-madness').on('click',function() {
    console.log("let the fun begin");
    $('#madness-flag').val('true');
    $('#save-button').click();
});

$(window).keydown(function(event){
    if(event.keyCode == 13) {
        event.preventDefault();
        return true;
    }
});

$('label.master-label').on('click', function() {
    $(this).addClass('hide');
    var input = $('input.master-input[id='+$(this).attr('for')+']');
    input.removeClass('hide');
    input.typeahead({
            minLength: 1,
            highlight: true
    },
    {
        name: 'team-dataset',
        display: 'name',
        source: searchTeams,
        templates: {
            empty: [
                '<div class="typeahead-result">',
                'No Results',
                '</div>'
                    ].join('\n'),
            suggestion : function (val) {
                        return '<p class="typeahead-result" data-value="' + val.team_id + '">' + val.name + '</p>';
                    }
        }
    });
    input.on('typeahead:select', function(event, selection) {
        $(this).typeahead('val',selection.name);
        $(this).typeahead('destroy');
        $(this).val(selection.name);
        $(this).addClass('hide');
        var label = $('label.master-label[for='+$(this).attr('id')+']');
        label.text(selection.name);
        label.removeClass('hide');
        label.addClass('unsaved');
    });

    input.on('blur', function() {
        $(this).typeahead('val','');
        $(this).typeahead('destroy');
        $(this).addClass('hide');
        var label = $('label.master-label[for='+$(this).attr('id')+']');
        label.removeClass('hide');
    });
});

