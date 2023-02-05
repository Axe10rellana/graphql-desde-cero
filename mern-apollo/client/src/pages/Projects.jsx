//react
import React from "react";

//components
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";

const Projects = () => {
  return (
    <div className="h-screen w-full overflow-y-scroll rounded-md bg-zinc-900 p-8 shadow-lg shadow-black lg:h-4/5 lg:w-3/5">
      <h1 className="mb-4 py-2 text-2xl font-bold">Project Manager</h1>
      <div className="flex justify-between gap-x-1">
        <ProjectForm />
        <ProjectList />
      </div>
    </div>
  );
};

export default Projects;
