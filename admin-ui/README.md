# Takuuapuri Admin UI

## Installation

* Run `cd /vagrant/admin-ui`
* Copy `.env.example` to `.env` and add the missing details. The OAuth secret must match the one in `api/.env`.
* Run `npm install && bower install` to install all dependencies

## Start development environment

```
npm start
```

## Create development build

```
npm run build
```

## Create distribution build

```
npm run dist
```

## Login to the application

Access the admin application on `http://admin.nettineuvoja.dev` and enter the following credentials:

- Username: **demo@example.com**
- Password: **demo12**
