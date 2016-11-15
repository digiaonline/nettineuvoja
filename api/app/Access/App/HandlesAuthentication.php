<?php namespace Nettineuvoja\Access\App;

/**
 * Class HandlesAuthentication
 * @package Nettineuvoja\Access\App
 */
trait HandlesAuthentication
{

    /**
     * @return AuthService
     */
    public function getAuthService()
    {
        return app(AuthService::class);
    }
}
