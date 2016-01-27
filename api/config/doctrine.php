<?php

return [
    'mapping'         => 'xml',
    'paths'           => [
        base_path('app/Access/Infrastructure/Resources/ORM'),
        base_path('app/Slides/Infrastructure/Resources/ORM'),
        base_path('vendor/crisu83/overseer/src/Doctrine/Resources'),
        base_path('vendor/nordsoftware/lumen-oauth2/src/Doctrine/Resources'),
    ],
    'filters'         => [
        'trashed' => [
            'class'   => 'Nord\Lumen\Doctrine\ORM\Filters\TrashedFilter',
            'enabled' => true,
        ],
    ],
    'event_listeners' => [
        'softDeletes' => [
            'class'  => 'Nord\Lumen\Doctrine\ORM\EventListeners\SoftDeletesListener',
            'events' => 'onFlush',
        ],
    ],
    'types'           => [
        'object_id' => 'Nord\Lumen\Core\Infrastructure\ObjectIdType',
        'status'    => 'Nord\Lumen\Core\Infrastructure\StatusType',
    ],
    'proxy'           => [
        'directory' => storage_path('doctrine/proxies'),
        'namespace' => 'Proxies',
    ],
];
