<?php
require_once('../fragments/constants.php');
include(SERVER_ROOT . 'fragments/header.php');
?>
    <div class='container'>
      <div class='row'>
        <h1 class='news-header'>Breaking News</h1>
        <h3>Something about Moose and Harvard</h3>
      </div>
      <div id='summernote' class='row'>
      </div>
      <div class='row'>
        <button class='pull-right btn btn-success' id='save'>Submit</button>
        <button class='pull-right btn btn-primary' id='edit'>Edit</button>
      </div>
    </div>
    <?php include(SERVER_ROOT . 'fragments/footer.php'); ?>
<script>
  var init_summer = function(id) {
    $(id).summernote({
      height: 300,
      minHeight: null,
      maxHeight: null
    });
  }
  $('#save').on('click',function() {
    var sn = $('#summernote');
    var content = sn.code();
    sn.destroy();
    sn.html(content);
  });
  $('#edit').on('click',function() {
    init_summer('#summernote');
  });
  init_summer('#summernote');
</script>
</body>
</html>
