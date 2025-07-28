Use mydb

CREATE TABLE Persons (
    PersonID int NOT NULL UNIQUE AUTO_INCREMENT,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255) NOT NULL
);

CREATE TABLE qwerty (
    PersonID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    LastName VARCHAR(255),
    FirstName VARCHAR(255),
    Address VARCHAR(255),
    City VARCHAR(255) NOT NULL,
    Country VARCHAR(255),
    Age INT NOT NULL
);

ALTER TABLE Persons ADD Country varchar(255)

SELECT * FROM persons

DROP TABLE persons

ALTER TABLE Persons ADD Age INT

ALTER TABLE Persons MODIFY Age int NOT NULL;

ALTER TABLE Persons MODIFY PersonID

INSERT INTO
    persons (
        `LastName`,
        `FirstName`,
        `Address`,
        `City`,
        `Country`,
        `Age`
    )
VALUES (
        'Tanaka',
        'Haruto',
        '14 Sakura Street',
        'Tokyo',
        'Japan',
        30
    ),
    (
        'Ivanov',
        'Elena',
        '8 Red Square',
        'Moscow',
        'Russia',
        45
    ),
    (
        'Ali',
        'Zara',
        '12 Crescent Road',
        'Lahore',
        'Pakistan',
        27
    ),
    (
        'Berg',
        'Anna',
        '3 Snow Hill',
        'Oslo',
        'Norway',
        33
    ),
    (
        'Müller',
        'Lukas',
        '10 Bahnhofstrasse',
        'Zurich',
        'Switzerland',
        39
    ),
    (
        'Dubois',
        'Claire',
        '25 Rue Lafayette',
        'Paris',
        'France',
        26
    ),
    (
        'Lee',
        'Minho',
        '18 Han River Rd',
        'Seoul',
        'South Korea',
        32
    ),
    (
        'Johnson',
        'Emily',
        '77 Maple Ave',
        'Toronto',
        'Canada',
        28
    ),
    (
        'Andersson',
        'Erik',
        '5 Västra Gatan',
        'Stockholm',
        'Sweden',
        44
    ),
    (
        'Rodriguez',
        'Isabella',
        '11 Calle Real',
        'Barcelona',
        'Spain',
        31
    ),
    (
        'Petrov',
        'Dmitri',
        '16 Nevsky Prospekt',
        'Saint Petersburg',
        'Russia',
        36
    ),
    (
        'Chin',
        'Wei',
        '19 Orchard Lane',
        'Singapore',
        'Singapore',
        34
    ),
    (
        'Williams',
        'Ava',
        '90 Sunset Blvd',
        'Los Angeles',
        'USA',
        40
    ),
    (
        'Osei',
        'Kwame',
        '3 Independence Ave',
        'Accra',
        'Ghana',
        29
    ),
    (
        'Silva',
        'Mariana',
        '22 Rua das Flores',
        'Lisbon',
        'Portugal',
        37
    );

-- Table 2
CREATE TABLE CountryTable (
    countryId INT NOT NULL,
    CountryName VARCHAR(191),
    Origin VARCHAR(255),
    NoOfCities INT,
    PRIMARY KEY (CountryName),
    FOREIGN KEY (CountryName) REFERENCES Persons (Country)
)

ALTER Table countrytable RENAME COLUMN NoOfCities TO NoOfStates

ALTER table countrytable RENAME COLUMN countryId TO CountryISD

SELECT * FROM countrytable

DROP TABLE countrytable

DELETE FROM countrytable WHERE `CountryName` = 'India'

INSERT INTO
    countrytable (
        `CountryISD`,
        `CountryName`,
        `Origin`,
        `NoOfStates`
    )
VALUES (91, 'India', '1800', 29),
    (1, 'USA', '1776', 50),
    (44, 'UK', '1707', 4),
    (81, 'Japan', '660 BC', 47),
    (49, 'Germany', '1871', 16),
    (33, 'France', '843', 18),
    (39, 'Italy', '1861', 20),
    (86, 'China', '221 BC', 23),
    (7, 'Russia', '862', 85),
    (61, 'Australia', '1901', 6),
    (55, 'Brazil', '1822', 26),
    (34, 'Spain', '1479', 17),
    (20, 'Egypt', '3100 BC', 27),
    (62, 'Indonesia', '1945', 34),
    (27, 'South Africa', '1910', 9),
    (82, 'South Korea', '1948', 17),
    (90, 'Turkey', '1923', 81),
    (63, 'Philippines', '1946', 17),
    (880, 'Bangladesh', '1971', 8),
    (92, 'Pakistan', '1947', 4),
    (234, 'Nigeria', '1960', 36),
    (212, 'Morocco', '1956', 12),
    (351, 'Portugal', '1143', 18),
    (972, 'Israel', '1948', 6),
    (66, 'Thailand', '1238', 77);

UPDATE countrytable SET Origin = '1947' WHERE CountryISD = 91

CREATE VIEW PC AS SELECT `CountryName` FROM countrytable

SELECT * FROM PC

DROP VIEW PC

CREATE VIEW innerPC AS
SELECT *
FROM persons
    INNER JOIN countrytable ON persons.`Country` = countrytable.`CountryName`

SELECT * FROM innerPC

CREATE VIEW leftPC AS
SELECT *
FROM persons
    LEFT JOIN countrytable ON persons.`Age` = countrytable.`NoOfStates`

SELECT * FROM leftPC

SELECT
    firstname,
    lastname,
    country,
    CountryName
FROM persons
    RIGHT JOIN countrytable ON persons.`Country` = countrytable.`CountryName`

SELECT firstname, lastname, age, country
FROM persons
    CROSS JOIN countrytable ON persons.`Age` = countrytable.`NoOfStates`

SELECT COUNT(country) FROM persons

SELECT AVG(age) from persons

SELECT FLOOR(AVG(age)) from persons

SELECT ROUND(AVG(Origin)) FROM countrytable

SELECT P1.firstname, P1.age, P1.personid, P2.PersonID
FROM persons P1, persons P2
WHERE
    P1.Age <> P2.Age

SELECT persons.firstname, COUNT(persons.Country) AS CountryCount, countrytable.`CountryName`
FROM countrytable
    LEFT JOIN persons ON persons.Country = countrytable.CountryName
GROUP BY
    country
ORDER BY country DESC

SELECT
    COUNT(country),
    country,
    firstname,
    lastname,
    Age
FROM persons
GROUP BY
    Age
HAVING
    Age > 18
ORDER BY Age DESC

SELECT countryname, origin
FROM countrytable
WHERE
    EXISTS (
        SELECT origin
        FROM countrytable
        WHERE
            origin = 1776
    )

SELECT countryname, origin
FROM countrytable
WHERE
    origin <= ANY (
        SELECT origin
        FROM countrytable
        WHERE
            origin = 1776
    )

SELECT * from countrytable;

SELECT countryname, origin
FROM countrytable
WHERE
    origin < ALL (
        SELECT origin
        FROM countrytable
        WHERE
            origin < 1000
    )

SELECT ALL `Origin` FROM countrytable WHERE origin > 1947

CREATE TABLE thirdTable (
    countryId INT NOT NULL,
    CountryName VARCHAR(191),
    Origin VARCHAR(255),
    NoOfCities INT
)

DROP TABLE thirdtable

INSERT INTO
    thirdTable
SELECT *
FROM countrytable
WHERE
    Origin >= 1800

SELECT * FROM persons

SELECT DISTINCT Address FROM persons

SELECT ALL Address FROM persons

INSERT INTO
    persons (
        `LastName`,
        `FirstName`,
        `Address`,
        `City`,
        `Country`,
        `Age`
    )
VALUES (
        'Tanaka',
        'Haruto',
        '14 Sakura Street',
        'Tokyo',
        'Japan',
        30
    )

SELECT
    FirstName,
    City,
    Country,
    Age,
    CASE
        WHEN AGE > 60
        AND AGE < 80 THEN 'AGE IS GREATER THAN 60, U R A SERIOR CITIZEN :), YOU HAVE MADE IT ~!~ '
        WHEN AGE = 200 THEN 'WHAT ARE YOU GOD?'
        ELSE 'YOUR STILL HAVE TO MAKE IT, KEEP GOING :)'
    END AS AGETEST
FROM persons;

INSERT INTO
    persons (
        `LastName`,
        `FirstName`,
        `Address`,
        `City`,
        `Country`,
        `Age`
    )
VALUES (
        'uzumaki',
        'Naruto',
        'Leaf Village',
        'Leaf Village',
        'JAPAN',
        200
    )

UPDATE persons SET `Country` = 'Japan' WHERE `Country` = 'JAPAN'

SELECT * FROM persons WHERE `LastName` = 'uzumaki'

SELECT *
FROM persons
ORDER BY (
        CASE
            WHEN `Country` = 'Japan' THEN 'You like in a wonderful country'
            ELSE 'Sad life for you bro'
        END
    ) DESC;

CREATE Table fourthTable (fruitsname VARCHAR(255))

INSERT INTO
    fourthtable (`fruitsname`)
VALUES ('mango'),
    ('apple'),
    ('chiku'),
    ('pomogrenade'),
    ('bananana'),
    ('lichi'),
    ('')

INSERT INTO fourthtable (`fruitsname`) VALUES (NULL), (NULL)

DELETE FROM fourthtable WHERE fruitsname = ''

SELECT * FROM fourthtable

SELECT IFNULL(fruitsname, 'DRAGON FRUIT')
FROM fourthtable -- BASICALLY GIVE THE RIGHT SIDE VALUE IF LEFT SIDE VALUE IS NULL JUST INVERSE OF JS NULLISH COLEASING OPERATOR(&&)

SELECT COALESCE(
        fruitsname, NULL, NULL, "OP OP Fruit", "Gum Gum Fruit"
    )
FROM fourthtable -- BASICALLY GIVES THE FIRST NON NULL VALUES FROM THE RIGHT IF THE VALUES FROM FRUITSNAME IS NULL

/* ITS 
A 
MULTILINE 
COMMENT*/

SELECT * from persons WHERE Age BETWEEN 100 AND 200

SELECT * FROM persons WHERE Country IN ('Japan', 'South Korea')

SELECT * FROM persons WHERE FirstName LIKE 'na%'

SELECT * FROM persons WHERE LastName NOT LIKE '__u%'

--SELECT * FROM countrytable
SELECT SLEEP(5)

CREATE TABLE Student_grade (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Grade VARCHAR(250) NOT NULL,
    priority ENUM('Low', 'Medium', 'High') NOT NULL
);

INSERT INTO student_grade (`GRADE`, `priority`) VALUES ('O', 'high')

INSERT INTO student_grade (`GRADE`, `priority`) VALUES ('A', 'high')

SELECT * FROM student_grade

SELECT ADDDATE("2025-07-24", 21)

SELECT CURDATE();

SELECT CURTIME()

SELECT CONVERT(10, BINARY)

SELECT VERSION()





---------------- 25-07-2025 --------------------------------------------------


EXPLAIN SELECT personID, LastName,FirstName
FROM Persons
WHERE Country='Japan'

EXPLAIN SELECT * FROM persons

LOCK TABLE persons READ;

UNLOCK TABLE ;

START TRANSACTION;
ALTER TABLE persons
ADD COLUMN money VARCHAR(255);
INSERT INTO persons (firstName, money) VALUES ("test", 10000);
COMMIT;

ROLLBACK

SET autocommit = 0

GRANT SELECT,INSERT 
ON mydb.persons 
TO 'test@localhost'

REVOKE SELECT
ON mydb.persons
TO 'test@localhost'



---------------- 28-07-2025 --------------------------------------------------


SELECT countryName , Origin 
FROM countrytable
ORDER BY(
    CASE 
        WHEN `Origin` LIKE "%BC" THEN -CAST(SUBSTRING_INDEX(`Origin`, " ", 1)AS UNSIGNED)  
        ELSE  CAST(`Origin` AS UNSIGNED)
    END
)DESC

--ALTER TABLE persons ADD COLUMN files MEDIUMBLOB;

ALTER TABLE persons  DROP  COLUMN files

SELECT * FROM persons


CREATE TABLE File (
    fileID INT PRIMARY KEY AUTO_INCREMENT,
    files MEDIUMBLOB NOT NULL
)

SELECT * FROM persons

show variables like 'max_allowed_packet'  

SELECT * FROM persons 
LEFT JOIN File 
ON persons.PersonID = File.fileID

SELECT * FROM Persons AS A CROSS JOIN File AS B

SELECT A.personId, A.LastName, A.Age
FROM persons AS A, persons AS B
WHERE A.`FirstName` = B.`FirstName`

SELECT * FROM persons
UNION
SELECT * FROM persons

--ORDER BY Age DESC


CREATE TABLE Persons2 (
    PersonID int NOT NULL UNIQUE AUTO_INCREMENT,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255) NOT NULL,
    Country VARCHAR(255),
    Age INT
);

INSERT INTO
    persons2 (
        `LastName`,
        `FirstName`,
        `Address`,
        `City`,
        `Country`,
        `Age`
    )
VALUES (
        'Tanaka',
        'Haruto',
        '14 Sakura Street',
        'Tokyo',
        'Japan',
        30
    ),
    (
        'Ivanov',
        'Elena',
        '8 Red Square',
        'Moscow',
        'Russia',
        45
    ),
    (
        'Ali',
        'Zara',
        '12 Crescent Road',
        'Lahore',
        'Pakistan',
        27
    ),
    (
        'Berg',
        'Anna',
        '3 Snow Hill',
        'Oslo',
        'Norway',
        33
    ),
    (
        'Müller',
        'Lukas',
        '10 Bahnhofstrasse',
        'Zurich',
        'Switzerland',
        39
    ),
    (
        'Dubois',
        'Claire',
        '25 Rue Lafayette',
        'Paris',
        'France',
        26
    ),
    (
        'Lee',
        'Minho',
        '18 Han River Rd',
        'Seoul',
        'South Korea',
        32
    ),
    (
        'Johnson',
        'Emily',
        '77 Maple Ave',
        'Toronto',
        'Canada',
        28
    ),
    (
        'Andersson',
        'Erik',
        '5 Västra Gatan',
        'Stockholm',
        'Sweden',
        44
    ),
    (
        'Rodriguez',
        'Isabella',
        '11 Calle Real',
        'Barcelona',
        'Spain',
        31
    ),
    (
        'Petrov',
        'Dmitri',
        '16 Nevsky Prospekt',
        'Saint Petersburg',
        'Russia',
        36
    ),
    (
        'Chin',
        'Wei',
        '19 Orchard Lane',
        'Singapore',
        'Singapore',
        34
    ),
    (
        'Williams',
        'Ava',
        '90 Sunset Blvd',
        'Los Angeles',
        'USA',
        40
    ),
    (
        'Osei',
        'Kwame',
        '3 Independence Ave',
        'Accra',
        'Ghana',
        29
    ),
    (
        'Silva',
        'Mariana',
        '22 Rua das Flores',
        'Lisbon',
        'Portugal',
        37
    );

INSERT INTO
    persons2 (
        `LastName`,
        `FirstName`,
        `Address`,
        `City`,
        `Country`,
        `Age`
    )
VALUES (
        'uzumaki',
        'Naruto',
        'Leaf Village',
        'Leaf Village',
        'JAPAN',
        200
    )

SELECT * FROM persons2


SELECT firstname from persons
UNION 
SELECT firstname from persons2

SELECT persons.firstname from persons
LEFT JOIN persons2 ON persons.`FirstName` = persons2.`FirstName`
UNION 
SELECT persons2.firstname from persons2
RIGHT JOIN persons ON persons2.`FirstName` = persons.`FirstName`


SELECT * 
FROM Persons A ,Persons B 
WHERE A.PersonID <> B.PersonID

SELECT persons.firstName, persons.Age 
FROM persons 
LEFT JOIN persons2 ON persons.Age = persons2.Age 
UNION 
SELECT persons2.firstName, persons.Age 
FROM persons2
RIGHT JOIN persons ON persons2.Age = persons.Age


SELECT *, MAX(Age) FROM Persons