<?php namespace Nettineuvoja\Common\Http\Controllers;

use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;
use Nettineuvoja\Common\Facades\Kuti;
use Laravel\Lumen\Routing\Controller;
use Nord\Lumen\Core\Traits\CreatesHttpResponses;
use Nord\Lumen\Core\Traits\SerializesData;
use Nord\Lumen\Core\Traits\ValidatesData;

/**
 * Class AutoCompleteController
 * @package Nettineuvoja\Common\Http\Controllers
 */
class AutoCompleteController extends Controller
{

    use CreatesHttpResponses;
    use ValidatesData;
    use SerializesData;


    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function autocomplete(Request $request)
    {
        $this->tryValidateData($request->all(), [
            'source' => 'required',
        ], function ($errors) {
            $this->throwValidationFailed('ERROR.VALIDATION_FAILED', $errors);
        });

        $url = $request->get('source');

        // Don't treat 404 as an error, just return an empty result instead
        try {
            return $this->okResponse(Kuti::get($url, [], true));
        } catch (ClientException $e) {
            if ($e->getCode() === 404) {
                return $this->okResponse([]);
            }

            throw $e;
        }
    }
}
