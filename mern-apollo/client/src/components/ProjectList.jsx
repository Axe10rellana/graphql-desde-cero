//react
import React from "react";

//Apollo-client
import { useQuery } from "@apollo/client";

//GraphQL
import { GET_PROJECTS } from "../graphql/projects";

//components
import ProjectCard from "./ProjectCard";
import Loader from "./Loader";

const ProjectList = () => {
  //GraphQL
  const { loading, error, data } = useQuery(GET_PROJECTS);

  //validations
  if (loading)
    return (
      <p className="flex w-full items-center justify-center bg-white text-center text-3xl font-bold text-blue-400">
        <Loader />
      </p>
    );
  if (error)
    return (
      <p className="flex w-full items-center justify-center bg-white text-center text-lg font-bold text-red-500">
        Error
      </p>
    );

  return (
    <div className="w-full px-5">
      {data.projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
