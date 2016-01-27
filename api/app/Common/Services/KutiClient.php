<?php namespace Nettineuvoja\Common\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Message\RequestInterface;
use GuzzleHttp\Message\Response;
use Illuminate\Support\Facades\Log;
use Nord\Lumen\Core\Exception\Exception;

/**
 * Class KutiClient
 * @package Nettineuvoja\Common\Services
 */
class KutiClient
{

    /**
     * @var Client
     */
    private $client;

    /**
     * @var string
     */
    private $baseUrl;

    /**
     * @var array
     */
    private $defaultOptions;


    /**
     * Class constructor.
     *
     * @return KutiClient
     */
    public function __construct()
    {
        $this->client         = new Client();
        $this->baseUrl        = env('KUTI_URL');
        $this->defaultOptions = [
            'headers' => [
                'Accept' => 'application/json',
            ],
        ];
    }


    /**
     * @param string $url
     *
     * @throws Exception
     */
    public function setBaseUrl($url)
    {
        if (empty($url)) {
            throw new Exception('Base URL cannot be empty.', 500);
        }
        $this->baseUrl = $url;
    }


    /**
     * @param string|null $path
     * @param array       $options
     * @param bool        $skipBaseUrl
     *
     * @return bool|mixed
     * @throws Exception
     * @throws \Exception
     */
    public function get($path = null, array $options = [], $skipBaseUrl = false)
    {
        $url = ($skipBaseUrl ? $path : $this->baseUrl . $path);
        try {
            $options += $this->defaultOptions;
            /** @var Response $response */
            $response = $this->client->get($url, $options);
        } catch (Exception $e) {
            Log::error(sprintf('Could not GET from %s, Exception: %s, Code: %s, Options: %s', $this->baseUrl . $url,
                $e->getMessage(), $e->getCode(), var_export($options, true)));

            throw $e;
        }

        $responseBody = null;
        if ($response instanceof Response) {
            $body = $response->getBody();
            if (is_object($body)) {
                $responseBody = $body->getContents();
            }

            if (!empty($responseBody) && ($body = json_decode($responseBody))) {
                return $body;
            }
        }

        Log::error(sprintf('Could not parse response body. Response: %s', var_export($responseBody, true)));

        return false;
    }


    /**
     * @param string|null $path
     * @param array       $options
     * @param bool        $skipBaseUrl
     *
     * @return bool|mixed
     * @throws Exception
     * @throws \Exception
     */
    public function post($path = null, array $options = [], $skipBaseUrl = false)
    {
        $url = ($skipBaseUrl ? $path : $this->baseUrl . $path);
        try {
            $options += $this->defaultOptions;
            /** @var Response $response */
            $response = $this->client->post($url, $options);
        } catch (Exception $e) {
            Log::error(sprintf('Could not POST to %s, Exception: %s, Code: %s, Options: %s', $this->baseUrl . $url,
                $e->getMessage(), $e->getCode(), var_export($options, true)));

            throw $e;
        }

        $responseBody = null;
        if ($response instanceof Response) {
            $body = $response->getBody();
            if (is_object($body)) {
                $responseBody = $body->getContents();
            }
            if (!empty($responseBody) && ($body = json_decode($responseBody))) {
                return $body;
            }
        }
        Log::error(sprintf('Could not parse response body. Response: %s', var_export($responseBody, true)));

        return false;
    }
}
