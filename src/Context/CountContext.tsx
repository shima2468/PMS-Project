import { useContext, useEffect, useState } from "react";
import { axiosInstance, TASKS_URLS, USERS_URLS } from "../Services/url";
import { AuthContext } from "./AuthContext";
import { Audio } from "react-loader-spinner";
import toast from "react-hot-toast";


type UsersCount = {
  activatedEmployeeCount: number;
  deactivatedEmployeeCount: number;
};

type TasksCount = {
  toDo: number;
  inProgress: number;
  done: number;
};

import React, { createContext } from "react";

type CountContextType = {
  tasksCount: TasksCount;
  usersCount: UsersCount;
  getTasksCount: () => Promise<void>;
  getUsersCount: () => Promise<void>;

};

export const CountContext = createContext<CountContextType | undefined>(undefined);

function CountContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const loginData = authContext?.loginData;
  
  
 
  const [tasksCount, setTasksCount] = useState<TasksCount>({
    toDo: 0,
    inProgress: 0,
    done: 0,
  });
  const [usersCount, setUsersCount] = useState<UsersCount>({
    activatedEmployeeCount: 0,
    deactivatedEmployeeCount: 0,
  });
  const getTasksCount = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(TASKS_URLS.GET_TASKS_COUNT);
      setTasksCount(res.data);
    } catch (error:any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setIsLoading(false);
    }
  };
  const getUsersCount = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(USERS_URLS.GET_USERS_COUNT);
    
      
      setUsersCount(res?.data);
    } catch (error: any) {
     toast.error(error?.response?.data?.message)
    } finally {
      setIsLoading(false);
    }
  };
useEffect(() => {
  if (!loginData) {
    return; 
  }

  getTasksCount();

  if (loginData?.userGroup && loginData?.userGroup !== "Employee") {
    getUsersCount();
  }
}, [loginData]);



  return (
    <CountContext.Provider value={{ tasksCount, usersCount,getTasksCount , getUsersCount}}>
      {
        children
      }
    </CountContext.Provider>
  );
}

export default CountContextProvider;
