<?php namespace Nettineuvoja\Slides\Domain\Model;

use Nord\Lumen\Core\Contracts\Entity;
use Nord\Lumen\Core\Domain\DomainId;
use Nord\Lumen\Core\Domain\Status;
use Nord\Lumen\Core\Traits\HasIdentity;
use Nord\Lumen\Core\Traits\HasStatus;
use Nord\Lumen\Doctrine\ORM\Traits\AutoIncrements;
use Nord\Lumen\Doctrine\ORM\Traits\SoftDeletes;
use Nord\Lumen\Doctrine\ORM\Traits\Timestamps;

/**
 * Class Slide
 * @package Nettineuvoja\Slides\Domain\Model
 */
class Slide implements Entity
{

    /**
     * @var int
     */
    const STATUS_DRAFT = 0;
    /**
     * @var int
     */
    const STATUS_PUBLISHED = 1;

    use HasIdentity;
    use AutoIncrements;
    use Timestamps;
    use SoftDeletes;
    use HasStatus;

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $label;

    /**
     * @var string
     */
    private $summaryLabel;

    /**
     * @var array
     */
    private $elements;

    /**
     * @var array
     */
    private $style;

    /**
     * @var int
     */
    private $saveAfter = 0;

    /**
     * @var int
     */
    private $summaryAfter = 0;

    /**
     * @var int
     */
    private $excludeFromSummary = 0;

    /**
     * @var int
     */
    private $orderNumber;


    /**
     * @param DomainId $domainId
     * @param string   $name
     * @param string   $label
     */
    public function __construct(
        DomainId $domainId,
        $name,
        $label
    ) {
        $this->setDomainId($domainId);
        $this->setName($name);
        $this->setLabel($label);
        $this->setStatus(new Status(self::STATUS_PUBLISHED));
    }


    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }


    /**
     * @param string $name
     */
    public function changeName($name)
    {
        $this->setName($name);
    }


    /**
     * @return string
     */
    public function getLabel()
    {
        return $this->label;
    }


    /**
     * @param string $label
     */
    public function changeLabel($label)
    {
        $this->setLabel($label);
    }


    /**
     * @return string
     */
    public function getSummaryLabel()
    {
        return $this->summaryLabel;
    }


    /**
     * @param string $summaryLabel
     */
    public function changeSummaryLabel($summaryLabel)
    {
        $this->setSummaryLabel($summaryLabel);
    }


    /**
     * @return array
     */
    public function getElements()
    {
        return $this->elements;
    }


    /**
     * @param array $elements
     */
    public function changeElements(array $elements = [])
    {
        $this->setElements($elements);
    }


    /**
     * @return array
     */
    public function getStyle()
    {
        return $this->style;
    }


    /**
     * @param array $style
     */
    public function changeStyle(array $style = [])
    {
        $this->setStyle($style);
    }


    /**
     * @return int
     */
    public function getSaveAfter()
    {
        return $this->saveAfter;
    }


    /**
     * @param int $saveAfter
     */
    public function changeSaveAfter($saveAfter)
    {
        $this->setSaveAfter($saveAfter);
    }


    /**
     * @return int
     */
    public function getSummaryAfter()
    {
        return $this->summaryAfter;
    }


    /**
     * @param int $summaryAfter
     */
    public function changeSummaryAfter($summaryAfter)
    {
        $this->setSummaryAfter($summaryAfter);
    }


    /**
     * @return int
     */
    public function getExcludeFromSummary()
    {
        return $this->excludeFromSummary;
    }


    /**
     * @param int $excludeFromSummary
     */
    public function changeExcludeFromSummary($excludeFromSummary)
    {
        $this->setExcludeFromSummary($excludeFromSummary);
    }


    /**
     * @return int
     */
    public function getOrderNumber()
    {
        return $this->orderNumber;
    }


    /**
     * @param int $orderNumber
     */
    public function changeOrderNumber($orderNumber)
    {
        $this->setOrderNumber($orderNumber);
    }


    /**
     * @param int $status
     */
    public function changeStatus($status)
    {
        $this->setStatus(new Status($status));
    }


    /**
     * @param string|null $name
     */
    private function setName($name = null)
    {
        $this->name = $name;
    }


    /**
     * @param string|null $label
     */
    private function setLabel($label = null)
    {
        $this->label = $label;
    }


    /**
     * @param string|null $summaryLabel
     */
    private function setSummaryLabel($summaryLabel = null)
    {
        $this->summaryLabel = $summaryLabel;
    }


    /**
     * @param array $elements
     */
    private function setElements(array $elements = [])
    {
        $this->elements = $elements;
    }


    /**
     * @param array $style
     */
    private function setStyle(array $style = [])
    {
        $this->style = $style;
    }


    /**
     * @param int $saveAfter
     */
    private function setSaveAfter($saveAfter)
    {
        $this->saveAfter = $saveAfter;
    }


    /**
     * @param int $summaryAfter
     */
    private function setSummaryAfter($summaryAfter)
    {
        $this->summaryAfter = $summaryAfter;
    }


    /**
     * @param int $excludeFromSummary
     */
    private function setExcludeFromSummary($excludeFromSummary)
    {
        $this->excludeFromSummary = $excludeFromSummary;
    }


    /**
     * @param int|null $orderNumber
     */
    private function setOrderNumber($orderNumber = null)
    {
        $this->orderNumber = $orderNumber;
    }
}
