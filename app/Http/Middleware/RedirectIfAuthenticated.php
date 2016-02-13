<?php

namespace App\Http\Middleware;

use Log;
use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        Log::info("guest".$guard);
        if (Auth::guard($guard)->check()) {
            Log::info('redirecting authenticated user');
            return redirect('home');
        }
        Log::info('not authenticated user');

        return $next($request);
    }
}
