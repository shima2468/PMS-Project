import  { useContext, useEffect, useState } from "react";
import TasksCard from "../TasksCard/TasksCard";
import { axiosInstance, TASKS_URLS } from "../../../../Services/url";
import { AuthContext } from "../../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { IUserTasks, TTask } from "../../../../interfaces/TasksInterface";
import toast from "react-hot-toast";

const TasksEmployee = () => {
  const [Tasks, setTasks] = useState<TTask[]>([]);
  const todoTasks = Tasks.filter(({ status }) => status == "ToDo");
  const InProgressTasks = Tasks.filter(({ status }) => status == "InProgress");
  const DoneTasks = Tasks.filter(({ status }) => status == "Done");
  const { loginData } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const GetAllAssignedTasks = async () => {
    try {
      const response = await axiosInstance.get<IUserTasks>(
        TASKS_URLS.GET_ASSIGNED_TASKS(5, 1)
      );
      
      setTasks(response?.data?.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch tasks");
    }
  };
  useEffect(() => {
    if (loginData?.userGroup !== "Manager") {
      GetAllAssignedTasks();
    } else {
      navigate("login");
    }
  }, [loginData?.userGroup, navigate]);
  return (
    <div className="Tasks-card">
      <div className="task-header py-5 ps-4 fw-medium">
        <h3>Task Board</h3>
      </div>

      <div className="row px-4">
        <TasksCard
          {...{ GetAllAssignedTasks }}
          title="ToDo"
          userTasks={todoTasks}
          setTasks={setTasks}
        />
        <TasksCard
          {...{ GetAllAssignedTasks }}
          title="InProgress"
          userTasks={InProgressTasks}
          setTasks={setTasks}
        />
        <TasksCard
          {...{ GetAllAssignedTasks }}
          title="Done"
          userTasks={DoneTasks}
          setTasks={setTasks}
        />
      </div>
    </div>
  );
};

export default TasksEmployee;
