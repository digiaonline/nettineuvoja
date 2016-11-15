<?php
return [
    'mandrill' => [
        'secret' => env('MANDRILL_SECRET', 'RandomSecreyKey!'),
    ],
    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET', 'RandomSecretKey!'),
    ],
];
