<?php
include("admin/db_connect.php");
$query = "SELECT * FROM `meta` WHERE id=1";
$meta = mysql_query($query,$db);
@$meta = mysql_fetch_array($meta);

//TODO Performance testing
header("Expires: ".gmdate("D, d M Y H:i:s")." GMT"); // Always expired
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");// always modified
header("Cache-Control: no-cache, must-revalidate");// HTTP/1.1
header("Pragma: nocache");// HTTP/1.0
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <!--<title><?php echo $pageTitle; ?></title>-->
    <title>Madness</title>
    <meta name="robots" content="noarchive" />
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <meta http-equiv="Content-Language" content="en-us" />
    <meta http-equiv="cache-control" content="no-cache, must-revalidate">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="pragma" content="no-cache">
    <link rel="shortcut icon" href="images/basketball_icon.png">
    <link rel="stylesheet" href="css/bootstrap.min.css"></link>
    <link rel="stylesheet" href="css/bootstrap-theme.min.css"></link>
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
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
