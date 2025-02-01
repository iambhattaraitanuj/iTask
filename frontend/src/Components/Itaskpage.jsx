import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const Itaskpage = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [dynamicText, setDynamicText] = useState("Save");

  const fetchData = async () => {
    await axios
      .get(`http://localhost:3001/api/tasks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data.error === "Unauthorized") {
          return false;
        } else {
          setTodos(response.data);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleForm = async (e) => {
    try {
      e.preventDefault();
      await axios
        .post(
          "http://localhost:3001/api/add",
          { message: input },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.error === "Unauthorized") {
            toast.error("Unauthorized. Please login", {
              theme: "colored",
              position: "bottom-right",
            });
          }
          fetchData();
        });

      setDynamicText("Save");

      setInput("");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteIcon = async (list) => {
    try {
      await axios.post(
        `http://localhost:3001/api/delete`,
        { deleteList: list.title },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData();
    } catch (err) {
      console.error(err.messsage);
    }
  };

  const handleEditIcon = async (list) => {
    try {
      setInput(list.title);
      await axios.post(
        `http://localhost:3001/api/edit`,
        { editList: list.title },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDynamicText("Edit");
      fetchData();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleClear = async () => {
    try {
      await axios.get("http://localhost:3001/api/clear", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      fetchData();
    } catch (err) {
      console.error(err.messsage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-14 md:pt-6">
      <div className="bg-violet-100 h-[700px] w-[360px] m-auto rounded-md shadow-md p-3 md:w-[700px] md:shadow-lg md:h-[530px]">
        <div>
          <p className="text-center font-bold text-2xl text-slate-800">
            iTask Manager
          </p>
        </div>
        <form
          onSubmit={handleForm}
          className="flex gap-2 flex-col items-center justify-center md:gap-0"
        >
          <div className="title-div">
            <input
              type="search"
              name="text"
              className=" p-2 rounded-md w-[330px] mt-3 md:w-[640px] outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text here.."
              required
            />
          </div>
          <div className="button-div">
            <button
              type="submit"
              className="bg-violet-700 text-white p-2 w-[330px] transition-all rounded-md md:mt-2 md:w-[640px] md:hover:bg-violet-600"
            >
              {dynamicText}
            </button>
          </div>
        </form>
        <div className="todo-lists pt-5 md:pt-3">
          <div className=" flex flex-col gap-3 pt-3 h-[510px] overflow-y-scroll md:h-[360px]">
            <div className="text-lg pl-2 font-bold md:pl-5">Your Tasks</div>
            {todos.length < 1 ? (
              ""
            ) : (
              <div
                onClick={handleClear}
                className="text-[16px] text-white w-20 ml-2 text-center bg-red-700 p-2 rounded-md  cursor-pointer transition-all md:hover:bg-red-600 md:ml-5"
              >
                Clear All
              </div>
            )}

            {todos.length !== 0 ? (
              todos &&
              todos.map((list) => {
                return (
                  <ul
                    key={list._id}
                    className="flex items-center justify-between"
                  >
                    <li
                      key={list}
                      className="flex items-center gap-2 text-[16px] w-[275px] md:w-[560px] pl-4 md:pl-6"
                    >
                      {list.title}
                    </li>
                    <div className="buttons flex gap-3 items-center justify-center pr-4">
                      <div className="edit-button">
                        <button
                          className="w-8 h-7 flex items-center justify-center transition-all bg-violet-700 rounded-md hover:bg-violet-600"
                          onClick={(e) => handleEditIcon(list)}
                        >
                          <FaEdit className="text-[18px] text-white  cursor-pointer" />
                        </button>
                      </div>
                      <div className="delete-button">
                        <button
                          className="w-8 h-7 flex items-center justify-center transition-all bg-violet-700 rounded-md hover:bg-violet-600"
                          onClick={(e) => handleDeleteIcon(list)}
                        >
                          {" "}
                          <BsTrash3Fill className="text-[18px] text-white  cursor-pointer" />
                        </button>
                      </div>
                    </div>
                  </ul>
                );
              })
            ) : (
              <div className="text-center">No tasks to show</div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Itaskpage;
