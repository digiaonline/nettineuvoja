<?php namespace Nettineuvoja\Common\Http;

use Illuminate\Http\Request;
use Nettineuvoja\Common\Facades\Kuti;
use Laravel\Lumen\Routing\Controller;
use Nord\Lumen\Core\App\CreatesHttpResponses;
use Nord\Lumen\Core\App\SerializesData;
use Nord\Lumen\Core\App\ValidatesData;

/**
 * Class KutiController
 * @package Nettineuvoja\Common\Http
 */
class KutiController extends Controller
{

    use ValidatesData;
    use CreatesHttpResponses;
    use SerializesData;


    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSessionId()
    {
        return $this->okResponse(Kuti::get('/tallennus/muodostasessiotunnus'));
    }


    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveSession(Request $request)
    {
        $this->tryValidateData($request->all(), [
            'session' => 'required',
        ], function ($errors) {
            $this->throwValidationFailed('ERROR.VALIDATION_FAILED', $errors);
        });

        $session = $request->get('session');

        return $this->okResponse(Kuti::post('/tallennus/lomake', ['body' => json_encode($session)]));
    }
}
