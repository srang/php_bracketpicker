Changelog
--------------------

03/23/2013 v 1.5.3.7

 - Fixed typo in SQL query when scoring a bracket.
 - Add names to payment list if logged in.
 
 03/13/2011 v 1.5.3.6
 Minor updates here.
 - Added documentation to bottom of page regarding Paths to Victory to
   prevent needless 'help forum' posts
 - Added same documentation to this README in the "Usage" section.
 - Update the historical probabilities with 2010 tourney data
 - Normalize email to not use <> (despite the RFC) - at least one file had
   issues sending email.
 - change bracket heading from "Round 2" to "Round of 32"
 - made H tags a "basketball orange" color

Last Checkin Included: rev 79
Files Updated from 1.5.3.5:
/
  bracket.php
  braket_view_module.php
  sendcode.php
/images/
  images/style.css
/admin/
  sendEmailUsers.php
  sendcode.php
  emailatstart.php
  index.php
  structure_1_5_1.sql
  convert_1_0_3_to_1_5_structure.sql
/admin/utils/
  calculateSeedRoundProbs.py


03/29/2010 v 1.5.3.5
Much work by flynnmj, enryonaku, botagrox, and jholder

 - Fixes to allow ability to set number of payout spots in database.php,
   and the rank and possible path and player elimination code will properly
   compute who is still in the game. (Yes, you have to update your database.php)
 - Unpaid brackets will not show in the end game scenarios.
 - Better protection and validation from apostrophes in bracket names and blog posts
 - Cleaned up SQL statements so that possible_scores and possible_scores_eliminated 
   would have entries deleted correctly.
 - Admin related UI improvements, If Admin cookie is set:
   - Admin has link to admin page on front page
   - Admin can now see participant names in standings
Files Updated from 1.5.3.4:
/
  endgamesummary.php
  sidebar.php
  normal.php
  best.php
  scoredetail.php
  README
/admin/
  functions.php
  calculate_paths_to_victory.php
  index.php
  database.php.tmpl
  score.php
  update.php
  post.php


03/19/2010 v 1.5.3.4

 - Fixes to allow apostrophes in blog posts.
 - Fixes to allow hover tooltips to work on scoredetail in IE 7 and 8.

03/18/2010 v 1.5.3.3

 - Show all teams picked with % and who-pick-who links in sidebar
 - fix bug that didn't allow apostrophes in smacktalk (thanks, hartmch)
 - fix bug displaying smacktalk when apostrophe's are properly escaped
 - fix some display issues for IE7

03/15/2010 v 1.5.3.2

 - Goodbye, pink. Stylesheet updated.
 - Contact all users email option added for admin panel if email is enabled.
 - Creation of alternate scoring methods wasn't installing properly on fresh install. Now the data is correctly inserted.
 - When installing, admin username now written correctly into meta, instead of accidentally
  writing the admin password into the admin name field, which was in cleartext.

03/12/2010 v 1.5.3.1

 - change to SQL structure to make a varchar 255 instead of 256 for compatibility
  with a version of mySQL that didn't like varchars length above 255

03/08/2010 v 1.5.3

 - Fixes to elminiate short form opening tags in php sections for greater compatibility
 - Small fix to install scripts

03/07/2010 v 1.5.2

 - Many fixes to install scripts and sql structure

03/05/2010 v1.5.1a

The difference from 1.5.1 to 1.5.1a:

 - fixed install script for fresh install
 - updated all URLs in project to point to the new sourceforge project location
 - updated project name in all files to reflect the new name
 - updated all copyrights to be consistent (but it is long, we probably should add 
   an 'about' page or something for this)
 - made smacktalk header only appear on front page if there is any smacktalk
 - made it so a bracket added when a tourney entry cost is zero is automatically 
  set to 'exempt' instead of 'unpaid'

03/27/2009 v1.5.1

If you have an existing install,
THIS VERSION REQUIRES YOU TO UPDATE YOUR DATABASE STRUCTURE.
Run the convert_1_5_to_1_5_1_structure.sql script.

 - Add the ability to post smack talk on brackets.
 - Add a feed to the front page to see all the smack talk.
 - Add icons to denote when a bracket has new smack talk.
 - Calculate the probability of a bracket winning given a list of end game scenarios.
   Probabilities are based on historical performance of the seeds versus each other
   in a particular round. When there is no data, 1-(winning seed)/(winning seed +
   losing seed) is used to estimate the probability of the win.
 - Improve install.php so that it recognizes versions and tries to run different 
   database scripts based on this.
 - Improve the efficiency of calculate_paths_to_victory.php
 - Numerous other UI and back end tweaks.
 - Calculate eliminations more accurately.
 
 - Thanks to Brian Battaglia (botagrox) and Robert Jailall (enryonaku)


03/13/2009 v1.5

THIS VERSION REQUIRES YOU TO UPDATE YOUR DATABASE STRUCTURE.

If you have an existing install, please use mysqldump to back it up. Then, you will
need to copy over bracket submissions and reenter meta information. You will also 
need to copy over any payment information.

 - Added the ability to view your ranking under different scoring systems on the
   standings page.
 - Added js validation of all fields on the bracket submit page.
 - Added the ability to calculate and view end game scenarios. It's recommended
   that you only run this from the sweet 16 and on.
 - Added a scoring detail screen where you can see who everyone picked for every
   round and how they scored.
 - Added the ability to have users login and have their brackets highlighted on
   the ranking screens.
 - Added a users table to keep track of how many brackets a person has submitted
   and paid for.
 - Modified view.php to have a bracket style look rather than a list style look.
 - Added the ability to have different scoring values on a per-round-per-seed basis.
 - Numerous backend and database changes to support all of the above features.
 
 -Thanks to Rob J (enryonaku)

03/13/2009 v1.0.3

 -Added editable region names.

03/13/2009 v1.0.2

 - minor fixes in scoring .

03/17/2008 v1.0.1

 -Added an admin link to close bracket submission
   -Thanks to John Holder
 -Improved submission form javascript
   -Thanks to Rob J
	
03/15/2008 v1.0

 -Adjusted regions to this year's bracket (again)
 -Printable brackets from submission form
 -Minor typo-related bugfixes
 -Finally reached v1.0!

03/11/2008 v0.9

 -Retooled admin header
   -Created header.php
   -By request, added links back to admin area
 -Incorporated tiebreaker into standings and bracket editing
 -Fixed sessions in bracket submission
 -Removed more references to the pot if the entry fee is 0

03/06/2008 v0.8

 -Feature request: printable brackets
 -Display's correct team below crossed out one
 -Switched to session-based error messages
 -Adjusted regions to this year's bracket
 -Fix a bug that would allow users to view other brackets before the tournament 
 started

03/05/2008 v0.7

 -Fixed bracket viewing bug (reversed Final Four and Championship)
 -Feature request: allow bracket editing (in the admin area)

03/03/2008 v0.6.4

 -I need to be more careful with my releases...
 -Installation bug fix
 -Spelling fix
 -Removed old javascript file

03/03/2008 v0.6.3

 -Added rounding to the pot size and favorite team %
 -Feature request: automatically resume master bracket

02/26/2008 v0.6.2

 -Added support for free pools
 -Closed potential security holes
 -REALLY fixed the what-if generator...I hope

02/25/2008 v0.6

 -Modified the database structure
 -Fixed bugs mentioned in forum, including the what-if generator
 -Added some requested features
   -a "no mail" option
   -the ability to take a percentage of the pot instead of a flat amount
 -Optimized bracket submission
 -Moved the payment tracker to the navigation bar

02/20/2008 v0.5

 -First work in a while, preparing for the tournament
 -Fixed a few bugs found in the forums
 -Added an admin form for "Who's Paid?"
 -Project was changed to beta status

12/05/2007 v0.4.5

 -Fixed major bugs throughout the project...the last version should not have 
been released

11/23/2007 v0.4

 -Fixed many bugs including a showstopper in the "what if" system
 -Many unused TinyMCE files removed
 -Added master bracket updating system, complete with scoring algorithm
 -Added Sweet 16 trigger
 -Added "Rules" editor

11/15/2007 v0.3

 -Admin menu added
 -"Contact" removed from header
 -TinyMCE added to the package
 -Add/Delete blog post form created
 -Competition rule editor created
 -"Who's Paid" list finished, but not implemented

11/14/2007 v0.2

 -First release
