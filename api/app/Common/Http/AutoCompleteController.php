<?php namespace Nettineuvoja\Common\Http;

use Illuminate\Http\Request;
use Nettineuvoja\Common\Facades\Kuti;
use Laravel\Lumen\Routing\Controller;
use Nord\Lumen\Core\App\CreatesHttpResponses;
use Nord\Lumen\Core\App\SerializesData;
use Nord\Lumen\Core\App\ValidatesData;

/**
 * Class AutoCompleteController
 * @package Nettineuvoja\Common\Http
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

        return $this->okResponse(Kuti::get($url, [], true));
    }
}
