# PostgresSQL

CREATE DATABASE friends;

DROP TABLE IF EXISTS friend;

CREATE TABLE friend(
    id TEXT PRIMARY KEY, 
    fname TEXT, 
    lname TEXT, 
    profession TEXT
);

