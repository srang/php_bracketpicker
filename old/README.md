***************************
March Madness Bracket Competition v1.5.3.6
March 14, 2011
***************************

This program is not affiliated in any way with the National Collegiate Athletic Association.

This project can be downloaded from http://sourceforge.net/projects/tourney.  

# Introduction #
--------------------

So, we all run annual NCAA March Madness basketball pools among friends and 
family. We have found that the management services provided by ESPN, Yahoo, CBS, 
etc., give limited controls to the league administrator, and we were not satisfied 
with any existing solutions on the web.  This led to the development of 
March Madness Bracket Competition.

March Madness Bracket Competition will allow you and your friends to run a large
NCAA tournament pool without having to manually score and collect a bunch of 
brackets. 

### LICENSE ###

March Madness Bracket Competition is released under GPL 2.0.  
Feel free to modify the script, but my only request is that you leave the 
copyright notice and link.  It is written using PHP/MySQL and is meant to be 
run on a webserver by the administrator of the league.  All administrative 
tasks may be performed from the 'admin' directory.

### COPYRIGHT ###
March Madness Bracket Competition is based on work done by Matt Felser
in his "Matt March Madness" project, which is copyright 2007-2008 Matt Felser.
Extensive additions and changes have been done requireing a split to this new
project, "March Madness Bracket Competition" which is Copyright 2007-2008 by Matt Felser, 
and Copyright 2008-2011 Brian Battaglia, John Holder, and Robert Jailall.
When redistributing this software, you must include this copyright notice.

# Requirements #
--------------------
 
 - PHP 4.1 or higher (http://www.php.net/)
 - MySQL (or access to a server running this)
 - A web server(Apache, IIS, etc)
 - JavaScript-enabled browser (for bracket submission)

# Installation #
--------------------

1. Extract the files from the archive.
   (in linux: tar -zxf mmm_vX.Y.Z.tar.gz)

2. Copy the tourney folder to a directory accessible from the web.
   (usually /somewhere/public_html/)

    a. It is STRONGLY suggested that you password protect the 'admin' directory 
    with an .htpasswd file.  There is a nice tool 
    (http://www.clockwatchers.com/htaccess_tool.html) that can handle this if 
    you don't know how.  Many people have this functionality built into their
    cPanel. Otherwise, anyone will be able to mess around with the brackets 
    and scoring, which could cause quite a bit of trouble.

3. Using phpMyAdmin, the command line, or any other method, create a database and user.  
   Rename /admin/database.php.tmpl to database.php
   Edit /admin/database.php to contain the proper information. 
   This is crucial in configuring the site.

4. Open your favorite web browser and point it at your installation directory.  
   If you have not yet configured the site, a message should be displayed 
   reminding you to set things up.  Click this link and fill out all the 
   necessary information.  Click "Finish" and if no errors appear, you
   are good to go!

Other Notes:

   - For a free pool, set the entry fee at 0.  Users will automatically be 
     marked as exempt from paying and the pot size will not be visible.
   - Cut size should be entered in dollars and cents (i.e. 2.50) or percent (i.e. 5).
   - If you do not have a mailserver, turn off notification emails.

# Usage #
--------------------

Thankfully usage should be much easier than installation.  Open up your favorite
web browser and point it at the admin directory under the directory you installed 
March Madness Bracket Competition into.
(eg. http://www.yoursite.com/admin/)

At this point you should have the admin menu up.

1. Once the bracket has been released, click "Initialize the Bracket" from the 
   admin menu, or navigate to www.yoursite.com/admin/start.htm.  From here, you
   may enter the matchups.  Upon submitting this form, the competition 
   officially begins!  The submission form will become available and entries may
   be submitted.

2. You may now post/delete blog entries in a WYSIWYG editor.

3. You can modify the rules page as you wish, also through a WYSIWYG editor.  
   I recommend including at least a deadline and some contact information for yourself.

4. The master bracket may be updated by clicking "Edit Master Bracket" at the 
   admin menu or at www.yoursite.com/admin/bracket.php.  The entire bracket is
   overwritten every time you modify it. Upon submitting the form, it automatically
   grabs the winners and losers of each game and runs the scoring script.

5. Payment tracking is available.  Click the "Edit Paid List" to set each entrant's 
   status. If you run a free pool, all users will be set as exempt. Users can view
   the list at www.yoursite.com/paid.php, which is linked through the sidebar.

6. NOTES on Paths To Victory
   Paths to vistory should not be run before the final 16 games.  A great deal
   of information is calculated by this process, it is still possible that this
   may cause a timeout on your web server, which can cause partially computed
   results.  If this should happen, the paths can be calculated manually on
   your server using this command line in your install directory:
      php ./admin/calculate_paths_to_victory.php truncate
   The final 'truncate' keyword is only needed if you have partial results
   calculated, as they must be cleaned up.  Once 14 or fewer games remain, this
   function should be able to complete successfully from the browser unless you
   have a huge number of brackets, in which case the command line will still
   have to be used.
   

If something is majorly messed up, please post in the Sourceforge help forum.
We will try to respond ASAP.  Keep in mind we monitor more heavily in the month
preceeding the Tourney.

If there are any features you would like to see, please submit a request on the
Sourceforge project page.

Thanks for using March Madness Bracket Competition!
