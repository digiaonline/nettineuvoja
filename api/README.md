# Nettineuvoja REST API

## Installation

Do the following to run the application:

- Run `cd /vagrant/app`
- Copy `.env.example` and name it `.env` and enter the missing variables
- Generate a new `APP_KEY` and `OAUTH2_CLIENT_SECRET` for your `api/.env` file by running `openssl rand -base64 32`
  - Note that you need to set the same `OAUTH2_CLIENT_SECRET` in your `admin-ui/.env`  
- Run `composer install` to install dependencies
- Run `php artisan doctrine:schema:update` to create/update database schema
- Run `php artisan doctrine:generate:proxies` to create entity cache files
- Run `php artisan doctrine:fixtures:load --path=database/fixtures` to create entity cache files

You can now access the API on `http://api.takuuapuri.dev`
