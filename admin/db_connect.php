<?php

/*
 * Add your DB config here!
 */
$user = "tourney2015";
$pass = "Genfare123!";


$database = "tourney2016";
$host = "localhost";
$tourneyURL = "localhost/tourney";
/* **************** DO NOT EDIT BELOW THIS POINT **************** */

/*
 * The below data must appear in a valid release.  Do not edit.
 */
$mmm_vers = "2.0";
$mmm_info = "&copy; 2015 Tourney Project";
$mmm_authors = "Copyright &copy; 2007-2008 Matt Felser,<br />Copyright &copy; 2008-2011 Brian Battaglia, John Holder, Robert Jailall<br />Copyright &copy; 2015 Sam Rang";
$dbschema_vers = "ver 2.0";

error_reporting(E_ERROR|E_CORE_ERROR|E_PARSE|E_COMPILE_ERROR|E_USER_ERROR|E_RECOVERABLE_ERROR);

$db = mysql_connect($host, $user, $pass)
  or die(mysql_error());

mysql_select_db($database,$db)
  or die(mysql_error());
?>
