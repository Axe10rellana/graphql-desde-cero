//react
import React from "react";

//Apollo-client
import { useMutation } from "@apollo/client";

//GraphQL
import { DELETE_TASK } from "../../graphql/tasks";

//React-icons
import { AiOutlineDelete } from "react-icons/ai";

const TaskCard = ({ task }) => {
  //GraphQL
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: ["getProject"],
  });

  //functions
  const handleClick = () => {
    deleteTask({
      variables: {
        id: task._id,
      },
    });
  };

  return (
    <div className="mb-2 flex w-full items-center justify-between rounded-lg bg-zinc-800 p-4 shadow-lg shadow-black">
      <h2 className="text-lg">{task.title}</h2>
      <button
        className="rounded-md bg-red-600 p-1 text-lg hover:bg-red-400"
        onClick={handleClick}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default TaskCard;
