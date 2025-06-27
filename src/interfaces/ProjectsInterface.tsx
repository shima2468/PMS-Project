export interface IProjectData {
  title: string;
  description: string;
}
export interface IProjectList {
  id: string;
  title: string;
  status?: string;
  usersNumber?: number;
  usersTasks?: number;
  creationDate: number;
  manager?: {
    userName: string;
  };
}

export interface IFetchProjectsResponse {
  data: IProjectList[];
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}

export interface IFetchProjectsResponseForEmployee {
  data: any[];
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
  pageNumber: number;
  pageSize: number;
}
