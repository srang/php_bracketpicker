<?php

use App\Bracket;
use App\Region;
use App\Team;
use App\Repositories\TeamRepository;
use App\Factories\BracketFactory;
use App\Exceptions\BracketValidationException;
use App\Strategies\ValidateBaseBracketStrategy;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class BracketValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected $validator;
    protected $teamRepo;

    /**
     * Sets up base user and admin for tests
     */
    public function setUp()
    {
        parent::setUp();
        $this->teamRepo = new TeamRepository();
        $this->validator = new ValidateBaseBracketStrategy($this->teamRepo);
    }

    /**
     *
     * @test
     */
    public function testValidBracketId()
    {
        $bracket = factory(Bracket::class)->create();
        $bracket->save();
        $errors = collect([]);
        $valid_id = $bracket->bracket_id;
        $invalid_id = -1;
        $null_id = null;
        $this->validator->checkAssertion(array($this->validator,'assertValidBracketId'),[$valid_id],true,$errors);
        $this->assertTrue($errors->count() == 0);
        $errors = collect([]);
        $this->validator->checkAssertion(array($this->validator,'assertValidBracketId'),[$invalid_id],true,$errors);
        $this->assertTrue($errors->count() > 0);
        $this->validator->checkAssertion(array($this->validator,'assertValidBracketId'),[$null_id],true,$errors);
        $this->assertTrue($errors->count() > 0);
    }


    /**
     * test exceptions are thrown
     * @test
    public function testExceptionsThrown()
    {

    }
     */

    /**
     * team can be created
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
        $region = Region::all()->first();
        $rank = 2;
        $team = new Team([
            'name' => $name,
            'mascot' => $mascot,
            'icon_path' => $icon,
            'primary_color' => $primary_color,
            'accent_color' => $accent_color,
            'region_id' => $region->region_id,
            'rank' => $rank
        ]);
        $this->assertInstanceOf('App\Team',$team);
        $this->assertEquals($team->name, $name);
        $this->assertEquals($team->mascot, $mascot);
        $this->assertEquals($team->icon_path, $icon);
        $this->assertEquals($team->primary_color, $primary_color);
        $this->assertEquals($team->accent_color, $accent_color);
        $this->assertEquals($team->region_id, $region->region_id);
        $this->assertEquals($team->rank, $rank);
    }
}