<?php

namespace Nettineuvoja\Access\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Nettineuvoja\Access\App\UserService;
use Nettineuvoja\Access\Guards\OAuth2Guard;

/**
 * Class AuthServiceProvider
 * @package Nettineuvoja\Access\Providers
 */
class AuthServiceProvider extends ServiceProvider
{

    /**
     * @inheritdoc
     */
    public function register()
    {
        //
    }


    /**
     * @inheritdoc
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        /** @noinspection PhpUndefinedMethodInspection */
        Auth::provider('doctrine', function ($app) {
            return $app[UserService::class];
        });

        /** @noinspection PhpUndefinedMethodInspection */
        Auth::extend('oauth2', function ($app, $name, array $config) {
            /** @noinspection PhpUndefinedMethodInspection */
            return new OAuth2Guard(Auth::createUserProvider($config['provider']));
        });
    }
}
