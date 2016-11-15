<?php namespace Nettineuvoja\Common\Facades;

use Illuminate\Support\Facades\Facade;
use Nettineuvoja\Common\Services\KutiClient;

/**
 * Class Kuti
 * @package Nettineuvoja\Common\Facades
 *
 * @method static bool|mixed post($url = null, array $options = [], $skipBaseUrl = false)
 * @method static bool|mixed get($url = null, array $options = [], $skipBaseUrl = false)
 */
class Kuti extends Facade
{

    /**
     * @inheritdoc
     */
    protected static function getFacadeAccessor()
    {
        return KutiClient::class;
    }
}
