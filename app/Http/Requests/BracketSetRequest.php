<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class BracketSetRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $bracketid = $this->route('bracket');
        if(Auth::user()->hasRole('admin')) {
            return true;
        } else if (Bracket::where('bracket_id',$bracketid)->where('user_id',Auth::id())->exists()) {
            return true;
        }
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
        ];
    }
}
