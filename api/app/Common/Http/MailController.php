<?php namespace Nettineuvoja\Common\Http;

use GuzzleHttp\Message\Response;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;
use Laravel\Lumen\Routing\Controller;
use Nord\Lumen\Core\App\CreatesHttpResponses;
use Nord\Lumen\Core\App\SerializesData;
use Nord\Lumen\Core\App\ValidatesData;

/**
 * Class MailController
 * @package Nettineuvoja\Common\Http
 */
class MailController extends Controller
{

    use CreatesHttpResponses;
    use ValidatesData;
    use SerializesData;


    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendMail(Request $request, Mailer $mailer)
    {
        $this->tryValidateData($request->all(), [
            'subject'    => 'required',
            'from_email' => 'required',
            'from_name'  => 'required',
            'to'         => 'required',
        ], function ($errors) {
            $this->throwValidationFailed('ERROR.VALIDATION_FAILED', $errors);
        });

        // Collect the data.
        $data = [
            'subject'   => $request->get('subject'),
            'fromEmail' => $request->get('from_email'),
            'fromName'  => $request->get('from_name'),
            'to'        => $request->get('to'),
            'htmlBody'  => $request->get('html'),
            'textBody'  => $request->get('text'),
        ];

        // Send the email.
        $response = $mailer->send(['html-message', 'text-message'], $data, function ($message) use ($data) {
            /** @var Message $message */
            $message->subject($data['subject']);
            foreach ($data['to'] as $to) {
                $message->to($to['email']);
            }
            $message->from($data['fromEmail'], $data['fromName']);
        });

        if ($response instanceof Response && $response->getStatusCode() === 200) {
            return $this->okResponse();
        } else {
            return $this->errorResponse('ERROR.COULD_NOT_SEND_EMAIL');
        }
    }
}
