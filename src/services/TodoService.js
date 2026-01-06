// UserslistService.js
// getUsersList
import instance from "../constants/axios";

//UpdateTodo
//DeleteTodo
//ToggleTodo

const getTodoList = async () => {
  try {
    const result = await instance.get("/todos");
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const addTodo = async (todo) => {
  try {
    const result = await instance.post("/todos", {
      title: todo,
      description: "New todo item",
    });

    return result.data;
  } catch (error) {}
};

export { getTodoList, addTodo };
