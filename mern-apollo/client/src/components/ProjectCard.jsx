//react
import React from "react";

//React-router-dom
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  //react-router
  const navigate = useNavigate();

  return (
    <div
      className="mb-2 w-full cursor-pointer rounded-lg bg-zinc-800 p-4 shadow-lg shadow-black hover:bg-zinc-700"
      onClick={() => navigate(`/projects/${project._id}`)}
    >
      <h2>{project.name}</h2>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectCard;
