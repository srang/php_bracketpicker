<?php

namespace App\Strategies;

use Log;
use DB;
use App\Bracket;


/**
 * Concrete implementation of AbstractCreateBracketStrategy for
 * normal users and their brackets
 *
 */
class UpdateMasterBracketStrategy extends AbstractUpdateBracketStrategy
{
    /**
     * flag for master bracket
     */
    protected $master = 1;
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
        Log::info('Updating master bracket using UpdateMasterBracketStrategy');
        $bracket = $this->readHelper($req);
        if ($this->save($bracket,$req->get('name'),null)) {
            // score brackets
            $alert = [
                'message' => 'Master Bracket Updated.',
                'level' => 'success'
            ];
        } else {
            // notify admin
            $alert = [
                'message' => 'Save unsuccessful',
                'level' => 'danger'
            ];
        }
    }
}
