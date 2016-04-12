<?php

namespace Nettineuvoja\Slides\Transformers;

use League\Fractal\TransformerAbstract;
use Nettineuvoja\Slides\Domain\Model\Slide;

class SlideTransformer extends TransformerAbstract
{

    /**
     * @param Slide $slide
     *
     * @return array
     */
    public function transform(Slide $slide)
    {
        return [
            'id'                   => $slide->getDomainIdValue(),
            'name'                 => $slide->getName(),
            'label'                => $slide->getLabel(),
            'summary_label'        => $slide->getSummaryLabel(),
            'elements'             => $slide->getElements(),
            'style'                => $slide->getStyle(),
            'save_after'           => $slide->getSaveAfter(),
            'summary_after'        => $slide->getSummaryAfter(),
            'exclude_from_summary' => $slide->getExcludeFromSummary(),
            'created_at'           => $slide->getCreatedAtTimestamp(),
            'updated_at'           => $slide->getUpdatedAtTimestamp(),
            'status'               => (int) $slide->getStatusValue(),
        ];
    }
}
