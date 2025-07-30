USE mydb

SELECT * FROM persons2 
WHERE salary = (
    SELECT MAX(salary) FROM persons2 
    OFFSET 1
)


SELECT * FROM persons2
WHERE salary = (
    SELECT DISTINCT salary FROM persons2
    ORDER BY salary DESC
    LIMIT 1 OFFSET 1
);

SELECT * FROM persons2
WHERE salary = (
    SELECT MAX(salary) FROM persons2
    WHERE salary < (SELECT MAX(salary) FROM persons2)
);


SELECT * FROM persons2
GROUP BY salary 
ORDER BY salary DESC
LIMIT 1 OFFSET 1



SELECT *
FROM persons2
WHERE salary IN (
    SELECT salary
    FROM persons2
    GROUP BY salary
    HAVING COUNT(*) > 1
);

