export interface ITaskData {
  title: string;
  description: string;
  employeeId: number;
  projectId?: number;
}
export interface IEmployee {
  id: number;
  userName: string;
}
export interface IProject {
  id: number;
  title: string;
}
export interface IUserTasks {
  pageNumber: number;
  pageSize: number;
  data: TTask[];
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}
export type TTask = {
  id: number;
  status: TStatus;
  title: string;
  description: string;
};
export type TStatus = "ToDo" | "InProgress" | "Done";


export interface IColumn<T> {
        key: string;
        label: string;
        render: (row: T) => React.ReactNode;
    }

export interface ITask {
        id: string;
        title: string;
        status?: string;
        description?: string;
        employee?: {
            userName: string;
        };
        project?: {
            title?: string;
        };
        creationDate: string;
        usersNumber?: number;
        usersTasks?: number;
    }