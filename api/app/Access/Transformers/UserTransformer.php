<?php

namespace Nettineuvoja\Access\Transformers;

use League\Fractal\TransformerAbstract;
use Nettineuvoja\Access\Domain\Model\User;

class UserTransformer extends TransformerAbstract
{

    /**
     * @param User $user
     *
     * @return array
     */
    public function transform(User $user)
    {
        return [
            'id'         => $user->getDomainIdValue(),
            'email'      => $user->getEmail(),
            'created_at' => $user->getCreatedAtTimestamp(),
            'updated_at' => $user->getUpdatedAtTimestamp(),
        ];
    }
}
