import React, { useEffect, useState } from 'react';
import Header from '../../../Shared/Components/Header/Header';
// import { TaskData } from '../../../../interfaces/data';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { axiosInstance, PROJECTS_URLS, TASKS_URLS, USERLIST } from '../../../../Services/url';
import { Navigate, useNavigate } from 'react-router-dom';

interface TaskData {
  title : string,
  description : string , 
  employeeId : number , 
  projectId :number 
}
interface Employee {
    id:number,
     userName: string;
}

interface Project {
    id: number;
  title: string;
}



const TasksData: React.FC =()=>
{


  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();


const fetchEmployees = async () => {
  try {
    const res = await axiosInstance.get(USERLIST.GETALLUSERS);
    setEmployees(res.data.data); 
  } catch (err) {
    toast.error('Failed to fetch employees');
  }
};

const fetchProjects = async () => {
  try {
    const res = await axiosInstance.get(PROJECTS_URLS.GET_ALL_PROJECTS);
    console.log("Projects Response:", res.data);
    setProjects(res.data.data);
  } catch (err) {
    toast.error('Failed to fetch projects');
  }
};


  useEffect(()=>{
fetchEmployees()
fetchProjects()
  } , [])


    const { register, handleSubmit,formState: { errors, isSubmitting },} = useForm<TaskData>();

    const onSubmit =async (data: TaskData)=>{
        try {
            const response =await axiosInstance.post (TASKS_URLS.ADD_TASK ,data);
            toast.success('Task added successfully!');
            console.log(response);
        }
        catch (error:any){
            toast.error(error.response?.data?.message || 'Failed to add task.');
        }
    }


    return (
        <>
        <Header
        showBackButton={true}
        title={"tasks"}
        items="tasks"
        backPath="/dashboard/tasks"
      />


<div className="container-fluid form-background">
<div className="row justify-content-center">
<div className="col-md-9">
        <form onSubmit={handleSubmit(onSubmit)} className=" bg-white p-5 rounded-4 mt-5 add-update-form">

        {/* Title */}
        <div className="mb-3">
          <label>Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="form-control"
            placeholder="Enter task title"
          />
          {errors.title && <small className="text-danger">{errors.title.message}</small>}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label>Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="form-control"
            placeholder="Enter task description"
          />
          {errors.description && <small className="text-danger">{errors.description.message}</small>}
        </div>

<div className="row">
  {/* Employee Select */}
  <div className="col-md-6 mb-3">
    <label> Employee</label>
    <select
      {...register('employeeId', { required: 'Please select an employee' })}
      className="form-control"
    >
      <option value="">-- Select Employee --</option>
      {employees.map(emp => (
        <option key={emp.id} value={emp.id}>
          {emp.userName}
        </option>
      ))}
    </select>
    {errors.employeeId && (
      <small className="text-danger">{errors.employeeId.message}</small>
    )}
  </div>

  {/* Project Select */}
  <div className="col-md-6 mb-3">
    <label>Project</label>
    <select
      {...register('projectId', { required: 'Please select a project' })}
      className="form-control"
    >
      <option value="">-- Select Project --</option>
      {projects.map(proj => (
        <option key={proj.id} value={proj.id}>
          {proj.title}
        </option>
      ))}
    </select>
    {errors.projectId && (
      <small className="text-danger">{errors.projectId.message}</small>
    )}
  </div>
</div>



        <div className="d-flex justify-content-between align-items-center">
            
            <button 
            type='button' 
            className='btn bg-transparent border-black rounded-5 px-3 py-2'
            onClick={()=>{navigate('/dashboard/tasks')}}
            disabled= {isSubmitting}>
                Cancle
            </button>

            <button
            type='submit'
            className='main-btn'
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
}


export default TasksData;
 