import { Op } from "sequelize";
import { TodoTable } from "../models/associationIndex.js";

export async function postTodo(req, res) {
  const { id, name, email } = req.user;
  const payload = req.body.payload;
  //   console.log(payload, id);

  try {
    const result = await TodoTable.create({ text: payload.text, completed: payload.completed, userID: id });
    console.log(result);
    res.status(200).send({ message: "Post added Successfully", response: result });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function getTodo(req, res) {
  const { id, name, email } = req.user;
  try {
    const result = await TodoTable.findAll({ where: { userID: id } });

    res.status(200).send({ message: "Post retrieved succesfully", response: result });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function deleteTodo(req, res) {
  const { id, name, email } = req.user;
  const { todoId } = req.params;
  try {
    const result = await TodoTable.destroy({ where: { id: todoId } });
    console.log(result);

    res.status(200).send({ message: "Todo deleleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function markTodo(req, res) {
  const { id, name, email } = req.user;
  const { todoId } = req.params;
  try {
    const isCompleted = await TodoTable.findByPk(todoId);
    console.log(isCompleted.dataValues.completed);
    const currentState = isCompleted.dataValues.completed;
    const result = await TodoTable.update({ completed: !currentState }, { where: { id: todoId } });
    let message = "";
    if (currentState) {
      message = "Great for Completing Task.";
    } else {
      message = "Misclicks happens :/";
    }

    res.status(200).send({ message: message });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function markTodoCompleted(req, res) {
  const { id, name, email } = req.user;

  try {
    const result = await TodoTable.update({ completed: true }, { where: { userId: id } });

    res.status(200).send({ message: "Everything completed Awesome!!!", response: result });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function clearAllCompletedTodo(req, res) {
  const { id, name, email } = req.user;
  try {
    const result = await TodoTable.destroy({ where: { [Op.and]: [{ completed: true }, { userId: id }] } });

    res.status(200).send({ message: "New Journey begins" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function changeColor(req, res) {
  const { id, name, email } = req.user;
  const { todoId } = req.params;
  const { color } = req.body;
  try {
    const result = await TodoTable.update({ color: color }, { where: { id: todoId } });
    res.status(200).send({ message: "Badge color chnaged Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function editTodo(params) {}
