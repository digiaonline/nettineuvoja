<?php namespace Nettineuvoja\Access\App;

use Closure;
use Nettineuvoja\Access\Domain\Model\User;

/**
 * Class HandlesUsers
 * @package Nettineuvoja\Access\App
 */
trait HandlesUsers
{

    /**
     * @param string $id
     *
     * @return User|null
     */
    private function getUser($id)
    {
        return $this->getUserService()->getUser($id);
    }


    /**
     * @param string $email
     *
     * @return bool
     */
    private function userExists($email)
    {
        return $this->getUserService()->getUserByEmail($email) !== null;
    }


    /**
     * @param string  $id
     * @param Closure $notFound
     *
     * @return User
     */
    private function tryGetUser($id, Closure $notFound)
    {
        if (($user = $this->getUser($id)) === null) {
            call_user_func($notFound);
        }

        return $user;
    }


    /**
     * @return User|null
     */
    private function getCurrentUser()
    {
        return $this->getUserService()->getCurrentUser();
    }


    /**
     * @param Closure $notFound
     *
     * @return User
     */
    private function tryGetCurrentUser(Closure $notFound)
    {
        if (($user = $this->getCurrentUser()) === null) {
            call_user_func($notFound);
        }

        return $user;
    }


    /**
     * @return UserService
     */
    private function getUserService()
    {
        return app(UserService::class);
    }
}
