<?php
include(SERVER_ROOT . 'admin/db_connect.php');
$query = 'SELECT * FROM `meta` WHERE id=1';
$meta = mysql_query($query,$db);
@$meta = mysql_fetch_array($meta);
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name='description' content='Bracket Challenge'>
    <meta name='author' content='srang'>
    <title><?php echo $meta['title']; ?></title>
    <link rel='icon' href='<?php echo BASE_URL; ?>img/basketball_icon.png'>

    <!--[if lt IE 9]>
      <script src='https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js'></script>
      <script src='https://oss.maxcdn.com/respond/1.4.2/respond.min.js'></script>
    <![endif]-->
