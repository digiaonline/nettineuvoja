#!/usr/bin/env bash

WORK_DIR=$(pwd)
SCRIPT_PATH=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)
cd ${SCRIPT_PATH}/..
php artisan doctrine:schema:update && php artisan doctrine:generate:proxies
cd ${WORK_DIR}
