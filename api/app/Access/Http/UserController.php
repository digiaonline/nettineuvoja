<?php namespace Nettineuvoja\Access\Http;

use Nettineuvoja\Access\App\HandlesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Laravel\Lumen\Routing\Controller;
use Nettineuvoja\Access\Transformers\UserTransformer;
use Nord\Lumen\Core\Traits\CreatesHttpResponses;
use Nord\Lumen\Core\Traits\SerializesData;
use Nord\Lumen\Core\Traits\ValidatesData;

/**
 * Class UserController
 * @package Nettineuvoja\Access\Http
 */
class UserController extends Controller
{

    use HandlesUsers;
    use CreatesHttpResponses;
    use ValidatesData;
    use SerializesData;


    /**
     * Creates a user.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function createUser(Request $request)
    {
        $this->tryValidateData($request->all(), [
            'email'      => 'required|max:255',
            'password'   => 'min:5',
        ], function ($errors) {
            $this->throwValidationFailed('ERROR.VALIDATION_FAILED', $errors);
        });

        $email     = $request->get('email');
        $password  = $request->get('password');

        // Make sure we cannot create a user with an existing email.
        if ($this->userExists($email)) {
            return $this->unprocessableEntityResponse('ERROR.USER_EXISTS');
        }

        $user = $this->getUserService()->createUser($email, $password);

        return $this->createdResponse($this->serializeItem($user, new UserTransformer())->toArray());
    }


    /**
     * Updates a user.
     *
     * @param Request $request
     * @param string  $id
     *
     * @return Response
     */
    public function updateUser(Request $request, $id)
    {
        $user = $this->tryGetUser($id, function () {
            $this->throwNotFound('ERROR.USER_NOT_FOUND');
        });

        $this->tryValidateData($request->all(), [
            'email'      => 'required|max:255',
            'password'   => 'min:5',
            'first_name' => 'required|max:255',
            'last_name'  => 'required|max:255',
        ], function ($errors) {
            $this->throwValidationFailed('ERROR.VALIDATION_FAILED', $errors);
        });

        $email     = $request->get('email');
        $password  = $request->get('password');
        $firstName = $request->get('first_name');
        $lastName  = $request->get('last_name');

        $this->getUserService()->updateUser($user, $email, $password, $firstName, $lastName);

        return $this->okResponse($this->serializeItem($user, new UserTransformer())->toArray());
    }


    /**
     * Returns a user.
     *
     * @param string $id
     *
     * @return Response
     */
    public function readUser($id)
    {
        $user = $this->tryGetUser($id, function () {
            $this->throwNotFound('ERROR.USER_NOT_FOUND');
        });

        return $this->okResponse($this->serializeItem($user, new UserTransformer())->toArray());
    }


    /**
     * Deletes a user.
     *
     * @param string $id
     *
     * @return Response
     */
    public function deleteUser($id)
    {
        $user = $this->tryGetUser($id, function () {
            $this->throwNotFound('ERROR.USER_NOT_FOUND');
        });

        $this->getUserService()->deleteUser($user);

        return $this->okResponse();
    }


    /**
     * Lists users.
     *
     * @return Response
     */
    public function listUsers()
    {
        $users = $this->getUserService()->getUsers();

        return $this->okResponse($this->serializeCollection($users, new UserTransformer())->toArray());
    }


    /**
     * Returns the authenticated user.
     *
     * @return Response
     */
    public function readCurrentUser()
    {
        $user = $this->tryGetCurrentUser(function () {
            $this->throwNotFound('ERROR.USER_NOT_FOUND');
        });

        return $this->okResponse($this->serializeItem($user, new UserTransformer())->toArray());
    }
}
