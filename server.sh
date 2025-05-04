#!/bin/bash

read -sp "Enter MySQL password: " MYSQL_PWD
echo

export HBNB_MYSQL_USER="oasis_admin"
export HBNB_MYSQL_PWD="$MYSQL_PWD"
export HBNB_MYSQL_HOST="localhost"
export HBNB_MYSQL_DB="oasis"
export HBNB_ENV="0.0.0.0"
export HBNB_TYPE_STORAGE="db"

python3 -m api.v1.app


