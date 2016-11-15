<?php namespace Nettineuvoja\Common\Http;

use Nord\Lumen\Core\Traits\CreatesHttpResponses;

/**
 * Class LanguageController
 * @package Nettineuvoja\Common\Http
 */
class LanguageController
{

    use CreatesHttpResponses;

    /**
     * @var array
     */
    private static $languages = [
        [
            'iso_code'     => 'fi',
            'abbreviation' => 'FI',
            'label'        => 'Finnish',
        ],
        [
            'iso_code'     => 'sv',
            'abbreviation' => 'SV',
            'label'        => 'Swedish',
        ],
        [
            'iso_code'     => 'en',
            'abbreviation' => 'EN',
            'label'        => 'English',
        ],
    ];


    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function listLanguages()
    {
        return $this->okResponse(self::$languages);
    }
}
