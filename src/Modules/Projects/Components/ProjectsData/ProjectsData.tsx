import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { requiredValidation } from "../../../../Services/Vaildition";
import { axiosInstance, PROJECTS_URLS } from "../../../../Services/url";
import type { IProjectData } from "../../../../interfaces/ProjectsInterface";
import Header from "../../../Shared/Components/Header/Header";

const ProjectsData = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const location = useLocation();
  const project = location.state;

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
  } = useForm<IProjectData>({ mode: "onChange" });
  const onSubmit = async (data: IProjectData): Promise<void> => {
    try {
      const res = await axiosInstance[projectId ? "put" : "post"](
        projectId
          ? PROJECTS_URLS.UPDATE_PROJECT(projectId)
          : PROJECTS_URLS.ADD_PROJECT,
        data
      );
      toast.success(
        projectId
          ? res?.data?.message || "Project updated successfully!"
          : res?.data?.message || "Project added successfully!"
      );
      navigate("/dashboard/projects");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        projectId
          ? error?.response?.data?.message || "Failed To Update Project"
          : error?.response?.data?.message || "Failed To Add Project "
      );
    }
  };
  useEffect(() => {
    if (projectId) {
      setValue("title", project.title);
      setValue("description", project.description);
    }
  }, [projectId, setValue, project]);
  return (
    <>
      <Header
        showBackButton={true}
        title={`${projectId ? "Update" : "Add A New"} Project`}
        items="Projects"
        backPath="/dashboard/projects"
      />
      <div className="container-fluid form-background">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <form
              className="add-update-form card-container p-5 rounded-4 mt-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div
                className={`form-group ${errors.title ? "has-error" : ""} mb-5`}
              >
                <label htmlFor="projectName" className="mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control input mb-3"
                  id="projectName"
                  placeholder="Name"
                  {...register("title", requiredValidation)}
                />
                {errors.title && (
                  <span className="text-danger">{errors?.title?.message}</span>
                )}
              </div>
              <div className="form-group mb-5">
                <label htmlFor="projectDescription" className="mb-2">
                  Description
                </label>
                <textarea
                  className="form-control input mb-3"
                  id="projectDescription"
                  rows={3}
                  placeholder="Description"
                  {...register("description", requiredValidation)}
                />
                {errors.description && (
                  <span className="text-danger">
                    {errors?.description?.message}
                  </span>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <Link
                  to={"/dashboard/projects"}
                  type="button"
                  className="btn bg-transparent border-black rounded-5 px-3 py-2"
                  onClick={() => {
                    navigate("/dashboard/projects");
                  }}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="main-btn"
                >
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
export default ProjectsData;
