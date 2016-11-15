# Takuuapuri Consumer UI

## Installation

* Run `cd /vagrant/consumer-ui`
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

You can now access the site at `http://takuuapuri.dev`
