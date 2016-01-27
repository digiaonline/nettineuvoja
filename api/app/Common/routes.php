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
    'namespace' => 'Nettineuvoja\Common\Http',
], function () use ($app) {
    // todo
});

// Access context routes

$app->group([
    'prefix'    => 'v1',
    'namespace' => 'Nettineuvoja\Access\Http',
], function () use ($app) {
    $app->post('auth/login', 'AuthController@login');
    $app->post('auth/validate', 'AuthController@validateToken');
    $app->post('auth/refresh', 'AuthController@refreshToken');
});

$app->group([
    'prefix'     => 'v1',
    'namespace'  => 'Nettineuvoja\Access\Http',
    'middleware' => 'oauth2',
], function () use ($app) {
    // User actions
    $app->post('users', 'UserController@createUser');
    $app->get('users', 'UserController@listUsers');
    $app->get('users/{user_id}', 'UserController@readUser');
    $app->put('users/{user_id}', 'UserController@updateUser');
    $app->delete('users/{user_id}', 'UserController@deleteUser');
    $app->get('me', 'UserController@readCurrentUser');
});

// Slides
$app->group([
    'prefix'    => 'v1',
    'namespace' => 'Nettineuvoja\Slides\Http',
], function () use ($app) {
    // Slides
    $app->get('slides', 'SlideController@listSlides');
    $app->get('slides/{id}', 'SlideController@readSlide');
});

$app->group([
    'prefix'     => 'v1',
    'namespace'  => 'Nettineuvoja\Slides\Http',
    'middleware' => 'oauth2',
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
    'namespace' => 'Nettineuvoja\Common\Http',
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
});
