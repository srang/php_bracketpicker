<?php

namespace App\Http\Middleware;

use App\VerificationToken;
use Config;
use Closure;
use Mail;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\Guard;

class VerifyMiddleware
{
    /**
     * The Guard implementation.
     *
     * @var Guard
     */
    protected $auth;

    /**
     * Create a new filter instance.
     *
     * @param  Guard  $auth
     * @return void
     */
    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = $this->auth->getUser();

        if (!$user->confirmed())
        {
            if($user->status->status != 'unverified') {
                abort(403, 'Inactive account');
            }

            // If the user has not had an activation token set
            $token = $user->verification_token;

            if (empty($token))
            {
                VerifyMiddleware::sendVerification($user);
            } else if ($token->expired()) {
                $token->delete();
                VerifyMiddleware::sendVerification($user);
            }
            return redirect()->guest('/verify');
        }
        return $next($request);
    }

    public static function sendVerification($user)
    {
        $key = Config::get('app.key');
        $token = VerificationToken::create([
            'token' => hash_hmac('sha256', str_random(40), $key),
            'user_id' => $user->user_id,
            'expires' => Carbon::now()->addDays(3)
        ]);
        $link = url('/verify/'.$token);
        Mail::send('mail.verify', ['link' => $link, 'name' => $user->name], function($message) use ($user){
            $message->to($user->email, $user->name)
                ->subject('Activate your account');
        });
    }
}
