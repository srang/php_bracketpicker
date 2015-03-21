<?php
include("admin/database.php");

$query = "SELECT * FROM `meta` WHERE id=1";
$meta = mysql_query($query,$db);
@$meta = mysql_fetch_array($meta);

header("Expires: ".gmdate("D, d M Y H:i:s")." GMT"); // Always expired
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");// always modified 
header("Cache-Control: no-cache, must-revalidate");// HTTP/1.1 
header("Pragma: nocache");// HTTP/1.0


function getCommentsMap($db)
{
   $commentCount =  "SELECT COUNT(*) count, bracket FROM `comments` WHERE UNIX_TIMESTAMP(`time`)>" . (time()-86400) . " GROUP BY `bracket`";
   $commentCountList = mysql_query($commentCount,$db) or die(mysql_error());
   $commentMap;
   
   while( $commentCount = mysql_fetch_array($commentCountList) )
   {
      $commentMap[$commentCount['bracket']] = $commentCount['count'];
   }
   
   return $commentMap;
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
   <title><?php echo $pageTitle; ?></title>
   <meta name="robots" content="noarchive" />
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
   <meta http-equiv="Content-Language" content="en-us" />
   <meta http-equiv="cache-control" content="no-cache, must-revalidate">
   <meta http-equiv="expires" content="0">
   <meta http-equiv="pragma" content="no-cache">
   <link rel="shortcut icon" href="images/basketball_icon.png">
   <link rel="stylesheet" href="css/bootstrap.min.css"></link>
   <link rel="stylesheet" href="css/freelancer.css"></link>
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

<?php
//if this is the submit or what-if page, include the necessary javascript
if(strpos($_SERVER['PHP_SELF'],"submitSweet16.php") !== FALSE || strpos($_SERVER['PHP_SELF'],"submit.php") !== FALSE || strpos($_SERVER['PHP_SELF'],"whatif.php") !== FALSE) {
?>
<script type="text/javascript">
// The key to this array is the game number and the value is the parent node
parents = new Array(-1, 
   33, 33, 34, 34, 35, 35, 36, 36, 
   37, 37, 38, 38, 39, 39, 40, 40, 
   41, 41, 42, 42, 43, 43, 44, 44, 
   45, 45, 46, 46, 47, 47, 48, 48, 
   49, 49, 50, 50, 51, 51, 52, 52, 
   53, 53, 54, 54, 55, 55, 56, 56, 
   57, 57, 58, 58, 59, 59, 60, 60, 
   61, 61, 62, 62, 63, 63, -1 );


function update(childGameId,target, index) 
{
   var childSel = document.getElementById(childGameId);
   var parentSel = document.getElementById(target);
   if( childSel.options.length > 1 )
   {
      var deselectedChildVal = childSel.options[(childSel.selectedIndex + 1) % 2].value;
      deleteTeam( parentSel, deselectedChildVal );   
   }

   var selectedValue = childSel.options[childSel.selectedIndex].value;
   var selectedText = childSel.options[childSel.selectedIndex].text;
   parentSel.options[index] = new Option(selectedText,selectedValue);
}

function deleteTeam( rootNode, teamToDelete )
{   
   //alert( rootNode.id + " " + teamToDelete + " " + childGameNum + " " + parentGameNum);

   var childGameNum = parseInt( rootNode.id.substring(4) );   
   
   for( i =0; i < rootNode.options.length; i++ )
   {
      if( rootNode.options[i].value == teamToDelete )
      {
         rootNode.options[i] = new Option("","");
      }
   }
   
   
   var parentGameNum = parents[childGameNum];   

   if( parentGameNum != -1 )
   {
      var parentGameId = "game" + parentGameNum;
      var parentSel = document.getElementById( parentGameId );

      deleteTeam( parentSel, teamToDelete);
   }      
}

function resetBracket( startId )
{
   if( startId == null )
   {
      startId = 1;
   }
   var resetBracket = window.confirm('Are you sure that you want to reset this bracket?');
   if( resetBracket )
   {
      for( i = startId; i < parents.length -1; i++ )
      {
         var selectBox = document.getElementById( "game" + parents[i] );
         while (selectBox.options.length > 0) {
            selectBox.options[0] = null;
         }
      }
      return true;
   }
   else
   {
      return false;
   }
}
</script>
<?php } ?>

</head>

<body>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="navbar-header page-scroll">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#page-top"><?php echo $meta['title']; ?></a>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right">
          <li class="hidden">
            <a href="#page-top"></a>
          </li>
          <li class="page-scroll">
            <a href="index.php">HOME</a>
          </li>
          <li class="page-scroll">
            <a href="submit.php">CREATE BRACKET</a>
          </li>
          <li class="page-scroll">
            <a href="rules.php">RULES</a>
          </li>
          <li class="page-scroll">
            <a href="choose.php">STANDINGS</a>
          </li>
          <?php if($meta['cost'] != 0) { ?>
          <li class="page-scroll">
            <a href="choose.php">STANDINGS</a>
          </li>
          <?php } ?>
          <?php if($meta['mail'] != 0 ) { ?>
          <li class="page-scroll">
            <a href="contact.php">CONTACT</a>
          </li>
          <?php } ?>
        </ul>
      </div>
    </div>
  </nav>
