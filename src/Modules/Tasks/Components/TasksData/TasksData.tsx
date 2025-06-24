import React from 'react';
import Header from '../../../Shared/Components/Header/Header';
import { TaskData } from '../../../../interfaces/data';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { axiosInstance, TASKS_URLS } from '../../../../Services/url';

const TasksData: React.FC =()=>
{

    const { register, handleSubmit,formState: { errors },} = useForm<TaskData>();

    const onSubmit =async (data: TaskData)=>{
        try {
            const response =await axiosInstance.post (TASKS_URLS.ADD_TASK ,data);
            toast.success('Task added successfully!');
            console.log(response);
        }
        catch (error:any){
            toast.error(error.response?.data?.message || 'Failed to fetch users.');
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

      <form onSubmit={handleSubmit(onSubmit)} className="p-3">
        <div className="mb-3">
          <label>Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="form-control"
            placeholder="Enter task title"
          />
          {errors.title && (
            <small className="text-danger">{errors.title.message}</small>
          )}
        </div>

        {/* أضيفي باقي الحقول هنا زي description, dueDate حسب محتوى TaskData */}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
        </>
    );
}


export default TasksData;
 