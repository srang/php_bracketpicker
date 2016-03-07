<?php

namespace App\Strategies;

use App\Strategies\UpdateBaseBracketStrategy;

use DB;
use Log;
use Illuminate\Http\Request;


/**
 * Concrete implementation of AbstractCreateBracketStrategy for
 * normal users and their brackets
 *
 */
class UpdateBaseBracketStrategy extends AbstractUpdateBracketStrategy
{
    /**
     * flag for master bracket
     */
    protected $master = 0;

    protected $teamRepo;

    /**
     * Create a new bracket from request
     *
     * @param Request  $req
     * @return Bracket|null
     */
    public function read($req)
    {
        DB::beginTransaction();
        Log::info('Updating bracket '.$this->existingBracket->name.' using UpdateBaseBracketStrategy');
        $bracket = $this->readHelper($req);
        if ($this->save($bracket,$req->get('name'),$req->get('user_id'))) {
            Log::info('Update to bracket '.$bracket->name.' was successful');
            // alert user
            $alert = [
                'message' => 'Update successful',
                'level' => 'success'
            ];
        } else {
            Log::error('Something went wrong with user bracket creation');
            // alert user
            $alert = [
                'message' => 'Update unsuccessful',
                'level' => 'danger'
            ];
        }
        return $alert;
    }

}
