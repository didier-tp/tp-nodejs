CREATE DATABASE IF NOT EXISTS nestJsBankDb;
USE nestJsBankDb;

DROP TABLE IF EXISTS operation;
DROP TABLE IF EXISTS customer_account;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS customer;

CREATE TABLE customer(
    id integer auto_increment,
	firstname VARCHAR(64),
	lastname VARCHAR(64),
	email VARCHAR(64),
	PRIMARY KEY(id));

CREATE TABLE account(
    num integer auto_increment,
	label VARCHAR(64),
	balance double,
	PRIMARY KEY(num));

CREATE TABLE customer_account(
	customer_id integer,
    account_num integer,
	PRIMARY KEY(customer_id,account_num));

ALTER TABLE customer_account ADD CONSTRAINT valid_customer_id_in_customer_account
FOREIGN KEY (customer_id) REFERENCES customer(id);	

ALTER TABLE customer_account ADD CONSTRAINT valid_account_num_in_customer_account
FOREIGN KEY (account_num) REFERENCES account(num);
	
CREATE TABLE operation(
    id integer auto_increment,
	label VARCHAR(64),
	amount double,
	account_num integer,
	opdatetime DateTime,
	PRIMARY KEY(id));

ALTER TABLE operation ADD CONSTRAINT valid_account_num_in_operation 
FOREIGN KEY (account_num) REFERENCES account(num);	

###################### insertions ###########################################

INSERT INTO customer(id,firstname,lastname,email) 
     VALUES  (1,'Alain','Therieur','alain.therieur@gmail.com'),
			 (2,'Jean','Bon','jean.bon@gmail.com');	
	
INSERT INTO account(num,label,balance) 
    VALUES   (1,'compte 1',600),
  		 	 (2,'compte 2',500),
    		 (3,'compte 3',200),
    		 (4,'compte 4',250);	

INSERT INTO operation(id,label,amount,opdatetime,account_num) 
    VALUES (1,'achat a',-56,'2024-11-04 10:10:10',1),
	     (2,'achat b',-46,'2024-11-04 10:12:10',1);	 

INSERT INTO customer_account(customer_id,account_num) 
     VALUES (1,1),(1,2),
	        (2,3),(2,4);	 

###################### VERIF ###########################################
show tables;
SELECT * FROM customer;
SELECT * FROM account;
SELECT * FROM operation;
SELECT * FROM customer_account;

