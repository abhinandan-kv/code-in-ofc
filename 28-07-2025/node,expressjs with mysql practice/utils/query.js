const query = {
  listAll: "SELECT * FROM persons",
  createNewTable: "CREATE TABLE",
  addNewRow:
    "INSERT INTO persons (`LastName`,`FirstName`,`Address`,`City`,`Country`,`Age`) VALUES('Inhaler','Vicks','Reliance Mart','Ahmedabad', 'India' , 1)",
  addNewRowInsert: "INSERT INTO persons (`LastName`,`FirstName`,`Address`,`City`,`Country`,`Age`)",
  updateAField: "UPDATE persons", // UPDATE tableName SET colname="newValue" WHERE colname="oldValue"
  deleteARow: "DELETE FROM persons WHERE ",
  dropTable: "DROP TABLE ",
  uploadFile: 'INSERT INTO File (files) VALUES (?)',
  innerJoin: 'SELECT * FROM Persons AS A INNER JOIN File AS B ON A.PersonId = B.FileId',
  leftJoin:'SELECT * FROM Persons AS A LEFT JOIN File AS B ON A.PersonId = B.FileId',
  rightJoin:'SELECT * FROM Persons AS A RIGHT JOIN File AS B ON A.PersonID = B.fileId',
  crossJoin:'SELECT * FROM Persons AS A CROSS JOIN File AS B',
  selfJoin:'SELECT * FROM Persons A,Persons B WHERE A.PersonID <> B.PersonID',
  fullJoin:'SELECT persons.firstName, persons.Age FROM persons LEFT JOIN persons2 ON persons.Age = persons2.Age UNION SELECT persons2.firstName, persons.Age FROM persons2 RIGHT JOIN persons ON persons2.Age = persons.Age',
  aggregateFn:'SELECT *,? FROM Persons'
};

export default query;
