import QUESTION from "../Models/questionModel";

export async function postQuestion(req, res) {
  const { name, email } = req.user;
  const { question, answer } = req.body;

  try {
    const result = await QUESTION.create({
      questionName: question,
      questionAnswer: answer,
      createdByName: name,
      createdByEmail: email,
    });

    res.status(200).send({ message: "" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
