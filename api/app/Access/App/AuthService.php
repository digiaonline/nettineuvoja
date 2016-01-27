<?php namespace Nettineuvoja\Access\App;

use Illuminate\Support\Facades\Auth;

/**
 * Class AuthService
 * @package Nettineuvoja\Access\App
 */
final class AuthService
{

    /**
     * @param string $username
     * @param string $password
     *
     * @return bool
     */
    public function authenticate($username, $password)
    {
        /** @noinspection PhpUndefinedMethodInspection */
        return Auth::attempt(['email' => $username, 'password' => $password]);
    }
}
