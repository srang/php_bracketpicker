<?php
include("header_update.php");
include("admin/functions.php");
?>
      <div class="container" id="main-content">
         <div class="row">
           <div class="col-md-6">
              <?php include("sidebar.php"); ?>
           </div>
           <div class="col-md-6">
              <?php
                  if(isset($_SESSION['success'])) {
              ?>
                  <div class="success"><?php echo $_SESSION['success']?></div>
              <?php
              }
              if(isset($_SESSION['errors'])) {
              ?>
                  <div class="errors"><p><em>Errors:</em></p><?php echo $_SESSION['errors']?></div>
              <?php
              }
              unset($_SESSION['errors']);
              unset($_SESSION['success']);

              while ($post = mysql_fetch_row($blog)){
                 echo "<h2>$post[1]</h2>\n";
                 echo "<h3>$post[2]</h3>\n";
                 echo "$post[3]\n";
                 echo "<p class=\"date\">$post[4]</p>\n";
              }
           ?>
              <br />
           </div>

       </div>
      </div>
<?php include("footer.php"); ?>
