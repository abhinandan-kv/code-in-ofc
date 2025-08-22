import AdminAuditModel from "../models/adminAuditModel.js";
import UserTable from "../models/userModel.js";
import VendorProduct from "../models/vendorProduct.js";
import auditFunctionality from "../utils/auditLogMaker.js";

//admin ops
export async function listAllUsers(req, res) {
  const { id, name, role, email } = req.user;

  try {
    if (role != "admin") {
      return res.status(401).send("Only admin can access.");
    }
    const result = await UserTable.findAll();

    auditFunctionality(id, name, role, email, "listingAllUsers");

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function listSingleUser(req, res) {
  const { id, name, role, email } = req.user;
  const userId = req.params.id;

  try {
    if (role != "admin") {
      return res.status(401).send("Only admin can access.");
    }
    const result = await UserTable.findByPk(userId);

    auditFunctionality(id, name, role, email, "listSingleUser");

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function forceListAllUsers(req, res) {
  const { id, name, role, email } = req.user;

  try {
    if (role != "admin") {
      return res.status(401).send("Only admin can access.");
    }
    const result = await UserTable.findAll({ paranoid: false });

    auditFunctionality(id, name, role, email, "force listed all users");

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function pendingRequestUsers(req, res) {
  const { id, name, role, email } = req.user;

  try {
    if (role != "admin") {
      return res.status(401).send("Only admin can access.");
    }
    const result = await UserTable.findAll({ where: { approvedBy: "Yet to Approve" } });

    auditFunctionality(id, name, role, email, "force listed all users");

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function activateAccount(req, res) {
  const userId = req.params.id;
  const { id, name, role, email } = req.user;

  try {
    if (role != "admin") {
      return res.status(401).send("Only admin can access");
    }

    const result = await UserTable.update({ isActive: true, approvedBy: `Approved By ${name} email:${email}` }, { where: { id: userId } });
    const newData = await UserTable.findByPk(userId);

    auditFunctionality(id, name, role, email, `activated account of ${userId}`);

    res.status(200).json({ message: "data updated sucessfully", newData });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function deleteUser(req, res) {
  const userIdToDelete = req.params.id;
  const { id, name, role, email } = req.user;

  try {
    if (role != "admin") {
      return res.status(401).send("Only Admin can access");
    }

    const settingReference = await UserTable.update({
      references: `Account Deleted by admin with id:${id} name:${name} contact:${email}`,
    });
    const result = await UserTable.destroy({ where: { id: userIdToDelete } });

    auditFunctionality(id, name, role, email, `deleted user with id:${userIdToDelete}`);

    res.status(200).send(`User deleted Successfully, you can request for reactivation within 24 hours at this ${email}`);
  } catch (err) {
    console.error(err);
    res.send(500).json(err);
  }
}

export async function forceListAllProduct(req, res) {
  const { id, name, email, role } = req.user;

  try {
    if (role != "admin") {
      return res.status(401).json({ message: "Only Admin can access" });
    }

    const allRecords = await VendorProduct.findAll({ paranoid: false });

    if (!allRecords) {
      return res.status(404).json({ message: "Nothing to show! No products exists :(" });
    }

    auditFunctionality(id, name, role, email, `force listed all products`);

    res.status(200).send({ message: "All records retrived Successfully", records: allRecords });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function listSingleProduct(req, res) {
  const { id, name, email, role } = req.user;
  const productId = req.params.id;

  try {
    if (role != "admin") {
      return res.status(401).json({ message: "Only Admin can access" });
    }

    const allRecords = await VendorProduct.findByPk(productId, { paranoid: false });

    if (!allRecords) {
      return res.status(404).json({ message: "Nothing to show! No products exists :(" });
    }

    auditFunctionality(id, name, role, email, `force listed all products`);

    res.status(200).send({ message: "All records retrived Successfully", records: allRecords });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function deleteAProduct(req, res) {
  //to counter spam and listen to reports
  const { id, name, email, role } = req.user;
  const productId = req.params.id;

  try {
    if (role != "admin") {
      return res.status(401).json({ message: "Only Admin can access" });
    }

    const itemToDelete = await VendorProduct.findByPk(productId);

    if (!itemToDelete) {
      return res.status(404).json({ message: "Item Not Found OR Its deleted Already" });
    }

    const deleted = await VendorProduct.destroy({ where: { id: productId } });

    auditFunctionality(id, name, role, email, `deleted a product with id:${productId}`);

    res.status(200).json({ message: "Item deleted Sucessfully", itemDeleted: itemToDelete, deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function readAuditLogs(req, res) {
  const { id, name, email, role } = req.user;

  try {
    if (role != "admin") {
      return res.status(403).json({ message: "You are not authorized to access at ALL.!-!" });
    }

    const gettingAllLogs = await AdminAuditModel.findAll();

    if (gettingAllLogs.length == 0) {
      return res.status(404).json({ message: "Logs are empty." });
    }

    auditFunctionality(id, name, role, email, `accessed the logs viewed ${gettingAllLogs.length} logs`);

    res.status(200).send({ message: "Logs retrieved successfully", gettingAllLogs });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function userCounts(req, res) {
  const { id, name, email, role } = req.user;

  try {
    if (role != "admin") {
      return res.status(403).json({ message: "You are not authorized to access at ALL.!-!" });
    }

    const distinctNamesCount = await UserTable.count();

    auditFunctionality(id, name, role, email, `counts the user`);

    res.status(200).json({ message: "Logs retrieved successfully", distinctNamesCount });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
