function searchRegions(query, sync_cb) {
    var results = $.grep(regions,function(e){ return e.name.toLowerCase().indexOf(query.toLowerCase())>=0; });
    sync_cb(results);
}

$('.region-select').typeahead({
        minLength: 1,
        highlight: true
    },
    {
        name: 'team-dataset',
        display: 'name',
        source: searchRegions,
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
$('.region-select').on('typeahead:select', function(event, selection) {
    $(this).typeahead('val',selection.name);
    $(this).val(selection.id);
});

$('.pick-a-color').pickAColor({
  showSpectrum            : true,
  showAdvanced            : false,
  showSavedColors         : false,
  saveColorsPerElement    : false,
  fadeMenuToggle          : true,
  showHexInput            : true,
  showBasicColors         : true,
  allowBlank              : true,
  inlineDropdown          : true
});
