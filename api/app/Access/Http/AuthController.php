<?php namespace Nettineuvoja\Access\Http;

use Nettineuvoja\Access\App\HandlesAuthentication;
use Nettineuvoja\Access\App\HandlesUsers;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;
use League\OAuth2\Server\Exception\OAuthException;
use Nord\Lumen\Core\App\AuthenticatesUsers;
use Nord\Lumen\Core\App\CreatesHttpResponses;
use Nord\Lumen\Core\App\ValidatesData;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class AuthController
 * @package Nettineuvoja\Access\Http
 */
class AuthController extends Controller
{

    use AuthenticatesUsers;
    use CreatesHttpResponses;
    use HandlesAuthentication;
    use HandlesUsers;
    use ValidatesData;


    /**
     * Authenticates a user.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function login(Request $request)
    {
        $this->tryValidateData($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ], function ($errors) {
            $this->throwUnprocessableEntity($errors);
        });

        $username = $request->get('username');
        $password = $request->get('password');

        $user = $this->getUserService()->getUserByEmail($username);

        if ($user === null) {

            return $this->forbiddenResponse('ERROR.LOGIN_FAILED');
        }

        if (!$this->getAuthService()->authenticate($username, $password)) {

            return $this->forbiddenResponse('ERROR.LOGIN_FAILED');
        }

        try {
            return $this->okResponse($this->getOAuth2Service()->issueAccessToken());
        } catch (OAuthException $e) {
            return $this->accessDeniedResponse($e->getMessage());
        }
    }


    /**
     * Validates an access token.
     *
     * @return Response
     */
    public function validateToken()
    {
        try {
            $this->getOAuth2Service()->validateAccessToken();

            return $this->okResponse();
        } catch (OAuthException $e) {
            return $this->accessDeniedResponse('Access token not found.');
        }
    }


    /**
     * Refreshes an access token.
     *
     * @return Response
     */
    public function refreshToken()
    {
        try {
            return $this->okResponse($this->getOAuth2Service()->issueAccessToken());
        } catch (OAuthException $e) {
            return $this->forbiddenResponse('Refresh token not found.');
        }
    }
}
