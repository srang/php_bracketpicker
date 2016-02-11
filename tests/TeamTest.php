<?php

use App\Team;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TeamTest extends TestCase
{
    use DatabaseTransactions;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testTeamCreate()
    {
        $name = 'Duke';
        $mascot = 'Blue Devils';
        $icon = '/path/icon/to';
        $primary_color = 'FF00FF';
        $accent_color = 'F0F0F0';
        $team = new Team([
            'name' => $name,
            'mascot' => $mascot,
            'icon_path' => $icon,
            'primary_color' => $primary_color,
            'accent_color' => $accent_color,
        ]);
        $this->assertInstanceOf('App\Team',$team);
        $this->assertEquals($team->name, $name);
        $this->assertEquals($team->mascot, $mascot);
        $this->assertEquals($team->icon_path, $icon);
        $this->assertEquals($team->primary_color, $primary_color);
        $this->assertEquals($team->accent_color, $accent_color);
    }
}
