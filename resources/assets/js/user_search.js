// initialize all typeaheads
function searchUsers(query, sync_cb) {
    var results = $.grep(users,function(e){ return e.name.toLowerCase().indexOf(query.toLowerCase())>=0; });
    sync_cb(results);
}

$('#bracket-owner').typeahead({
        minLength: 1,
        highlight: true
},
{
    name: 'user-dataset',
    display: 'name',
    source: searchUsers,
    templates: {
        empty: [
            '<div class="typeahead-result">',
            'No Results',
            '</div>'
                    ].join('\n'),
                    suggestion : function (val) {
                        return '<p class="typeahead-result" data-value="' + val.user_id + '">' + val.name + '</p>';
                    }
    }
});
$('#bracket-owner').on('typeahead:select', function(event, selection) {
    $('#bracket-owner-real').val(selection.user_id);
    $('#bracket-name').val(selection.name+'\'s Bracket');
});
