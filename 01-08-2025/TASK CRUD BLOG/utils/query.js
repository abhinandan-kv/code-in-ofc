const query = {
  insert: `INSERT INTO usersdata (username,email,password_hash) VALUES (?,?,?)`,
  findrow: "SELECT * FROM usersdata WHERE username = ?",
};

export default query;
