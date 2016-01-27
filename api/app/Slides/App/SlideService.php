<?php namespace Nettineuvoja\Slides\App;

use Illuminate\Support\Collection;
use Nettineuvoja\Slides\Domain\Model\Slide;
use Nettineuvoja\Slides\Infrastructure\SlideRepository;
use Nord\Lumen\Core\App\CreatesIdentities;
use Nord\Lumen\Core\App\ManagesEntities;

/**
 * Class SlideService
 * @package Nettineuvoja\Slides\App
 */
class SlideService
{

    use ManagesEntities;
    use CreatesIdentities;


    /**
     * @param string $name
     * @param string $label
     *
     * @return Slide
     * @throws \Nord\Lumen\Core\Exception\FatalError
     */
    public function createSlide($name, $label)
    {
        $objectId = $this->createObjectId(function ($value) {
            return $this->getRepository()->objectIdExists($value);
        });

        $slide = new Slide($objectId, $name, $label);

        $this->saveEntityAndCommit($slide);

        return $slide;
    }


    /**
     * @param Slide       $slide
     * @param string      $name
     * @param string      $label
     * @param string|null $summaryLabel
     * @param array       $elements
     * @param array       $style
     * @param int         $saveAfter
     * @param int         $summaryAfter
     * @param int         $excludeFromSummary
     * @param int|null    $orderNumber
     * @param int         $status
     */
    public function updateSlide(
        Slide $slide,
        $name,
        $label,
        $summaryLabel = null,
        array $elements = [],
        array $style = [],
        $saveAfter = 0,
        $summaryAfter = 0,
        $excludeFromSummary = 0,
        $orderNumber = null,
        $status
    ) {
        if ($slide->getName() !== $name) {
            $slide->changeName($name);
        }
        if ($slide->getLabel() !== $label) {
            $slide->changeLabel($label);
        }
        if ($slide->getSummaryLabel() !== $summaryLabel) {
            $slide->changeSummaryLabel($summaryLabel);
        }
        if ($slide->getElements() !== $elements) {
            $slide->changeElements($elements);
        }
        if ($slide->getStyle() !== $style) {
            $slide->changeStyle($style);
        }
        if ($slide->getSaveAfter() !== $saveAfter) {
            $slide->changeSaveAfter($saveAfter);
        }
        if ($slide->getSummaryAfter() !== $summaryAfter) {
            $slide->changeSummaryAfter($summaryAfter);
        }
        if ($slide->getExcludeFromSummary() !== $excludeFromSummary) {
            $slide->changeExcludeFromSummary($excludeFromSummary);
        }
        if ($slide->getOrderNumber() !== $orderNumber) {
            $slide->changeOrderNumber($orderNumber);
        }
        if ($slide->getStatusValue() !== $status) {
            $slide->changeStatus($status);
        }

        $this->updateEntityAndCommit($slide);
    }


    /**
     * @param Slide $slide
     */
    public function deleteSlide(Slide $slide)
    {
        $this->deleteEntityAndCommit($slide);
    }


    /**
     * @param string $id
     *
     * @return Slide|null
     */
    public function getSlide($id)
    {
        return $this->getRepository()->findByObjectId($id);
    }


    /**
     * @return Collection
     */
    public function getSlides()
    {
        return new Collection($this->getRepository()->findAll());
    }


    /**
     * @return SlideRepository
     */
    private function getRepository()
    {
        return $this->getEntityRepository(Slide::class);
    }
}
