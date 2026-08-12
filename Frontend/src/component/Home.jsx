import React, { useEffect, useState } from "react";
import axios from "axios";
import { LuPlus, LuClipboardList, LuPencil, LuTrash2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [Todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    text: "",
    completed: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todo/fetch", {
          withCredentials: true,
        });

        setTodos(response.data.Todos);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, []);

  const createTodo = async () => {
    try {
      const respone = await axios.post(
        "http://localhost:3000/todo/create",
        {
          text: newTodo.text,
          completed: newTodo.completed,
        },
        {
          withCredentials: true,
        },
      );

      setTodos([...Todos, respone.data.Todos]);
      console.log(respone);

      setNewTodo({
        text: "",
        completed: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/todo/delete/${id}`,
        {
          withCredentials: true,
        },
      );

      setTodos(Todos.filter((t) => t._id !== id));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (id) => {
    try {
      const todo = Todos.find((t) => t._id == id);

      const response = await axios.put(
        `http://localhost:3000/todo/update/${id}`,
        {
          text: todo.text,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        },
      );

      setTodos(Todos.map((t) => (t._id == id ? response.data.todos : t)));
    } catch (error) {
      console.log(error);
    }
  };

  const todoLenght = Todos.filter((t) => t.completed === false).length;

  const logout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("token");
      toast.success("Logout Successful !");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Logout Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 md:px-10 lg:px-20">
      {/* Header */}
      <div className="mx-auto max-w-4xl mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-600 text-white p-3 rounded-xl shadow-md">
            <LuClipboardList size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">Todo App</h1>
            <p className="text-sm text-slate-500">Manage your tasks easily</p>
          </div>
        </div>
      </div>

      {/* Add Todo Card */}
      <div className="mx-auto max-w-4xl bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Add New Todo
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newTodo.text}
            placeholder="Enter a task..."
            className="flex-1 border border-slate-300 rounded-lg px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
            onChange={(e) =>
              setNewTodo({
                ...newTodo,
                text: e.target.value,
              })
            }
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition duration-200 shadow-sm cursor-pointer"
            onClick={createTodo}
          >
            <LuPlus size={19} />
            Add Todo
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className="mx-auto max-w-4xl mt-6 bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
        {/* List Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Your Todos</h2>
            <p className="text-sm text-slate-500 mt-1">
              Keep track of your daily tasks
            </p>
          </div>

          <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-sm font-medium">
            {todoLenght} Tasks
          </span>
        </div>

        {/* Todo Items */}
        {Todos.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <LuClipboardList size={40} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">No todos yet.</p>
            <p className="text-xs mt-1">Add your first task above.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {Todos.map((t, index) => (
              <li
                key={t._id}
                className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-slate-200 rounded-xl px-4 py-4 hover:border-blue-200 hover:shadow-sm transition duration-200"
              >
                {/* Todo Text */}
                <div className="flex items-center gap-3 min-w-0">
                  <input
                    type="checkbox"
                    className="appearance-none shrink-0 w-5 h-5 border-2 border-slate-300 rounded-full cursor-pointer transition checked:bg-blue-600 checked:border-blue-600"
                    onChange={() => updateTodo(t._id)}
                  />

                  <span
                    className={
                      t.completed === true
                        ? "text-slate-400 font-medium underline"
                        : "text-slate-700 font-medium break-words"
                    }
                  >
                    {t.text}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 border border-amber-400 text-amber-500 hover:bg-amber-50 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer">
                    <LuPencil size={15} />
                    Edit
                  </button>

                  <button
                    className="flex items-center gap-1.5 border border-red-400 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
                    onClick={() => deleteTodo(t._id)}
                  >
                    <LuTrash2 size={15} />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            className="cursor-pointer rounded-lg border border-red-400 px-4  py-2 text-md font-medium text-red-600 transition hover:bg-red-50 "
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
