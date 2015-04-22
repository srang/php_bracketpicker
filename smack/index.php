<?php
require_once('../fragments/constants.php');
include(SERVER_ROOT . 'fragments/header.php');
?>
    <link href='<?php echo BASE_URL; ?>css/summernote.css' rel='stylesheet' />
    <div class='container main-content'>
      <div class='row'>
        <h1 class='news-header'>Breaking News</h1>
        <h3>Something about Moose and Harvard</h3>
      </div>
      <div id='talk' class='row'>
      </div>
    </div>
    <?php include(SERVER_ROOT . 'fragments/footer.php'); ?>
<script>
  $('#talk').summernote();
</script>
  </body>
</html>
