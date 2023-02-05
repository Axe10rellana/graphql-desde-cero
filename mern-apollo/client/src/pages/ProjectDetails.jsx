//react
import React from "react";

//React-router-dom
import { useParams, Link, useNavigate } from "react-router-dom";

//Apollo-client
import { useQuery, useMutation } from "@apollo/client";

//GraphQL
import { GET_PROJECT, DELETE_PROJECT } from "../graphql/projects";

//components
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm";
import Loader from "../components/Loader";

//React-icons
import { AiOutlineArrowLeft, AiOutlineDelete } from "react-icons/ai";

const ProjectDetails = () => {
  //react-router-dom
  const params = useParams();
  const navigate = useNavigate();

  //GraphQL
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: {
      id: params.id,
    },
  });

  const [deleteProject, { error: deleteError }] = useMutation(DELETE_PROJECT, {
    refetchQueries: ["getProjects"],
  });

  //functions
  const handleDelete = async () => {
    const result = await deleteProject({
      variables: {
        id: params.id,
      },
    });
    if (result.data.deleteProject._id) {
      navigate("/projects");
    }
  };

  //validations
  if (loading)
    return (
      <div className="flex h-screen w-full select-none items-center justify-center rounded-md bg-white text-center text-3xl font-bold text-blue-400 lg:h-4/5 lg:w-3/5">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen w-full select-none items-center justify-center rounded-md bg-white text-center text-lg font-bold text-red-500 lg:h-4/5 lg:w-3/5">
        <p>Error</p>
      </div>
    );

  return (
    <div className="h-screen w-full select-none overflow-y-scroll rounded-md bg-zinc-900 p-8 shadow-lg shadow-black lg:h-4/5 lg:w-3/5">
      <Link to="/projects">
        <button className="mb-3 rounded-md bg-blue-600 p-1 text-white">
          <AiOutlineArrowLeft />
        </button>
      </Link>
      {deleteError && (
        <p className="mb-2 bg-red-500 p-2 text-center">{deleteError.message}</p>
      )}
      <div className="mb-3 bg-zinc-800 p-10">
        <h1 className="text-2xl font-bold">{data.project.name}</h1>
        <p className="mb-3">{data.project.description}</p>
        <button
          onClick={handleDelete}
          className="rounded-md bg-red-600 p-1 hover:bg-red-400"
        >
          <AiOutlineDelete />
        </button>
      </div>
      <TaskForm />
      <TaskList tasks={data.project.tasks} />
    </div>
  );
};

export default ProjectDetails;
