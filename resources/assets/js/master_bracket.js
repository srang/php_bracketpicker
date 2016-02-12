// initialize all tooltips
function searchTeams(query, sync_cb) {
    var results = $.grep(teams,function(e){ return e.name.toLowerCase().indexOf(query.toLowerCase())>=0; });
    sync_cb(results);
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$('#start-madness').on('click',function() {
    console.log("let the fun begin");
    $('#madness-flag').val('true');
    $('#save-button').click();
});

$('label.master-label').on('click', function() {
    $(this).addClass('hide');
    var input = $('input.master-input[name='+$(this).attr('for')+']');
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
                        return '<p class="typeahead-result" data-value="' + val.id + '">' + val.name + '</p>';
                    }
        }
    });
    input.on('typeahead:select', function(event, selection) {
        $(this).typeahead('destroy');
        $(this).val(selection.id);
        $(this).addClass('hide');
        var label = $('label.master-label[for='+$(this).attr('name')+']');
        label.text(selection.name);
        label.removeClass('hide');
        label.addClass('unsaved');
    });

});

