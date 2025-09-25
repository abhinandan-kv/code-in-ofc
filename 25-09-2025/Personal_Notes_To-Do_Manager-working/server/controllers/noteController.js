import { NoteTable } from "../models/associationIndex.js";

export async function postNewNote(req, res) {
  const { id, name, email } = req.user;
  const payload = req.body.payload;
  console.log("ssssssssssssssssssssssssssssssss", req.body);
  try {
    const result = await NoteTable.create({ text: payload.text, uid: id });
    console.log(result);
    res.status(200).send({ message: "Notes added Successfully", response: result });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function getNote(req, res) {
  const { id, name, email } = req.user;
  try {
    const result = await NoteTable.findAll({ uid: id });
    res.status(200).send({ message: "Notes retrived successfully", response: result });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

// export async function deleteNote(req,res) {

//     try {
//         const result = await NoteTable.destroy({where:{id: }})
//     } catch (error) {
//         console.error(error)
//         res.status(500).send(error)
//     }
// }
