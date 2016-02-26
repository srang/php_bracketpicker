<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class BracketCreateTest extends TestCase
{
    use DatabaseTransactions;
    /**
     * undocumented function
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }

    /**
     * create a bracket as admin
     */

    /**
     * create new bracket as user
     */

    private function getTestBracket() {
        $bracketRequest = array (
            '_method' => 'PUT',
            'name' => 'Sam Rang\'s Bracket',
            'user_id' => '374',
            'bracket_id' => '',
            'games' => array (
                6 => 
                array (
                    1 => 
                    array (
                        'T1' => 'Kansas',
                        'T2' => 'Connecticut',
                        'W' => 'Kansas',
                    ),
                ),
                5 => 
                array (
                    1 => 
                    array (
                        'T1' => 'Kansas',
                        'T2' => 'Indiana',
                        'W' => 'Kansas',
                    ),
                    2 => 
                    array (
                        'T1' => 'Connecticut',
                        'T2' => 'Texas Tech',
                        'W' => 'Connecticut',
                    ),
                ),
                4 => 
                array (
                    1 => 
                    array (
                        'T1' => 'Kansas',
                        'T2' => 'Iowa State',
                        'W' => 'Kansas',
                    ),
                    2 => 
                    array (
                        'T1' => 'Purdue',
                        'T2' => 'Indiana',
                        'W' => 'Indiana',
                    ),
                    3 => 
                    array (
                        'T1' => 'George Washington',
                        'T2' => 'Connecticut',
                        'W' => 'Connecticut',
                    ),
                    4 => 
                    array (
                        'T1' => 'Texas Tech',
                        'T2' => 'Wisconsin',
                        'W' => 'Texas Tech',
                    ),
                ),
                3 => 
                array (
                    1 => 
                    array (
                        'T1' => 'Kansas',
                        'T2' => 'Iowa',
                        'W' => 'Kansas',
                    ),
                    2 => 
                    array (
                        'T1' => 'West Virginia',
                        'T2' => 'Iowa State',
                        'W' => 'Iowa State',
                    ),
                    3 => 
                    array (
                        'T1' => 'USC',
                        'T2' => 'Purdue',
                        'W' => 'Purdue',
                    ),
                    4 => 
                    array (
                        'T1' => 'Louisville',
                        'T2' => 'Indiana',
                        'W' => 'Indiana',
                    ),
                    5 => 
                    array (
                        'T1' => 'George Washington',
                        'T2' => 'Seton Hall',
                        'W' => 'George Washington',
                    ),
                    6 => 
                    array (
                        'T1' => 'St Bonaventure',
                        'T2' => 'Connecticut',
                        'W' => 'Connecticut',
                    ),
                    7 => 
                    array (
                        'T1' => 'Texas Tech',
                        'T2' => 'Michigan',
                        'W' => 'Texas Tech',
                    ),
                    8 => 
                    array (
                        'T1' => 'Wisconsin',
                        'T2' => 'Georgetown',
                        'W' => 'Wisconsin',
                    ),
                ),
                2 => 
                array (
                    1 => 
                    array (
                        'T1' => 'Kansas',
                        'T2' => 'California',
                        'W' => 'Kansas',
                    ),
                    2 => 
                    array (
                        'T1' => 'Iowa',
                        'T2' => 'Duke',
                        'W' => 'Iowa',
                    ),
                    3 => 
                    array (
                        'T1' => 'West Virginia',
                        'T2' => 'North Carolina',
                        'W' => 'West Virginia',
                    ),
                    4 => 
                    array (
                        'T1' => 'Dayton',
                        'T2' => 'Iowa State',
                        'W' => 'Iowa State',
                    ),
                    5 => 
                    array (
                        'T1' => 'Utah',
                        'T2' => 'USC',
                        'W' => 'USC',
                    ),
                    6 => 
                    array (
                        'T1' => 'Purdue',
                        'T2' => 'Florida State',
                        'W' => 'Purdue',
                    ),
                    7 => 
                    array (
                        'T1' => 'Louisville',
                        'T2' => 'Colorado',
                        'W' => 'Louisville',
                    ),
                    8 => 
                    array (
                        'T1' => 'Arizona',
                        'T2' => 'Indiana',
                        'W' => 'Indiana',
                    ),
                    9 => 
                    array (
                        'T1' => 'George Washington',
                        'T2' => 'Chattanooga',
                        'W' => 'George Washington',
                    ),
                    10 => 
                    array (
                        'T1' => 'Seton Hall',
                        'T2' => 'Pittsburgh',
                        'W' => 'Seton Hall',
                    ),
                    11 => 
                    array (
                        'T1' => 'Wichita St',
                        'T2' => 'St Bonaventure',
                        'W' => 'St Bonaventure',
                    ),
                    12 => 
                    array (
                        'T1' => 'Connecticut',
                        'T2' => 'Valparaiso',
                        'W' => 'Connecticut',
                    ),
                    13 => 
                    array (
                        'T1' => 'Texas Tech',
                        'T2' => 'Villanova',
                        'W' => 'Texas Tech',
                    ),
                    14 => 
                    array (
                        'T1' => 'Michigan',
                        'T2' => 'Cincinnati',
                        'W' => 'Michigan',
                    ),
                    15 => 
                    array (
                        'T1' => 'Wisconsin',
                        'T2' => 'Butler',
                        'W' => 'Wisconsin',
                    ),
                    16 => 
                    array (
                        'T1' => 'Georgetown',
                        'T2' => 'Stanford',
                        'W' => 'Georgetown',
                    ),
                ),
                1 => 
                array (
                    1 => 
                    array (
                        'T1' => 'Kansas',
                        'T2' => 'Ohio State',
                        'W' => 'Kansas',
                    ),
                    2 => 
                    array (
                        'T1' => 'California',
                        'T2' => 'Maryland',
                        'W' => 'California',
                    ),
                    3 => 
                    array (
                        'T1' => 'Iowa',
                        'T2' => 'Xavier',
                        'W' => 'Iowa',
                    ),
                    4 => 
                    array (
                        'T1' => 'Duke',
                        'T2' => 'Hofstra',
                        'W' => 'Duke',
                    ),
                    5 => 
                    array (
                        'T1' => 'Virginia',
                        'T2' => 'West Virginia',
                        'W' => 'West Virginia',
                    ),
                    6 => 
                    array (
                        'T1' => 'North Carolina',
                        'T2' => 'SMU',
                        'W' => 'North Carolina',
                    ),
                    7 => 
                    array (
                        'T1' => 'Miami (FL)',
                        'T2' => 'Dayton',
                        'W' => 'Dayton',
                    ),
                    8 => 
                    array (
                        'T1' => 'Iowa State',
                        'T2' => 'Kentucky',
                        'W' => 'Iowa State',
                    ),
                    9 => 
                    array (
                        'T1' => 'Utah',
                        'T2' => 'Michigan State',
                        'W' => 'Utah',
                    ),
                    10 => 
                    array (
                        'T1' => 'USC',
                        'T2' => 'Notre Dame',
                        'W' => 'USC',
                    ),
                    11 => 
                    array (
                        'T1' => 'Texas',
                        'T2' => 'Purdue',
                        'W' => 'Purdue',
                    ),
                    12 => 
                    array (
                        'T1' => 'Florida',
                        'T2' => 'Florida State',
                        'W' => 'Florida State',
                    ),
                    13 => 
                    array (
                        'T1' => 'Louisville',
                        'T2' => 'Baylor',
                        'W' => 'Louisville',
                    ),
                    14 => 
                    array (
                        'T1' => 'Colorado',
                        'T2' => 'South Carolina',
                        'W' => 'Colorado',
                    ),
                    15 => 
                    array (
                        'T1' => 'Arizona',
                        'T2' => 'Oregon State',
                        'W' => 'Arizona',
                    ),
                    16 => 
                    array (
                        'T1' => 'Providence',
                        'T2' => 'Indiana',
                        'W' => 'Indiana',
                    ),
                    17 => 
                    array (
                        'T1' => 'George Washington',
                        'T2' => 'Monmouth',
                        'W' => 'George Washington',
                    ),
                    18 => 
                    array (
                        'T1' => 'Chattanooga',
                        'T2' => 'Stony Brook',
                        'W' => 'Chattanooga',
                    ),
                    19 => 
                    array (
                        'T1' => 'Seton Hall',
                        'T2' => 'Kansas State',
                        'W' => 'Seton Hall',
                    ),
                    20 => 
                    array (
                        'T1' => 'Pittsburgh',
                        'T2' => 'VCU',
                        'W' => 'Pittsburgh',
                    ),
                    21 => 
                    array (
                        'T1' => 'Wichita St',
                        'T2' => 'Akron',
                        'W' => 'Wichita St',
                    ),
                    22 => 
                    array (
                        'T1' => 'St Bonaventure',
                        'T2' => 'Syracuse',
                        'W' => 'St Bonaventure',
                    ),
                    23 => 
                    array (
                        'T1' => 'San Diego State',
                        'T2' => 'Connecticut',
                        'W' => 'Connecticut',
                    ),
                    24 => 
                    array (
                        'T1' => 'South Dakota State',
                        'T2' => 'Valparaiso',
                        'W' => 'Valparaiso',
                    ),
                    25 => 
                    array (
                        'T1' => 'Texas Tech',
                        'T2' => 'Alabama',
                        'W' => 'Texas Tech',
                    ),
                    26 => 
                    array (
                        'T1' => 'Villanova',
                        'T2' => 'Davidson',
                        'W' => 'Villanova',
                    ),
                    27 => 
                    array (
                        'T1' => 'Michigan',
                        'T2' => 'Vanderbilt',
                        'W' => 'Michigan',
                    ),
                    28 => 
                    array (
                        'T1' => 'Princeton',
                        'T2' => 'Cincinnati',
                        'W' => 'Cincinnati',
                    ),
                    29 => 
                    array (
                        'T1' => 'Wisconsin',
                        'T2' => 'Yale',
                        'W' => 'Wisconsin',
                    ),
                    30 => 
                    array (
                        'T1' => 'Butler',
                        'T2' => 'Georgia',
                        'W' => 'Butler',
                    ),
                    31 => 
                    array (
                        'T1' => 'Georgetown',
                        'T2' => 'Temple',
                        'W' => 'Georgetown',
                    ),
                    32 => 
                    array (
                        'T1' => 'Stanford',
                        'T2' => 'LSU',
                        'W' => 'Stanford',
                    ),
                ),
            ),
        );
        return $bracketRequest;
    }
}
