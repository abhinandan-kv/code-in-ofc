const query = {
  insert: `INSERT INTO newusertable (username,email,password_hash) VALUES (?,?,?)`,
  findrow: "SELECT * FROM newusertable WHERE username = ?",
  listAllForce:"SELECT * FROM newusertable",
  listAll:"SELECT user_id, username, email,created_at FROM newusertable WHERE deleted_at IS NULL",
  update:"UPDATE newusertable SET username = ? WHERE username = ?",
  softdelete:"UPDATE newusertable SET deleted_at = NOW() WHERE username=? AND email=?",
  hardDeleteMarkedMultipleRows: "DELETE FROM newusertable WHERE deleted_at IS NOT NULL",

  // Product table query

  listAllProduct:"SELECT * FROM newproducts",
  putProductToUser: "UPDATE newusertable SET product_id=? WHERE user_id=?",
  listProductByUser:"SELECT user_id, username, product_name,price FROM newusertable RIGHT JOIN newproducts ON "
};

export default query;
