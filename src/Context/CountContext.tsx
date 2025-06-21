import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance, TASKS_URLS, USERS_URLS } from "../Services/url";
import { AuthContext } from "./AuthContext";

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
        }
    };

    const getUsersCount = async () => {
        try {
            const res = await axiosInstance.get(USERS_URLS.GET_USERS_COUNT);
            setUsersCount(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (loginData?.userGroup!== "Employee") {
            getUsersCount();
        }
        getTasksCount();
    }, [loginData]);

    return (
        <CountContext.Provider value={{ tasksCount, usersCount }}>
            {children}
        </CountContext.Provider>
    );
}
