import BookTable from "../Models/bookModel.js";
import UserBookTable from "../Models/userBookModel.js";
import UserTable from "../Models/userModel.js";

export async function verify(req, res) {
  const { id, name, role } = req.user;

  res.status(200).send({ id, name, role });
}

export async function listbooks(req, res) {
  const { id, name, role } = req.user;

  try {
    const listAllBook = await BookTable.findAll({ paranoid: false });

    res.status(200).json({ message: "All books retrieved Successfully", response: listAllBook });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function addNewBook(req, res) {
  const { bookName, authorName, publicationName, publicationYear, availability } = req.body;
  const { id, name } = req.user;
  console.log(req.body.bookData);
  try {
    console.log("Book data- ", bookName, authorName, publicationName, publicationYear, availability);

    if (!bookName || !authorName || !publicationName || !publicationYear || !availability) {
      return res.status(400).send("Values cant be empty");
    }

    const bookExists = await BookTable.findOne({
      where: { bookName: bookName, authorName: authorName, publicationName: publicationName, publicationYear: publicationYear },
    });

    if (bookExists) {
      return res.status(400).send("Book already exists, Kindly increment the existing stock!");
    }

    const addNewBook = await BookTable.create({
      bookName: bookName,
      authorName: authorName,
      publicationName: publicationName,
      publicationYear: publicationYear,
      availability: availability,
      references: `Book added by ${name} having id:${id}`,
    });

    console.log(addNewBook);

    res.status(200).send({ message: "Book added Successfully", response: addNewBook });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function listBookById(req, res) {
  const { id, name, role } = req.user;
  const { bookid } = req.body;
  console.log("bookID", bookid);
  try {
    const listAllBook = await BookTable.findByPk(bookid);

    res.status(200).json({ message: "All books retrieved Successfully", response: listAllBook });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function updateBook(req, res) {
  const { bookName, authorName, publicationName, publicationYear, availability } = req.body;
  const { id, name } = req.user;
  const bookId = req.params.id;

  console.log(req.body.bookData);
  try {
    console.log("Book data- ", bookName, authorName, publicationName, publicationYear, availability);

    const bookExists = await BookTable.findByPk(bookId);

    if (!bookExists) {
      return res.status(400).send("Book doesnot exists!");
    }

    const addNewBook = await BookTable.update(
      {
        bookName: bookName,
        authorName: authorName,
        publicationName: publicationName,
        publicationYear: publicationYear,
        availability: availability,
        references: `Book added by ${name} having id:${id}`,
      },
      { where: { id: bookId } }
    );

    console.log(addNewBook);

    res.status(200).send({ message: "Book Updated Successfully", response: addNewBook });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function deleteBookById(req, res) {
  const { id, name, role } = req.user;
  const bookid = req.params.id;
  console.log("bookID", bookid);

  try {
    const bookExists = await BookTable.findByPk(bookid);

    if (!bookExists) {
      return res.status(400).send("Book doesnot exists or its already deleted!");
    }
    const deleteBook = await BookTable.destroy({ where: { id: bookid } });

    res.status(200).json({ message: "Book deleted Successfully", response: deleteBook });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

// users

export async function listUsers(req, res) {
  const { id, name, role } = req.user;

  try {
    const listAllUsers = await UserTable.findAll({ paranoid: false });

    res.status(200).json({ message: "All Users retrieved Successfully", response: listAllUsers });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function updateUsers(req, res) {
  const { name, email, phoneNumber, address } = req.body;
  const userId = req.params.id;

  try {
    console.log("User data- ", name, email, phoneNumber, address);

    const userExists = await UserTable.findByPk(userId);

    if (!userExists) {
      return res.status(400).send("User doesnot exists! or already deleted");
    }

    const updateUser = await UserTable.update(
      {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
      },
      { where: { id: userId } }
    );

    console.log(updateUser);

    res.status(200).send({ message: "User Details Updated Successfully", response: updateUser });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function deleteUserById(req, res) {
  const { id, name, role } = req.user;
  const userid = req.params.id;
  console.log("bookID", bookid);

  try {
    const userExists = await UserTable.findByPk(userid);

    if (!userExists) {
      return res.status(400).send("Book doesnot exists or its already deleted!");
    }
    const deleteUser = await UserTable.destroy({ where: { id: userid } });

    res.status(200).json({ message: "User deleted Successfully", response: deleteUser });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

// low priority - handle later
export async function addNewUser(req, res) {
  const { name, email, phoneNumber, password, address } = req.body;
  console.log(req.body.bookData);
  try {
    console.log("User data- ", name, email, phoneNumber, password, address);

    if (!name || !email || !phoneNumber || !password || !address) {
      return res.status(400).send("Values cant be empty");
    }

    const bookExists = await UserTable.findOne({
      where: { email: email },
    });

    if (bookExists) {
      return res.status(400).send("Book already exists, Kindly increment the existing stock!");
    }

    const addNewUser = await UserTable.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      address: address,
    });

    console.log(addNewUser);

    res.status(200).send({ message: "Book added Successfully", response: addNewUser });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function allUserIssuedBooks(req, res) {
  const { id, name, role } = req.user;

  try {
    const listAllBook = await UserBookTable.findAll({where:{returned:false}});

    res.status(200).json({ message: "All issued books retrieved Successfully", response: listAllBook });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function bookReturned(req, res) {
  const userId = req.params.id;
  const { bookId } = req.body;

  try {
    const updateBook = await UserBookTable.update(
      {
        returned: true,
      },
      { where: { id: userId, bookId: bookId } }
    );

    console.log(updateBook);

    res.status(200).send({ message: "Book Successfully Marked Returned", response: updateBook });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}


export async function historyUserIssuedBooks(req, res) {
  const { id, name, role } = req.user;

  try {
    const listAllBook = await UserBookTable.findAll({where:{returned:true}});

    res.status(200).json({ message: "All issued books retrieved Successfully", response: listAllBook });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}