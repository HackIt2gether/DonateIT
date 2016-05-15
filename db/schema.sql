DROP TABLE if EXISTS donors;


CREATE TABLE donors (
       donor_id SERIAL PRIMARY KEY UNIQUE,
       name VARCHAR(255),
       email VARCHAR(255),
       pickup_address VARCHAR(255),
       category TEXT,
       item_description TEXT     
);
