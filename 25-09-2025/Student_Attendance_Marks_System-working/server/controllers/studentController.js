import AuthTable from "../models/AuthModel.js";
import StudentTable from "../models/studentModel.js";

//list students
export async function getStudents(req, res) {
  const { id, email, phoneNo, role } = req.user;
  try {
    if (role === "Student") {
      return res.status(200).send({ message: "Unauthorized Access" });
    }
    const result = await StudentTable.findAll({
      include: [{ model: AuthTable, attributes: ["email", "phoneNumber", "isActive"] }],
    });

    res.status(200).send({ message: "Student List Retrived Successfully", response: result });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

//delete student
export async function deleteStudent(req, res) {
  const { id, email, phoneNo, role } = req.user;
  const studentId = req.params.studentid;

  try {
    if (role === "Student") {
      return res.status(200).send({ message: "Unauthorized Access" });
    }

    const result = await AuthTable.update({ isActive: false }, { where: { email: email } });
    if (result) {
      const deleteUser = await StudentTable.destroy({ where: { authId: result.dataValues.id } });
      console.log(deleteUser);
    }
    res.status(200).send({ message: "User deleted Successfully", response: result });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
