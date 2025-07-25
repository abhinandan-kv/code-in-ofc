const query = {
  listAll: "SELECT * FROM persons",
  createNewTable: "CREATE TABLE",
  addNewRow:
    "INSERT INTO persons (`LastName`,`FirstName`,`Address`,`City`,`Country`,`Age`) VALUES('Inhaler','Vicks','Reliance Mart','Ahmedabad', 'India' , 1)",
  addNewRowInsert: "INSERT INTO persons (`LastName`,`FirstName`,`Address`,`City`,`Country`,`Age`)",
  updateAField: "UPDATE persons", // UPDATE tableName SET colname="newValue" WHERE colname="oldValue"
  deleteARow: "DELETE FROM persons WHERE ",
  dropTable: "DROP TABLE ",
};

export default query;
