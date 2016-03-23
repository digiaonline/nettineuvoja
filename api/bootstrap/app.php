<?php

require_once __DIR__ . '/../vendor/autoload.php';

Dotenv::load(__DIR__ . '/../', env('ENV_FILE', '.env'));

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| Here we will load the environment and create the application instance
| that servers as the central piece of the framework. We'll use this
| application as an "IoC" container and router for this framework.
|
*/

$app = new Laravel\Lumen\Application(
    realpath(__DIR__ . '/../')
);

$app->configure('app');
$app->configure('auth');
$app->configure('view');
$app->configure('database');
$app->configure('doctrine');
$app->configure('oauth2');
$app->configure('serializer');
$app->configure('rbac');
$app->configure('services');
$app->configure('mail');

$app->withFacades();

/*
|--------------------------------------------------------------------------
| Register Container Bindings
|--------------------------------------------------------------------------
|
| Now we will register a few bindings in the service container. We will
| register the exception handler and the console kernel. You may add
| your own bindings here if you like or you can make another file.
|
*/

$app->singleton(Illuminate\Contracts\Debug\ExceptionHandler::class, Nord\Lumen\Core\App\Exception\Handler::class);
$app->singleton(Illuminate\Contracts\Console\Kernel::class, Nettineuvoja\Common\Console\Kernel::class);

/*
|--------------------------------------------------------------------------
| Register Middleware
|--------------------------------------------------------------------------
|
| Next, we will register the middleware with the application. These can
| be global middleware that run before and after each request into a
| route or middleware that'll be assigned to some specific routes.
|
*/

$app->middleware([
    // 'Illuminate\Cookie\Middleware\EncryptCookies',
    // 'Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse',
    // 'Illuminate\Session\Middleware\StartSession',
    // 'Illuminate\View\Middleware\ShareErrorsFromSession',
    Nord\Lumen\Cors\CorsMiddleware::class,
]);

$app->routeMiddleware([
    // 'csrf' => 'Laravel\Lumen\Http\Middleware\VerifyCsrfToken',
    'oauth2' => Nord\Lumen\OAuth2\Middleware\OAuth2Middleware::class,
]);

/*
|--------------------------------------------------------------------------
| Register Service Providers
|--------------------------------------------------------------------------
|
| Here we will register all of the application's service providers which
| are used to bind services into the container. Service providers are
| totally optional, so you are not required to uncomment this line.
|
*/

// CORS
$app->register(Nord\Lumen\Cors\CorsServiceProvider::class);

// Doctrine
$app->register(Nord\Lumen\Doctrine\ORM\DoctrineServiceProvider::class);

// OAuth2
$app->register(Nord\Lumen\OAuth2\Doctrine\DoctrineServiceProvider::class);
$app->register(Nord\Lumen\OAuth2\OAuth2ServiceProvider::class);

// RBAC
$app->register(Nord\Lumen\Rbac\Doctrine\DoctrineStorageServiceProvider::class);
$app->register(Nord\Lumen\Rbac\RbacServiceProvider::class);

// Serializer
$app->register(Nord\Lumen\Serializer\SerializerServiceProvider::class);

// Date
$app->register(Jenssegers\Date\DateServiceProvider::class);

/*
|--------------------------------------------------------------------------
| Extend Managers
|--------------------------------------------------------------------------
|
| todo: Write this
|
*/

// @see http://laravel.com/docs/5.0/extending#authentication
Auth::extend('nettineuvoja', function ($app) {
    return $app[Nettineuvoja\Access\App\UserService::class];
});

/*
|--------------------------------------------------------------------------
| Load The Application Routes
|--------------------------------------------------------------------------
|
| Next we will include the routes file so that they can all be added to
| the application. This will provide all of the URLs the application
| can respond to, as well as the controllers that may handle them.
|
*/

require __DIR__ . '/../app/Common/routes.php';

return $app;
