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

UPDATE newusertable SET product_id="1,2,3" WHERE user_id=1


CREATE TABLE IF NOT EXISTS newusertable(
    user_id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) NOT NULL UNIQUE, 
    email VARCHAR(100) NOT NULL UNIQUE, 
    password_hash VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    CONSTRAINT check_email_format CHECK(email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
)


SELECT user_id, username, product_name,price FROM newusertable LEFT JOIN newproducts ON newusertable.product_id = newproducts.product_id