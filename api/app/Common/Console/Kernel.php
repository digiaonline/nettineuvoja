<?php namespace Nettineuvoja\Common\Console;

use Illuminate\Console\Scheduling\Schedule;

/**
 * Class Kernel
 * @package Nettineuvoja\Common\Console
 */
class Kernel extends \Laravel\Lumen\Console\Kernel
{

    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [];


    /**
     * Define the application's command schedule.
     *
     * @param Schedule $schedule
     *
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Schedule tasks
    }
}
