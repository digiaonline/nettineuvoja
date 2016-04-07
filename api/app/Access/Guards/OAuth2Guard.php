<?php

namespace Nettineuvoja\Access\Guards;

use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Guard as GuardContract;
use Nettineuvoja\Access\App\UserService;
use Nord\Lumen\Core\Traits\AuthenticatesUsers;

/**
 * Class OAuth2Guard
 * @package Nettineuvoja\Access\Guards
 */
class OAuth2Guard implements GuardContract
{

    use GuardHelpers;
    use AuthenticatesUsers;


    /**
     * OAuth2Guard constructor.
     *
     * @param UserService $service
     */
    public function __construct(UserService $service)
    {
        $this->provider = $service;
    }


    /**
     * @inheritdoc
     */
    public function user()
    {
        if (!isset($this->user)) {
            $this->setUser($this->provider->getCurrentUser());
        }

        return $this->user;
    }


    /**
     * @inheritdoc
     */
    public function validate(array $credentials = [])
    {
        $user = $this->provider->retrieveByCredentials($credentials);

        return $user !== null ? $this->provider->validateCredentials($user, $credentials) : false;
    }
}
