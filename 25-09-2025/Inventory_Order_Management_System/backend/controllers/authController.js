export async function Auth(req, res) {
  try {
    res.status(200).send({ message: "Authenticated" });
  } catch (err) {
    res.status(500).send(err);
  }
}
