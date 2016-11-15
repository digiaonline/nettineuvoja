<?php namespace Nettineuvoja\Access\Infrastructure;

use Nettineuvoja\Access\Domain\Model\User;
use Nord\Lumen\Core\Infrastructure\EntityRepository;

/**
 * Class UserRepository
 * @package Nettineuvoja\Access\Infrastructure
 */
class UserRepository extends EntityRepository
{

    /**
     * @param string $email
     *
     * @return User|null
     */
    public function findByEmail($email)
    {
        return $this->findOneBy(['email' => $email]);
    }


    /**
     * @param string $token
     *
     * @return User|null
     */
    public function findByRememberToken($token)
    {
        return $this->findOneBy(['rememberToken' => $token]);
    }
}
