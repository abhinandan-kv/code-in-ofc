// import sequelize from "../config/database.js";
// import Blog from "../models/blogModel.js";
// import multer from "multer";
// import { fileURLToPath } from "node:url";
// import { dirname } from "node:path";

// async function postNewBlog(req, res) {
//   //const { title, description } = req.body;

//   //   const storage = multer.diskStorage({
//   //     destination: './uploads/',
//   //     filename: (req, file, cb) => {
//   //       cb(null, Date.now() + '-' + file.originalname);
//   //     }
//   //   });

//   //   const upload = multer({
//   //     storage: storage,
//   //     limits: { fileSize: 2000000 }       //~2MB
//   //   });

//   //   upload.array('File')(req, res, async (err) => {
//   //     if (err) {
//   //       return res.status(400).send({ message: err.message });
//   //     }

//   //     if (!req.file) {
//   //       return res.status(400).send({ message: 'No file uploaded' });
//   //     }

//   //     const fileName = req.file.path;
//   //     console.log(fileName);

//   //     try {
//   //       //const [result] = await connection.promise().query(query.uploadFile, [fileName]);

//   //       console.log(result);
//   //       res.json(result);
//   //     } catch (error) {
//   //       console.log(error);
//   //       res.status(statusCodes.ServerError.code).send(statusCodes.ServerError.msg);
//   //     }
//   //   });

//   const { title, description } = req.body;
//   const { creator, role } = req.user;
//   if (role == "admin") {
//     try {
//       const result = await sequelize.query(
//         `INSERT INTO BLOG (blogTitle, blogDescription, createdBy, approved) VALUES ('${title}' , '${description}', '${creator}', 'true')`
//       );

//       res.json(result);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send(err);
//     }
//   } else {
//     try {
//       const result = await sequelize.query(
//         `INSERT INTO BLOG (blogTitle, blogDescription, createdBy) VALUES ('${title}' , '${description}', '${creator}')`
//       );

//       res.json(result);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send(err);
//     }
//   }
// }

// async function readBlog(req, res) {
//   const role = req.user.role;
//   const name = req.user.name;

//   try {
//     const result = await Blog.findAll({ where: { createdBy: name } });

//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// }

// async function updateBlog(req, res) {
//   const { name, role } = req.user;
//   const { title, description, userToUpdate } = req.body;
//   if (role == "admin") {
//     try {
//       const result = await sequelize.query(
//         `UPDATE Blog SET blogTitle='${title}', blogDescription='${description}', approved='true' WHERE createdBy='${userToUpdate}'`
//       );

//       res.json(result);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send(err);
//     }
//   } else {
//     try {
//       const result = await sequelize.query(`UPDATE Blog SET blogTitle='${title}', blogDescription='${description}' WHERE createdBy='${name}'`);

//       res.json(result);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send(err);
//     }
//   }
// }

// async function deleteBlog(req, res) {
//   const { name, role } = req.user;

//   try {
//     const result = await Blog.destroy({ where: { createdBy: name } });

//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// }

// async function recoverBlog(req, res) {
//   const { name, role } = req.user;
//   try {
//     const result = await Blog.restore({ where: { createdBy: name } });
//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// }

// export { postNewBlog, readBlog, updateBlog, deleteBlog, recoverBlog };

// refined

import { where } from "sequelize";
import Blog from "../models/blogModel.js";
import path from "path";
import url from "url";

async function postNewBlog(req, res) {
  try {
    const { title, description } = req.body;
    const { name, role } = req.user;

    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const __parentDirname = path.dirname(__dirname)
    //console.log("__dirname :==== ",__parentDirname);


    const imagePaths = req.files.map((file) => `file:///${__parentDirname}/uploads/blogs/${file.filename}`);
    const approved = role === "admin" ? "true" : "false";

    const blog = await Blog.create({
      blogTitle: title,
      blogDescription: description,
      blogImages: imagePaths.join(","),
      createdBy: name,
      approved,
    });

    return res.status(201).json({
      message: `Blog posted ${approved === "true" ? "and approved" : ", pending approval"}`,
      blog,
      uploadedImages: imagePaths,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to post blog" });
  }
}

async function readBlog(req, res) {
  const { role, name } = req.user;
  try {
    const blogs = await Blog.findAll({
      where: role === "admin" ? {} : { createdBy: name },
    });
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch blogs" });
  }
}

async function updateBlog(req, res) {
  const { name, role } = req.user;
  const { id, title, description } = req.body;

  try {
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    if (role !== "admin" && blog.createdBy !== name) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    blog.blogTitle = title;
    blog.blogDescription = description;
    if (role === "admin") blog.approved = "true";

    await blog.save();
    res.json({ message: "Blog updated", blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
}

async function deleteBlog(req, res) {
  const { name, role } = req.user;
  const { id } = req.params;

  try {
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    if (role !== "admin" && blog.createdBy !== name) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await blog.destroy();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete blog" });
  }
}

async function recoverBlog(req, res) {
  const { name, role } = req.user;
  const { id } = req.params;

  try {
    const blog = await Blog.findByPk(id, { paranoid: false });
    if (!blog || !blog.destroyTime) return res.status(404).json({ error: "Deleted blog not found" });

    if (role !== "admin" && blog.createdBy !== name) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await blog.restore();
    res.json({ message: "Blog restored" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to restore blog" });
  }
}

async function adminPanel(req, res) {
  const { role } = req.user;
  try {
    if (role === "admin") {
      const allBlogs = await Blog.findAll({ paranoid: false });

      res.json(allBlogs);
    } else {
      throw new Error("You are not an admin");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function adminPanelApproval(req, res) {
  const { role } = req.user;
  const id = req.params.id;

  try {
    if (role === "admin") {
      const approved = await Blog.update({ approved: "true" }, { where: { id: id } });
      res.send(`User's blog with id:-${id} is approved successfully `);
    } else {
      throw new Error("You are not an admin not Authorized");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export { postNewBlog, readBlog, updateBlog, deleteBlog, recoverBlog, adminPanel, adminPanelApproval };
