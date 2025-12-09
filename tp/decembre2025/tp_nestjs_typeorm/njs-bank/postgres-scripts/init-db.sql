
DROP TABLE IF EXISTS operation;
DROP TABLE IF EXISTS customer_account;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS customer;

CREATE TABLE customer(
    id BIGSERIAL  NOT NULL,
	firstname VARCHAR(64),
	lastname VARCHAR(64),
	email VARCHAR(64),
	PRIMARY KEY(id));

CREATE TABLE account(
    num BIGSERIAL  NOT NULL,
	label VARCHAR(64),
	balance double precision,
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
    id BIGSERIAL  NOT NULL,
	label VARCHAR(64),
	amount double precision,
	account_num integer,
	opDateTime timestamp ,
	PRIMARY KEY(id));

ALTER TABLE operation ADD CONSTRAINT valid_account_num_in_operation 
FOREIGN KEY (account_num) REFERENCES account(num);	


INSERT INTO customer(firstname,lastname,email) 
     VALUES  ('Alain','Therieur','alain.therieur@gmail.com'),
			 ('Jean','Bon','jean.bon@gmail.com');	
	
INSERT INTO account(label,balance) 
    VALUES   ('compte 1',600),
  		 	 ('compte 2',500),
    		 ('compte 3',200),
    		 ('compte 4',250);	

INSERT INTO operation(label,amount,opDateTime,account_num) 
    VALUES ('achat a',-56,'2024-11-04 10:10:10',1),
	     ('achat b',-46,'2024-11-04 10:12:10',1);	 

INSERT INTO customer_account(customer_id,account_num) 
     VALUES (1,1),(1,2),
	        (2,3),(2,4);	 

SELECT * FROM customer;
SELECT * FROM account;
SELECT * FROM operation;
SELECT * FROM customer_account;

