<?php namespace Nettineuvoja\Slides\App;

use Closure;
use Nettineuvoja\Slides\Domain\Model\Slide;

/**
 * Class HandlesSlides
 * @package Nettineuvoja\Slides\App
 */
trait HandlesSlides
{

    /**
     * @param string $id
     *
     * @return Slide|null
     */
    private function getSlide($id)
    {
        return $this->getSlideService()->getSlide($id);
    }


    /**
     * @param string  $id
     * @param Closure $notFound
     *
     * @return Slide
     */
    private function tryGetSlide($id, Closure $notFound)
    {
        if (($slide = $this->getSlide($id)) === null) {
            call_user_func($notFound);
        }

        return $slide;
    }


    /**
     * @return SlideService
     */
    private function getSlideService()
    {
        return app(SlideService::class);
    }
}
