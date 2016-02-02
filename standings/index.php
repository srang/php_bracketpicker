<?php
require_once('../fragments/constants.php');
include(SERVER_ROOT . 'fragments/header.php');
?>
<div class='container main-content'>
  <div class='row'>
    <header class='jumbotron'>
      <h1>Welcome to our signup page</h1>
    </header>
    <summary>
      This is going to be epic... If I can get it working
    </summary>
  </div>
  <div>
<?php include(SERVER_ROOT . 'fragments/edit_user.php'); ?>
  </div>
</div>
<?php include(SERVER_ROOT . 'fragments/footer.php'); ?>
</body>
</html>
