<?php
include("admin/db_connect.php");
$query = "SELECT * FROM `meta` WHERE id=1";
$meta = mysql_query($query,$db);
@$meta = mysql_fetch_array($meta);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="Bracket Challenge">
    <meta name="author" content="srang">

    <!--<title><?php echo $pageTitle; ?></title>-->
    <title>Madness</title>

    <link rel="icon" href="img/basketball_icon.png">
    <link rel="stylesheet" href="css/frontend.css"></link>
    <!--link rel="stylesheet" href="css/bootstrap-theme.min.css"></link-->


    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-main">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#page-top"><span><img width="20" height="20" alt="Brand" src="images/basketball_icon.png"><?php echo $meta['title']; ?></span></a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse-main">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="index.php">HOME</a>
            </li>
            <li>
              <a href="submit.php">CREATE BRACKET</a>
            </li>
            <li>
              <a href="rules.php">RULES</a>
            </li>
            <li>
              <a href="choose.php">STANDINGS</a>
            </li>
<?php if($meta['cost'] != 0) { ?>
            <li>
              <a href="paid.php">PAYMENT TRACKER</a>
            </li>
<?php } ?>
<?php if($meta['mail'] != 0 ) { ?>
            <li>
              <a href="contact.php">CONTACT</a>
            </li>
<?php } ?>
          </ul>
        </div>
      </div>
    </nav>
