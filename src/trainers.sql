\echo 'Delete and recreate trainers db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE trainers;
CREATE DATABASE trainers;
\connect trainers

\i trainers-schema.sql
\i trainers-seed.sql

\echo 'Delete and recreate trainers_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE trainers_test;
CREATE DATABASE trainers_test;
\connect trainers_test

\i trainers-schema.sql