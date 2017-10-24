<?php

namespace Nettineuvoja\Common\Http;

use GuzzleHttp\Client;
use GuzzleHttp\Message\Response;
use GuzzleHttp\Stream\Stream;
use Illuminate\Http\Request;
use Nord\Lumen\Core\Traits\CreatesHttpResponses;
use Nord\Lumen\Core\Traits\ValidatesData;

/**
 * Class DiagramController.
 *
 * @package Nettineuvoja\Common\Http
 */
class DiagramController
{

    use CreatesHttpResponses;
    use ValidatesData;

    /**
     * @var Client
     */
    private $client;

    /**
     * DiagramController constructor.
     */
    public function __construct()
    {
        $this->client = new Client();
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function createDiagram(Request $request)
    {
        $this->tryValidateData($request->all(), [
            'required' => 'dsl_text',
        ], function ($errors) {
            $this->throwValidationFailed('ERROR.VALIDATION_FAILED', $errors);
        });

        $url = $this->getYumlUrl($request->get('dsl_text'));

        if (is_null($url)) {
            $this->throwNotFound('ERROR.YUML_IMAGE_NOT_FOUND');
        }

        return $this->okResponse(
            [
                'data' => [
                    'url' => sprintf('%s/%s', env('YUML_URL'), $url),
                ],
            ]
        );
    }

    /**
     * @param string $text
     *
     * @return null|string
     */
    private function getYumlUrl($text)
    {
        $response = $this->client->post(sprintf('%s/diagram/plain/class', env('YUML_URL')), [
            'headers' => ['Content-Type' => 'multipart/form-data'],
            'body'    => [
                'dsl_text' => $text,
            ],
        ]);

        if ($response instanceof Response) {
            $body = $response->getBody();
            if ($body instanceof Stream) {
                return $body->getContents();
            }
        }

        return null;
    }
}
