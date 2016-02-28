<?php

namespace App\Providers;

use Log;
use Config;
use App\Tournament;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $tourney = Tournament::where('active',true)->first();
        view()->share('tourney_name', $tourney->name);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        $monolog = Log::getMonolog();
        foreach($monolog->getHandlers() as $handler) {
            $handler->setLevel(Config::get('app.log-level'));
        }
    }
}
