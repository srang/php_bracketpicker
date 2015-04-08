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
