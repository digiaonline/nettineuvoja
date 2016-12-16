<?php

// Access context routes
$app->group([
    'prefix'    => 'v1',
    'namespace' => 'Nettineuvoja\Access\Http\Controllers',
], function () use ($app) {
    $app->post('auth/login', 'AuthController@login');
    $app->post('auth/validate', 'AuthController@validateToken');
    $app->post('auth/refresh', 'AuthController@refreshToken');
});

$app->group([
    'prefix'     => 'v1',
    'namespace'  => 'Nettineuvoja\Access\Http\Controllers',
    'middleware' => 'auth',
], function () use ($app) {
    // User actions
    $app->post('users', 'UserController@createUser');
    $app->get('users', 'UserController@listUsers');
    $app->get('users/{user_id}', 'UserController@readUser');
    $app->put('users/{user_id}', 'UserController@updateUser');
    $app->delete('users/{user_id}', 'UserController@deleteUser');
    $app->get('me', 'UserController@readCurrentUser');
});
