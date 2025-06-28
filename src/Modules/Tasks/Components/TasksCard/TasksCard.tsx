import { motion } from "framer-motion";
import React from "react";
import { axiosInstance, TASKS_URLS } from "../../../../Services/url";
import TaskCard from "./TasksCard.module.css";

interface IProps {
  title: TStatus;
  userTasks: TTask[];
  GetAllAssignedTasks: () => Promise<void>;
  setTasks: React.Dispatch<React.SetStateAction<TTask[]>>;
   getTasksCount: () => Promise<void>;
}

type TTask = {
  id: number;
  status: TStatus;
  title: string;
  description: string;
};

type TStatus = "ToDo" | "InProgress" | "Done";

const TasksCard = ({
  title,
  userTasks,
  GetAllAssignedTasks,
  setTasks,
  getTasksCount,
}: IProps) => {
  const TaskChangeStatus = async (id: string, status: string) => {
    try {
     await axiosInstance.put(
        TASKS_URLS.Task_CHANGE_STATUS(id),
        { status }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`col-md-4 ${TaskCard["Cards"]}`}>
      <div className="d-flex flex-column">
        <h5>{title}</h5>
        <motion.div
          layout
          layoutId={title}
          key={title}
          onDrop={async (e) => {
            e.preventDefault();
            const nativeEvent = e.nativeEvent as DragEvent;
            const id = nativeEvent.dataTransfer?.getData("id");
            const prevStatus = nativeEvent.dataTransfer?.getData("prevStatus");
            if (id && prevStatus !== title) {
              setTasks((prevTask) =>
                prevTask.map((task) =>
                  task.id === +id ? { ...task, status: title } : task
                )
              );
              await TaskChangeStatus(id, title);
            await  GetAllAssignedTasks();
              try {
      await getTasksCount();
    } catch (err) {
      console.error("Failed to update task counts", err);
    }
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          className={`${TaskCard["card-body"]} d-flex flex-column gap-3`}
        >
          {userTasks.map(({ id, title, status }) => (
            <motion.div key={id} layout layoutId={id.toString()}>
              <div
                draggable
                onDragStart={(e) => {
                  const nativeEvent = e.nativeEvent as DragEvent;
                  nativeEvent.dataTransfer?.setData("id", id.toString());
                  nativeEvent.dataTransfer?.setData("prevStatus", status);
                }}
                className={`${TaskCard["inside-card"]} text-white`}
              >
                {title}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TasksCard;
