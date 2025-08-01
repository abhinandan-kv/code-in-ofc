import sequelize from "../config/database.js";
import Blog from "../models/blogModel.js";
import multer from "multer";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

async function postNewBlog(req, res) {
  //const { title, description } = req.body;

  //   const storage = multer.diskStorage({
  //     destination: './uploads/',
  //     filename: (req, file, cb) => {
  //       cb(null, Date.now() + '-' + file.originalname);
  //     }
  //   });

  //   const upload = multer({
  //     storage: storage,
  //     limits: { fileSize: 2000000 }       //~2MB
  //   });

  //   upload.array('File')(req, res, async (err) => {
  //     if (err) {
  //       return res.status(400).send({ message: err.message });
  //     }

  //     if (!req.file) {
  //       return res.status(400).send({ message: 'No file uploaded' });
  //     }

  //     const fileName = req.file.path;
  //     console.log(fileName);

  //     try {
  //       //const [result] = await connection.promise().query(query.uploadFile, [fileName]);

  //       console.log(result);
  //       res.json(result);
  //     } catch (error) {
  //       console.log(error);
  //       res.status(statusCodes.ServerError.code).send(statusCodes.ServerError.msg);
  //     }
  //   });

  const { title, description } = req.body;
  const { creator, role } = req.user;
  if (role == "admin") {
    try {
      const result = await sequelize.query(
        `INSERT INTO BLOG (blogTitle, blogDescription, createdBy, approved) VALUES ('${title}' , '${description}', '${creator}', 'true')`
      );

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  } else {
    try {
      const result = await sequelize.query(
        `INSERT INTO BLOG (blogTitle, blogDescription, createdBy) VALUES ('${title}' , '${description}', '${creator}')`
      );

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
}

async function readBlog(req, res) {
  const role = req.user.role;
  const name = req.user.name;

  try {
    const result = await Blog.findAll({ where: { createdBy: name } });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function updateBlog(req, res) {
  const { name, role } = req.user;
  const { title, description, userToUpdate } = req.body;
  if (role == "admin") {
    try {
      const result = await sequelize.query(
        `UPDATE Blog SET blogTitle='${title}', blogDescription='${description}', approved='true' WHERE createdBy='${userToUpdate}'`
      );

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  } else {
    try {
      const result = await sequelize.query(`UPDATE Blog SET blogTitle='${title}', blogDescription='${description}' WHERE createdBy='${name}'`);

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
}

async function deleteBlog(req, res) {
  const { name, role } = req.user;

  try {
    const result = await Blog.destroy({ where: { createdBy: name } });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function recoverBlog(req, res) {
  const { name, role } = req.user;
  try {
    const result = await Blog.restore({ where: { createdBy: name } });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export { postNewBlog, readBlog, updateBlog, deleteBlog, recoverBlog };
