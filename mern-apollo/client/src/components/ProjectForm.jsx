//react
import { useState } from "react";

//Apollo-client
import { useMutation } from "@apollo/client";

//GraphQL
import { CREATE_PROJECT, GET_PROJECTS } from "../graphql/projects";
import { AiOutlineSave } from "react-icons/ai";

const ProjectForm = () => {
  //state variables
  const [project, setProject] = useState({
    name: "",
    description: "",
  });

  //GraphQL
  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
      },
      "GetProjects",
    ],
  });

  //functions
  const handleChange = ({ target: { name, value } }) => {
    setProject({
      ...project,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject({
      variables: {
        name: project.name,
        description: project.description,
      },
    });
    e.target.reset();
  };

  return (
    <form className="mb-3 w-2/5" onSubmit={handleSubmit}>
      {error && (
        <p className="w-full rounded-lg bg-white p-4 text-center text-lg font-bold text-red-500">
          {error.message}
        </p>
      )}
      <input
        type="text"
        placeholder="Write a title"
        name="name"
        autoComplete="off"
        onChange={handleChange}
        className="mb-3 block w-full rounded-lg bg-zinc-500 p-4 text-white shadow-lg"
        required
      />
      <textarea
        placeholder="Write a description"
        name="description"
        rows="3"
        onChange={handleChange}
        className="mb-3 block w-full resize-none rounded-lg bg-zinc-500 p-4 text-white shadow-lg"
        required
      ></textarea>
      <button
        className="rounded-md bg-blue-600 p-1 text-lg hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-zinc-400"
        disabled={!project.name || !project.description || loading}
      >
        <AiOutlineSave />
      </button>
    </form>
  );
};

export default ProjectForm;
