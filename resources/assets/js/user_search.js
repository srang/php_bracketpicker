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
                        return '<p class="typeahead-result" data-value="' + val.id + '">' + val.name + '</p>';
                    }
    }
});
$('#bracket-owner').bind('typeahead:selected', function(obj, datum, name) {
    $('#bracket-owner-real').val(datum.id);
});
