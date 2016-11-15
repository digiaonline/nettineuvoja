<?php namespace Nettineuvoja\Access\Domain\Model;

use Nord\Lumen\Core\Contracts\Entity;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Support\Facades\Hash;
use Nord\Lumen\Core\Traits\HasIdentity;
use Nord\Lumen\Core\Traits\HasStatus;
use Nord\Lumen\Core\Domain\DomainId;
use Nord\Lumen\Core\Domain\Status;
use Nord\Lumen\Core\Exceptions\InvalidArgument;
use Nord\Lumen\Doctrine\ORM\Traits\AutoIncrements;
use Nord\Lumen\Doctrine\ORM\Traits\SoftDeletes;
use Nord\Lumen\Doctrine\ORM\Traits\Timestamps;

/**
 * Class User
 * @package Nettineuvoja\Access\Domain\Model
 */
class User implements Entity, AuthenticatableContract, CanResetPasswordContract
{

    use HasIdentity;
    use HasStatus;
    use Authenticatable;
    use CanResetPassword;
    use AutoIncrements;
    use Timestamps;
    use SoftDeletes;

    /**
     * @var string
     */
    private $email;

    /**
     * @var string
     */
    private $password;

    /**
     * @var null|string
     */
    private $rememberToken = null;


    /**
     * User constructor.
     *
     * @param DomainId $domainId
     * @param string   $email
     * @param string   $password
     * @param string   $firstName
     * @param string   $lastName
     */
    public function __construct(
        DomainId $domainId,
        $email,
        $password
    ) {
        $this->setDomainId($domainId);
        $this->setEmail($email);
        $this->setPassword($password);
        $this->setStatus(new Status(0));
    }


    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }


    /**
     * @param $email string
     */
    public function changeEmail($email)
    {
        $this->setEmail($email);
    }


    /**
     * @param $password
     */
    public function changePassword($password)
    {
        $this->setPassword($password);
    }


    /**
     * @inheritdoc
     */
    public function getAuthIdentifier()
    {
        return $this->getDomainId()->getValue();
    }


    /**
     * @inheritdoc
     */
    public function getRememberTokenName()
    {
        return 'rememberToken';
    }


    /**
     * @param string $email
     *
     * @throws InvalidArgument
     */
    private function setEmail($email)
    {
        if (empty($email)) {
            throw new InvalidArgument('User email cannot be empty.');
        }

        if (!is_string($email)) {
            throw new InvalidArgument('User email is malformed.');
        }

        $this->email = $email;
    }


    /**
     * @param string $password
     *
     * @throws InvalidArgument
     */
    private function setPassword($password)
    {
        if (empty($password)) {
            throw new InvalidArgument('User password cannot be empty.');
        }

        if (!is_string($password)) {
            throw new InvalidArgument('User password is malformed.');
        }

        /** @noinspection PhpUndefinedMethodInspection */
        $this->password = Hash::make($password);
    }
}
