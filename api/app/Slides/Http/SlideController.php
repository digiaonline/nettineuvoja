<?php namespace Nettineuvoja\Slides\Http;

use Illuminate\Http\Request;
use Nettineuvoja\Slides\App\HandlesSlides;
use Laravel\Lumen\Routing\Controller;
use Nettineuvoja\Slides\Transformers\SlideTransformer;
use Nord\Lumen\Core\Traits\CreatesHttpResponses;
use Nord\Lumen\Core\Traits\SerializesData;
use Nord\Lumen\Core\Traits\ValidatesData;

/**
 * Class SlideController
 * @package Nettineuvoja\Slides\Http
 */
class SlideController extends Controller
{

    use ValidatesData;
    use CreatesHttpResponses;
    use SerializesData;
    use HandlesSlides;


    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function createSlide(Request $request)
    {
        $name  = $request->get('name');
        $label = $request->get('label');

        $slide = $this->getSlideService()->createSlide($name, $label);

        return $this->createdResponse($this->serializeItem($slide, new SlideTransformer())->toArray());
    }


    /**
     * @param Request $request
     * @param string  $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateSlide(Request $request, $id)
    {

        $slide = $this->tryGetSlide($id, function () {
            $this->throwNotFound('ERROR.SLIDE_NOT_FOUND');
        });

        $this->tryValidateData($request->all(), [

        ], function ($errors) {
            $this->throwValidationFailed('ERROR.VALIDATION_FAILED', $errors);
        });

        $name               = $request->get('name');
        $label              = $request->get('label');
        $summaryLabel       = $request->get('summary_label');
        $elements           = $request->get('elements', []);
        $style              = $request->get('style', []);
        $saveAfter          = $request->get('save_after');
        $summaryAfter       = $request->get('summary_after');
        $excludeFromSummary = $request->get('exclude_from_summary');
        $orderNumber        = $request->get('order_number');
        $status             = $request->get('status');

        $this->getSlideService()->updateSlide($slide, $name, $label, $summaryLabel, $elements, $style, $saveAfter,
            $summaryAfter, $excludeFromSummary, $orderNumber, $status);

        return $this->okResponse($this->serializeItem($slide, new SlideTransformer())->toArray());
    }


    /**
     * @param Request $request
     */
    public function updateOrder(Request $request)
    {
        // Todo: Do we need this?
    }


    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function listSlides()
    {
        $slides = $this->getSlideService()->getSlides();

        return $this->okResponse($this->serializeCollection($slides, new SlideTransformer())->toArray());
    }


    /**
     * @param string $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function readSlide($id)
    {
        $slide = $this->tryGetSlide($id, function () {
            $this->throwNotFound('ERROR.SLIDE_NOT_FOUND');
        });

        return $this->okResponse($this->serializeItem($slide, new SlideTransformer())->toArray());
    }


    /**
     * @param string $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteSlide($id)
    {

        $slide = $this->tryGetSlide($id, function () {
            $this->throwNotFound('ERROR.SLIDE_NOT_FOUND');
        });

        $this->getSlideService()->deleteSlide($slide);

        return $this->okResponse();
    }
}
