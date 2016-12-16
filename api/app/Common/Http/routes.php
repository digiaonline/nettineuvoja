<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return 'It works!';
});

// App routes

$app->group([
    'prefix'    => 'v1',
    'namespace' => 'Nettineuvoja\Common\Http\Controllers',
], function () use ($app) {
    // todo
});

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

// Common
$app->group([
    'prefix'    => 'v1',
    'namespace' => 'Nettineuvoja\Common\Http\Controllers',
], function () use ($app) {
    // Kuti
    $app->post('kuti/save_session', 'KutiController@saveSession');
    $app->get('kuti/get_session_id', 'KutiController@getSessionId');

    // Autocomplete
    $app->post('autocomplete', 'AutoCompleteController@autocomplete');

    // Mail
    $app->post('mail', 'MailController@sendMail');

    // Languages
    $app->get('languages', 'LanguageController@listLanguages');

    // Files
    $app->post('files', 'FileController@uploadFile');
});

// Common, with auth.
$app->group([
    'prefix'     => 'v1',
    'namespace'  => 'Nettineuvoja\Common\Http\Controllers',
    'middleware' => 'auth',
], function () use ($app) {
    // Diagram
    $app->post('diagram', 'DiagramController@createDiagram');
});
