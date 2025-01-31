#!/bin/bash
set -e

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Check if required environment variables are set
if [ -z "$DATABASE_NAME" ]; then
  echo "Error: DATABASE_NAME is not set."
  exit 1
fi

if [ -z "$DATABASE_USER" ]; then
  echo "Error: DATABASE_USER is not set."
  exit 1
fi

if [ -z "$DATABASE_PASSWORD" ]; then
  echo "Error: DATABASE_PASSWORD is not set."
  exit 1
fi

export PGPASSWORD=$DATABASE_PASSWORD

psql -v ON_ERROR_STOP=1 --username "$DATABASE_USER" --dbname "postgres" <<-EOSQL
    CREATE DATABASE $DATABASE_NAME;
EOSQL
