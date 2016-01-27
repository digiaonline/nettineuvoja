<?php namespace Nettineuvoja\Access\App;

use Crisu83\Overseer\Entity\Subject;
use Nettineuvoja\Access\Domain\Model\User;
use Nettineuvoja\Access\Infrastructure\UserRepository;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Nord\Lumen\Core\App\AuthenticatesUsers;
use Nord\Lumen\Core\App\CreatesIdentities;
use Nord\Lumen\Core\App\ManagesEntities;
use Nord\Lumen\Rbac\Contracts\SubjectProvider;

/**
 * Class UserService
 * @package Nettineuvoja\Access\App
 */
final class UserService implements UserProvider, SubjectProvider
{

    use ManagesEntities;
    use AuthenticatesUsers;
    use CreatesIdentities;


    /**
     * @param string $id
     *
     * @return User|null
     */
    public function getUser($id)
    {
        return $this->getRepository()->findByObjectId($id);
    }


    /**
     * @return User|null
     */
    public function getCurrentUser()
    {
        if (app()->runningInConsole()) {
            return null;
        }

        return $this->getRepository()->findByObjectId($this->getOAuth2Service()->getResourceOwnerId());
    }


    /**
     * @param string $email
     *
     * @return User|null
     */
    public function getUserByEmail($email)
    {
        return $this->getRepository()->findByEmail($email);
    }


    /**
     * @return Collection
     */
    public function getUsers()
    {
        return new Collection($this->getRepository()->findAll());
    }


    /**
     * @param string $email
     * @param string $password
     * @param string $firstName
     * @param string $lastName
     *
     * @return User
     */
    public function createUser(
        $email,
        $password,
        $firstName,
        $lastName
    ) {
        $objectId = $this->createObjectId(function ($value) {
            return $this->getRepository()->objectIdExists($value);
        });

        $user = new User($objectId, $email, $password, $firstName, $lastName);

        $this->saveEntityAndCommit($user);

        return $user;
    }


    /**
     * @param User        $user
     * @param string      $email
     * @param string      $password
     * @param string|null $firstName
     * @param string|null $lastName
     */
    public function updateUser(
        User $user,
        $email,
        $password,
        $firstName = null,
        $lastName = null
    ) {
        if ($user->getEmail() !== $email) {
            $user->changeEmail($email);
        }
        if (!empty($password)) {
            $user->changePassword($password);
        }
        if ($firstName !== null && $user->getFirstName() !== $firstName) {
            $user->changeFirstName($firstName);
        }
        if ($lastName !== null && $user->getLastName() !== $lastName) {
            $user->changeLastName($lastName);
        }

        $this->updateEntityAndCommit($user);
    }


    /**
     * @param User $user
     */
    public function deleteUser(User $user)
    {
        $this->deleteEntityAndCommit($user);
    }


    public function changeUserPassword(User $user, $password)
    {
        $user->changePassword($password);

        $this->saveEntityAndCommit($user);
    }


    /**
     * @inheritdoc
     * @return User|null
     */
    public function retrieveById($identifier)
    {
        return $this->getUser($identifier);
    }


    /**
     * @inheritdoc
     * @return User|null
     */
    public function retrieveByToken($identifier, $token)
    {
        return $this->getRepository()->findByRememberToken($token);
    }


    /**
     * @inheritdoc
     *
     * @param Authenticatable|User $user
     */
    public function updateRememberToken(Authenticatable $user, $token)
    {
        $user->setRememberToken($token);

        $this->saveEntityAndCommit($user);
    }


    /**
     * @inheritdoc
     */
    public function retrieveByCredentials(array $credentials)
    {
        return $this->getRepository()->findByEmail($credentials['email']);
    }


    /**
     * @inheritdoc
     */
    public function validateCredentials(Authenticatable $user, array $credentials)
    {
        /** @noinspection PhpUndefinedMethodInspection */
        return Hash::check($credentials['password'], $user->getAuthPassword());
    }


    /**
     * @return UserRepository
     */
    private function getRepository()
    {
        return $this->getEntityRepository(User::class);
    }


    /**
     * @return Subject
     */
    public function getSubject()
    {
        return $this->getCurrentUser();
    }
}
