//admin ops
export async function listAllUsers(req, res) {
  const { role } = req.body;

  try {
    if (role != "admin") {
      res.status(401).send("Only admin can access.");
    }
    const result = await UserTable.findAll();

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
      res.status(401).send("Only admin can access");
    }

    const result = await UserTable.update({ isActive: true, approvedBy: `Approved By ${name} email:${email}` }, { where: { id: userId } });
    const newData = await UserTable.findByPk(userId);

    res.status(200).json({ message: "data updated sucessfully", newData });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function deleteUser(req, res) {
  const userIdToDelete = req.params.id;
  const { id, name, email } = req.user;

  try {
    if (role != "admin") {
      res.status(401).send("Only Admin can access");
    }

    const settingReference = await UserTable.update({ references: `Account Deleted by admin with id:${id} name:${name} contact:${email}` });
    const result = await UserTable.destroy({ where: { id: userIdToDelete } });

    res.status(200).send(`User deleted Successfully, you can request for reactivation within 24 hours at this ${email}`);
  } catch (err) {
    console.error(err);
    res.send(500).json(err);
  }
}
