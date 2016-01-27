<?php namespace Nettineuvoja\Access\Domain\Model;

use Nord\Lumen\Core\Domain\Model\Entity;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Support\Facades\Hash;
use Nord\Lumen\Core\Domain\Model\HasIdentity;
use Nord\Lumen\Core\Domain\Model\HasStatus;
use Nord\Lumen\Core\Domain\Model\ObjectId;
use Nord\Lumen\Core\Domain\Model\Status;
use Nord\Lumen\Core\Exception\InvalidArgument;
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
     * @var null|string
     */
    private $firstName = null;

    /**
     * @var null|string
     */
    private $lastName = null;


    /**
     * User constructor.
     *
     * @param ObjectId $objectId
     * @param string   $email
     * @param string   $password
     * @param string   $firstName
     * @param string   $lastName
     */
    public function __construct(
        ObjectId $objectId,
        $email,
        $password,
        $firstName,
        $lastName
    ) {
        $this->setObjectId($objectId);
        $this->setEmail($email);
        $this->setPassword($password);
        $this->setFirstName($firstName);
        $this->setLastName($lastName);
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
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }


    /**
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }


    /**
     * @return string
     */
    public function getFullName()
    {
        return $this->getFirstName() . ' ' . $this->getLastName();
    }


    /**
     * @return string
     */
    public function getInitials()
    {
        return substr($this->getFirstName(), 0, 1) . substr($this->getLastName(), 0, 1);
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
     * @param string $firstName
     */
    public function changeFirstName($firstName)
    {
        $this->setFirstName($firstName);
    }


    /**
     * @param string $lastName
     */
    public function changeLastName($lastName)
    {
        $this->setLastName($lastName);
    }


    /**
     * @inheritdoc
     */
    public function getAuthIdentifier()
    {
        return $this->getObjectId()->getValue();
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


    /**
     * @param string $firstName
     *
     * @throws InvalidArgument
     */
    private function setFirstName($firstName)
    {
        if (empty($firstName)) {
            throw new InvalidArgument('User first name cannot be empty.');
        }

        if (!is_string($firstName)) {
            throw new InvalidArgument('User first name is malformed.');
        }

        $this->firstName = $firstName;
    }


    /**
     * @param string $lastName
     *
     * @throws InvalidArgument
     */
    private function setLastName($lastName)
    {
        if (empty($lastName)) {
            throw new InvalidArgument('User last name cannot be empty.');
        }

        if (!is_string($lastName)) {
            throw new InvalidArgument('User last name is malformed.');
        }

        $this->lastName = $lastName;
    }
}
