<?php
// Slides
$app->group([
    'prefix'    => 'v1',
    'namespace' => 'Nettineuvoja\Slides\Http\Controllers',
], function () use ($app) {
    // Slides
    $app->get('slides', 'SlideController@listSlides');
    $app->get('slides/{id}', 'SlideController@readSlide');
});

$app->group([
    'prefix'     => 'v1',
    'namespace'  => 'Nettineuvoja\Slides\Http\Controllers',
    'middleware' => 'auth',
], function () use ($app) {
    // Slides
    $app->post('slides', 'SlideController@createSlide');
    $app->post('slides/update_order', 'SlideController@updateOrder');
    $app->put('slides/{id}', 'SlideController@updateSlide');
    $app->delete('slides/{id}', 'SlideController@deleteSlide');
});
