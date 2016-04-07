<?php namespace Nettineuvoja\Common\Http;

use Illuminate\Http\Request;
use Nord\Lumen\Core\Traits\CreatesHttpResponses;
use Nord\Lumen\Core\Traits\ValidatesData;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class FileController
 * @package Nettineuvoja\Common\Http
 */
class FileController
{

    use CreatesHttpResponses;
    use ValidatesData;


    /**
     * @param Request $request
     */
    public function uploadFile(Request $request)
    {
        $this->tryValidateData($request->all(), [
            'file' => 'required',
        ], function ($errors) {
            $this->throwValidationFailed('ERROR.VALIDATION_FAILED', $errors);
        });

        $file = $request->file('file');

        if (!$file instanceof UploadedFile) {
            $this->throwFatalError('ERROR.FATAL_ERROR');
        }

        return $this->okResponse([
            'filename' => $file->getClientOriginalName(),
            'data'     => base64_encode(file_get_contents($file->getPathname())),
        ]);
    }
}
