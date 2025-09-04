import UserTable from "../Models/userModel.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import BookTable from "../Models/bookModel.js";
import UserBookTable from "../Models/userBookModel.js";

const SALT_ROUNDS = 10;

export async function signup(req, res) {
  const { name, email, phoneNumber, password, address, role } = req.body;

  try {
    if (!name || !email || !phoneNumber || !password || !address) {
      return res.status(400).send("Values cant be empty");
    }

    console.log("DATA", name, email, phoneNumber, password, address, role);

    const emailExists = await UserTable.findOne({ where: { email: email } });

    if (emailExists) {
      return res.status(400).send("User already exists, Kindly Login!");
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    console.log("HashedPassword", hashedPassword);

    if (role == "admin") {
      const userCreation = await UserTable.create({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        address: address,
        role: role,
      });

      return res.status(200).json({
        message: "User Created Successfully",
        response: userCreation.toJSON(),
      });
    } else {
      const userCreation = await UserTable.create({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        address: address,
        role: role,
      });

      return res.status(200).json({
        message: "User Created Successfully",
        response: userCreation,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Values cant be empty");
  }

  try {
    const userDetail = await UserTable.findOne({ where: { email: email } });

    if (!userDetail) {
      return res.status(404).send("User Not Found, Please signUp");
    }

    const comparePassword = await bcrypt.compare(password, userDetail.password);

    if (!comparePassword) {
      return res.status(401).send("Password does not match");
    }

    const tokenGen = jwt.sign(
      {
        id: userDetail.id,
        name: userDetail.name,
        role: userDetail.role,
        email: userDetail.email,
        phoneNumber: userDetail.phoneNumber,
      },
      process.env.JWT_KEY,
      { expiresIn: "12h" }
    );

    res.cookie("token", tokenGen, { maxAge: 43200000, httpOnly: true });
    return res.status(200).json({
      message: "Login Successfully",
      token: tokenGen,
      role: userDetail.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function getAllBooks(req, res) {
  const { id, name, role } = req.user;

  try {
    const listAllBook = await BookTable.findAll();

    res.status(200).json({ message: "All books retrieved Successfully", response: listAllBook });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function issueBook(req, res) {
  const { id, name, role } = req.user;
  const bookId = req.params.id;

  try {
    const bookExists = await BookTable.findByPk(bookId);
    if (!bookExists) {
      return res.status(404).send("Book doesnot exists!");
    }

    if (bookExists.availability == 0) {
      return res.status(401).send("All book is currently issued!");
    } else {
      // const checkSameUserBookIssued = await UserBookTable.findAll({ where: { userId: id } });
      // console.log("checkSameUserBookIssued", checkSameUserBookIssued);
      // // res.send(checkSameUserBookIssued)
      // const valueInUserTable = checkSameUserBookIssued.dataValues.bookId;
      // console.log(valueInUserTable, bookId)
      // if (valueInUserTable == bookId) {
      //   return res.status(403).send("You already have same book issued");
      // } else {
      // handle later - convert into a transaction
      const totalInterval = 1209600000; //14 days

      const date = new Date();
      const currentTime = date.getTime();
      const dueTime = currentTime + totalInterval;

      const issueBook = await UserBookTable.create({
        bookId: bookId,
        bookName: bookExists.bookName,
        bookPublicationName: bookExists.publicationName,
        userId: id,
        dueDate: dueTime,
      });

      const newAvailability = bookExists.availability - 1;

      const decereaseStock = await BookTable.update({ availability: newAvailability }, { where: { id: bookId } });
      console.log(decereaseStock);

      res.status(200).json({ message: "Book Issued Successfully", response: issueBook });
      // }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function currentIssuedBooks(req, res) {
  const { id, name, role } = req.user;

  try {
    const listAllBook = await UserBookTable.findAll({ where: { userId: id } });

    res.status(200).json({ message: "All issued books retrieved Successfully", response: listAllBook });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}


export async function getFilteredBooks(req, res) {
  try {
    const {authorName, bookName } = req.query;

    const where = {};

     if (authorName) {
      where.authorName =  authorName 
    } 

    if (bookName) {
      where.bookName = bookName 
    }


    const books = await BookTable.findAll({ where });

    res.status(200).json({
      message: "Books fetched successfully",
      books,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}