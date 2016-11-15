<?php

namespace Nettineuvoja\Access\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as AuthFactory;
use Illuminate\Http\Request;
use Nord\Lumen\Core\Traits\CreatesHttpResponses;

/**
 * Class Authenticate
 * @package Nettineuvoja\Access\Http\Middleware
 */
class Authenticate
{
    use CreatesHttpResponses;

    /**
     * The authentication guard factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    private $authFactory;

    /**
     * Create a new middleware instance.
     *
     * @param AuthFactory $authFactory
     */
    public function __construct(AuthFactory $authFactory)
    {
        $this->authFactory = $authFactory;
    }

    /**
     * Handle an incoming request.
     *
     * @param  Request     $request
     * @param  Closure     $next
     * @param  string|null $guard
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $guard = null)
    {
        if ($this->authFactory->guard($guard)->guest()) {
            return $this->accessDeniedResponse('Access denied.');
        }

        return $next($request);
    }
}
