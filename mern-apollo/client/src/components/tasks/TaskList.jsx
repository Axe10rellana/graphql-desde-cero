//react
import React from "react";

//components
import TaskCard from "./TaskCard";

const TaskList = ({ tasks }) => {
  return (
    <div className="">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
