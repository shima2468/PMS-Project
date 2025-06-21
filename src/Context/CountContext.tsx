import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance, TASKS_URLS, USERS_URLS } from "../Services/url";
import { AuthContext } from "./AuthContext";
<<<<<<< HEAD
import { Audio } from "react-loader-spinner";
=======
>>>>>>> upstream/Main-Development

interface TasksCount {
    toDo?: number;
    inProgress?: number;
    done?: number;
}

interface UsersCount {
    activatedEmployeeCount?: number;
    deactivatedEmployeeCount?: number;
}

export const CountContext = createContext<{ tasksCount: TasksCount; usersCount: UsersCount }>({
    tasksCount: {},
    usersCount: {},
});

export default function CountContextProvider({ children }: { children: React.ReactNode }) {
<<<<<<< HEAD
        const [isLoading, setIsLoading] = useState(false);
        const authContext = useContext(AuthContext);
 const loginData = authContext?.loginData;
   const [tasksCount, setTasksCount] = useState<TasksCount>({ toDo: 0, inProgress: 0, done: 0 });
const [usersCount, setUsersCount] = useState<UsersCount>({ activatedEmployeeCount: 0, deactivatedEmployeeCount: 0 });
    const getTasksCount = async () => {
        setIsLoading(true)
        try {
             
            const res = await axiosInstance.get(TASKS_URLS.GET_TASKS_COUNT);
           
            setTasksCount(res.data);
        } catch (error) {
            console.log(error);
            
        }finally{
            setIsLoading(false);
=======
        const authContext = useContext(AuthContext);
 const loginData = authContext?.loginData;
    const [tasksCount, setTasksCount] = useState<TasksCount>({});
    const [usersCount, setUsersCount] = useState<UsersCount>({});

    const getTasksCount = async () => {
        try {
            const res = await axiosInstance.get(TASKS_URLS.GET_TASKS_COUNT);
            setTasksCount(res.data);
        } catch (error) {
            console.log(error);
>>>>>>> upstream/Main-Development
        }
    };

    const getUsersCount = async () => {
<<<<<<< HEAD
        setIsLoading(true);
        try {
            
            const res = await axiosInstance.get(USERS_URLS.GET_USERS_COUNT);
            setUsersCount(res.data);
            
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
=======
        try {
            const res = await axiosInstance.get(USERS_URLS.GET_USERS_COUNT);
            setUsersCount(res.data);
        } catch (error) {
            console.log(error);
>>>>>>> upstream/Main-Development
        }
    };

    useEffect(() => {
<<<<<<< HEAD
        if (loginData?.userGroup !== "Employee") {
            getUsersCount();
        }
        getTasksCount();
    }, [loginData]); 
   
    return (
        <CountContext.Provider value={{ tasksCount, usersCount }}>
            {isLoading ? (
     <div className="d-flex justify-content-center align-items-center vh-100">
      <Audio
        height="100"
        width="100"
        color="rgba(239, 155, 40, 1)"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
            ) : (
                children
            )}
=======
        if (loginData?.userGroup!== "Employee") {
            getUsersCount();
        }
        getTasksCount();
    }, [loginData]);

    return (
        <CountContext.Provider value={{ tasksCount, usersCount }}>
            {children}
>>>>>>> upstream/Main-Development
        </CountContext.Provider>
    );
}
