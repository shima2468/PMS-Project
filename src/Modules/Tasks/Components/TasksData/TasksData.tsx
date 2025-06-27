import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Components/Header/Header";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  axiosInstance,
  PROJECTS_URLS,
  TASKS_URLS,
  USERLIST,
} from "../../../../Services/url";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type {
  IEmployee,
  IProject,
  ITaskData,
} from "../../../../interfaces/TasksInterface";

const TasksData: React.FC = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);

  const { taskId } = useParams();
  const location = useLocation();
  const task = location.state;
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ITaskData>({ mode: "onChange" });

  const fetchEmployees = async () => {
    try {
      const res = await axiosInstance.get(USERLIST.GETALLUSERS);
      setEmployees(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch employees");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get(PROJECTS_URLS.GET_ALL_PROJECTS);
      setProjects(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchProjects();
  }, []);

  useEffect(() => {
    if (taskId && task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("employeeId", task.employeeId);
      setValue("projectId", task.projectId);
    }
  }, [taskId, task, setValue]);

  const onSubmit = async (data: ITaskData) => {
    try {
      const payload = taskId
        ? {
            title: data.title,
            description: data.description,
            employeeId: data.employeeId,
          }
        : data;

      const res = await axiosInstance[taskId ? "put" : "post"](
        taskId ? TASKS_URLS.UPDATE_TASK(taskId) : TASKS_URLS.ADD_TASK,
        payload
      );

      toast.success(
        taskId ? "Task updated successfully!" : "Task added successfully!"
      );
      navigate("/dashboard/tasks", { state: { added: true } });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Task submission failed");
    }
  };

  return (
    <>
      <Header
        showBackButton={true}
        title={`${taskId ? "Update" : "Add a New"} Task`}
        items="Tasks"
        backPath="/dashboard/tasks"
      />

      <div className="container-fluid form-background">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-5 rounded-4 mt-5 add-update-form"
            >
              <div className="mb-3">
                <label>Title</label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className="form-control"
                  placeholder="Enter task title"
                />
                {errors.title && (
                  <small className="text-danger">{errors.title.message}</small>
                )}
              </div>

              <div className="mb-3">
                <label>Description</label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="form-control"
                  placeholder="Enter task description"
                />
                {errors.description && (
                  <small className="text-danger">
                    {errors.description.message}
                  </small>
                )}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>User</label>
                  <select
                    {...register("employeeId", {
                      required: "Please select an employee",
                    })}
                    className="form-control"
                  >
                    <option value="">-- Select User --</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.userName}
                      </option>
                    ))}
                  </select>
                  {errors.employeeId && (
                    <small className="text-danger">
                      {errors.employeeId.message}
                    </small>
                  )}
                </div>

                {!taskId && (
                  <div className="col-md-6 mb-3">
                    <label>Project</label>
                    <select
                      {...register("projectId", {
                        required: "Please select a project",
                      })}
                      className="form-control"
                    >
                      <option value="">-- Select Project --</option>
                      {projects.map((proj) => (
                        <option key={proj.id} value={proj.id}>
                          {proj.title}
                        </option>
                      ))}
                    </select>
                    {errors.projectId && (
                      <small className="text-danger">
                        {errors.projectId.message}
                      </small>
                    )}
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  className="btn bg-transparent border-black rounded-5 px-3 py-2"
                  onClick={() => navigate("/dashboard/tasks")}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button type="submit" className="main-btn">
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TasksData;
