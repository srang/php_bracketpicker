<?php

namespace App\Providers;

use Log;
use Config;
//use App\Tournament;
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
        // TODO: make datadriven
        view()->share('tourney_name', 'March Madness');
        view()->share('tourney_state', collect([ 'name' => 'setup' ]));
//        $tourney = Tournament::where('active',true)->first();
//        view()->share('tourney_name', $tourney->name);
//        view()->share('tourney_state', $tourney->state);
//        view()->share('tourney', $tourney);
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
