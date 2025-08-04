USE mydb

CREATE TABLE
IF NOT EXISTS usersdata
(
id INT AUTO_INCREMENT PRIMARY KEY, 
username VARCHAR
(50) NOT NULL UNIQUE,
email VARCHAR
(100) NOT NULL UNIQUE, 
password_hash VARCHAR
(255) NOT NULL, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT chk_email_format CHECK
(email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
)


INSERT INTO usersdata
    (username,email,password_hash)
VALUES
    ('Viewsonic', 20000, '$2b$10$fSyjH1MPScbvo1p4QAjg0.EIsIaJPaWI56twsieyO.jq1y1tqgZYq')


DROP TABLE usersdata


CREATE TABLE products (
        product_id INT PRIMARY KEY AUTO_INCREMENT,
        product_name VARCHAR
(100) NOT NULL,
        price DECIMAL
(10, 2) NOT NULL,
        user_id INT,
        FOREIGN KEY
(user_id) REFERENCES newusertable
(user_id)
    );


ALTER TABLE newusertable 
    ADD COLUMN deleted_at TIMESTAMP NULL


ALTER TABLE newproducts DROP COLUMN user_id

ALTER TABLE newusertable ADD COLUMN product_id VARCHAR
(25)


INSERT INTO newproducts
    (product_name, price)
VALUES
    ('Wireless Mouse', 19.99),
    ('Gaming Keyboard', 49.99),
    ('USB-C Hub', 29.99),
    ('Bluetooth Speaker', 39.99),
    ('LED Monitor 24"', 129.99),
    ('External Hard Drive 1TB', 59.99),
    ('Webcam 1080p', 25.50),
    ('Mechanical Keyboard', 89.99),
    ('Noise Cancelling Headphones', 99.99),
    ('Smartphone Stand', 14.99),
    ('Wireless Charger', 22.99),
    ('Laptop Cooling Pad', 18.75),
    ('Ergonomic Mouse Pad', 9.99),
    ('Portable SSD 512GB', 74.99),
    ('Smart LED Light Strip', 27.49);

SELECT A.user_id GROUP_CONCAT
(B.user_id) AS VIRTUAL_FIELD
FROM TABLE newusertable
AS A INNER JOIN TABLE  newusertable AS B 
   ON B.user_id=A.user_id GROUP BY A.user_id





INSERT INTO newusertable
    (user_id, product_id)
VALUES(1, "1,2,3")

UPDATE newproducts SET users_id="1,2,3" WHERE product_id=1


CREATE TABLE
IF NOT EXISTS newusertable
(
    user_id INT AUTO_INCREMENT PRIMARY KEY, 
    username VARCHAR
(50) NOT NULL UNIQUE, 
    email VARCHAR
(100) NOT NULL UNIQUE, 
    password_hash VARCHAR
(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    CONSTRAINT check_email_format CHECK
(email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
)


SELECT user_id, username, product_name, price
FROM newusertable LEFT JOIN newproducts ON newusertable.product_id = newproducts.product_id

ALTER TABLE newusertable DROP COLUMN product_id

ALTER TABLE newproducts ADD COLUMN users_id VARCHAR
(50);

ALTER TABLE newproducts ADD CONSTRAINT fk_users_id
FOREIGN KEY (users_id) REFERENCES newusertable (user_id);

ALTER TABLE newproducts DROP COLUMN users_id


SELECT DISTINCT U.username, U.user_id, O.product_name
FROM newusertable AS U
    JOIN newproducts AS O
    ON FIND_IN_SET(U.user_id, O.users_id) > 0;

SELECT
    U.username,
    U.user_id,
    O.product_name
FROM newusertable AS U
    JOIN newproducts AS O
    ON FIND_IN_SET(CAST(U.user_id AS CHAR), O.users_id) > 0
ORDER BY U.user_id;


CREATE TABLE user_product_link
(
    user_id INT,
    product_id INT,
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES newusertable(user_id),
    FOREIGN KEY (product_id) REFERENCES newproducts(product_id)
);


INSERT INTO user_product_link
    (user_id, product_id)
VALUES
    (1, 3)

SELECT
    U.user_id,
    U.username,
    P.product_name
FROM newusertable AS U
    JOIN user_product_link AS L ON U.user_id = L.user_id
    JOIN newproducts AS P ON L.product_id = P.product_id
ORDER BY U.user_id;

SELECT
    U.user_id,
    U.username,
    GROUP_CONCAT(P.product_name
ORDER BY P.product_name SEPARATOR ', ') AS products
FROM newusertable AS U
JOIN user_product_link AS L ON U.user_id = L.user_id
JOIN newproducts AS P ON L.product_id = P.product_id
GROUP BY U.user_id, U.username;




INSERT INTO user_product_link
    (user_id, product_id)
VALUES(2 , 5)




CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR
(255) NOT NULL,
        password_hash VARCHAR
(255) NOT NULL,
        role ENUM
('user', 'admin', 'moderator') NOT NULL DEFAULT 'user'
    );

INSERT INTO users
    (username, password_hash, role)
VALUES
    ('new_admin_user', 'hashed_password_here', 'admin');

DROP TABLE Users100

DROP TABLE Blog

INSERT INTO users100
    (name,email,hashedpassword, reference)
VALUES
    ('${name}', '${email}', '${hashedPassword}', 'Created by ${name}')






INSERT INTO users100
    (name,email,hashedpassword,role, reference)
VALUES
    ('ron21', 'abc@gmail.com', 'qweoqhrfqhwfqwfqwf', 'user', 'Created by ron2')



UPDATE Blog 
SET
    title='A really really good blog', 
description='Some greatest description of all time'
WHERE name='admin'


ALTER TABLE Blog ADD COLUMN deletedAt VARCHAR(50) 