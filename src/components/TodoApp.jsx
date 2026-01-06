import React, { useContext, useEffect, useState } from "react";
import instance from "../constants/axios";
import { getTodoList, addTodo } from "../services/TodoService";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext);

  useEffect(() => {
    getTodos();
  }, []);

  const handleAddTodo = async () => {
    try {
      // const result = await instance.post("/todos", {
      //   title: newTodo,
      //   description: "New todo item",
      // });
      // console.log(result);
      // result.data.success
      const data = await addTodo(newTodo);
      if (data.success) {
        toast.success("Todo Added Successfully", {
          position: "bottom-right",
          theme: "dark",
        });

        // toast.error("Todo Deleted Successfully", {
        //   position: "bottom-right",
        //   theme: "dark",
        // });
        getTodos();
        setNewTodo("");
      } else {
        toast("Todo not added");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTodos = async () => {
    try {
      const result = await getTodoList();
      console.log(result);
      setTodos(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const notify = () => {
    toast("Toast is working");
  };

  return (
    <div>
      {user ? (
        <>
          <p>
            Welcome, {user.username} {user.role}
          </p>
          <button onClick={handleLogout}>logout</button>
        </>
      ) : (
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          login
        </button>
      )}

      <h5>TodoApp</h5>
      {/* {user.role.toLowerCase() === "admin" ? ( */}
      <>
        <input
          type="text"
          placeholder="Todo title"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </>
      {/* ) : (
        <></>
      )} */}
      {todos.map((item) => (
        <div key={item._id}>
          {item._id} - {item.title} - {item.description}
          {"- "}
          {item.completed ? "Done" : "Pending"}
        </div>
      ))}

      <ToastContainer />
    </div>
  );
}

export default TodoApp;
