import chalk from "chalk";
import Conf from "conf";

const conf = new Conf();

function list() {
  //   {
  //     text, done;
  //   }
  const todoList = conf.get("todo-list");

  if (todoList && todoList.length) {
    console.log(chalk.blue.bold("Tasks in green are done. Tasks in yellow are still not done."));
    todoList.forEach((task, index) => {
      if (task.done) {
        console.log(chalk.greenBright(`${index}. ${task.text}`));
      } else {
        console.log(chalk.yellowBright(`${index}. ${task.text}`));
      }
    });
  } else {
    console.log(chalk.red.bold("You dont have any data yet."));
  }
}

export default list;
