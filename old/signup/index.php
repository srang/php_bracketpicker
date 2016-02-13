<?php
require_once('../fragments/constants.php');
include(SERVER_ROOT . 'fragments/header.php');
?>
<div class='container main-content'>
  <div class='row'>
    <div class='jumbotron'>
      <h1>Welcome to our signup page</h1>
    </div>
  </div>
  <div>
<?php include(SERVER_ROOT . 'fragments/edit_user.php'); ?>
  </div>
</div>
<?php include(SERVER_ROOT . 'fragments/footer.php'); ?>
</body>
</html>
