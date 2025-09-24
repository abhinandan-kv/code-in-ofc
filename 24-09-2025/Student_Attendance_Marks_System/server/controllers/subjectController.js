import SubjectTable from "../models/subjectModel.js";

export async function addSubject(req, res) {
  try {
    const { id, name, email, role } = req.user;
    const subject = req.body; // subject = ["qwerty", "uiop"]

    const result = await Promise.all(subject.map((name) => SubjectTable.create({ name: name })));

    res.status(200).send({ message: "Subject added Sucessfully", response: result });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
