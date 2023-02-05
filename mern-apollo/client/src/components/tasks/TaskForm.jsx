//react
import React from "react";

//Apollo-client
import { useMutation } from "@apollo/client";

//GraphQL
import { CREATE_TASK } from "../../graphql/tasks";

//react-router-dom
import { useParams } from "react-router-dom";

//React-icons
import { AiOutlineSave } from "react-icons/ai";

const TaskForm = () => {
  //react-router-dom
  const params = useParams();

  //GraphQL
  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: ["getProject"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({
      variables: {
        title: e.target.title.value,
        projectId: params.id,
      },
    });
    e.target.reset();
    e.target.title.focus();
  };

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Write a title"
        autoComplete="off"
        className="mb-2 w-full rounded-lg bg-zinc-500 p-2 text-white"
        required
      />
      <button className="rounded-md bg-green-600 p-1 text-lg hover:bg-green-400">
        <AiOutlineSave />
      </button>
    </form>
  );
};

export default TaskForm;
