#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$DB_USER" <<-EOSQL
    CREATE USER admin WITH PASSWORD 'admin';
    ALTER ROLE admin CREATEDB CREATEROLE;
    DROP DATABASE IF EXISTS med_center;
EOSQL

psql -v  ON_ERROR_STOP=1 -d postgres -U admin <<-EOSQL
    CREATE USER client WITH PASSWORD 'client';
    GRANT admin TO client;
    CREATE DATABASE med_center;
    \c med_center
EOSQL