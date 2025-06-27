/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { axiosInstance, PROJECTS_URLS, TASKS_URLS } from "../../../../Services/url";
import Header from "../../../Shared/Components/Header/Header";
import UsedTable from "../../../Shared/Components/UsedTable/UsedTable";
import ActionsPopover from "../../../Shared/Components/ActionsPopover/ActionsPopOver";
import DeleteConfirmation from "../../../Shared/Components/DeletConiformation/DeletConiformation";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";

const TasksList = () => {
    interface Column<T> {
        key: string;
        label: string;
        render: (row: T) => React.ReactNode;
    }

    interface Task {
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

    const columns: Column<Task>[] = [
        {
            key: "title",
            label: "Title",
            render: (row: Task) => row.title,
        },
        {
            key: "status",
            label: "Status",
            render: (row: Task) =>
               (
  <span className={
  row.status === "ToDo" ? "status status-todo"
  : row.status === "InProgress" ? "status status-inProgress"
  : row.status === "Done" ? "status status-done"
  : ""
}>
  {row.status}
</span>
  ),
        },
        {
            key: "userName",
            label: "User",
            render: (row: Task) =>
                row?.employee?.userName
        },
        {
            key: "ProjectTitle",
            label: "Project",
            render: (row: Task) =>
                row?.project?.title
        },
        {
            key: "creationDate",
            label: "Date Created",
            render: (row: Task) =>
                new Date(row.creationDate).toLocaleDateString("en-GB"),
        },
        {
            key: "actions",
            label: "Actions",
            render: (row: Task) => (
                <ActionsPopover
                    onView={() => {
                        setSelectedItem(row);
                        setViewModal(!viewModal);
                    }}
                    onEdit={() => {
                       
                    }}
                    onDelete={() => {
                        setSelectedItem(row);
                        console.log(row);
                        
                        setShowDeleteModal(true);
                    }}
                    showView={true}
                    showEdit={true}
                    showDelete={true}
                    showBlock={false}
                />
            ),
        },
    ];

  const [tableData, setTableData] = useState<Task[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Task | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [status, setStatus] = useState("");
  const statusOptions = [
  { value: "ToDo", label: "To Do" },
  { value: "InProgress", label: "In Progress" },
  { value: "Done", label: "Done" },
];
    const getTasks= async ()=>{
        interface Task {
    id: string;
    title: string;
    status?: string;
    description?: string;
    employee?:{
        userName: string;
    };
    project?: {
      title?: string;
    };
    creationDate: string;
  }
          interface FetchTasksResponse {
    data: Task[];
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
  }
        setIsLoading(true)
       try {
        const response = await axiosInstance.get<FetchTasksResponse>(TASKS_URLS.GET_ALL_TASKS_MANGER,  {
          params: {
            pageNumber: page,
            pageSize,
            title: search,
            status,
          },
        })
        setTableData(response?.data?.data);
        setTotalPages(response?.data?.totalNumberOfPages);
      setTotalItems(response?.data?.totalNumberOfRecords);
        
       } catch (error) {
         setError(
           (error as any)?.response?.data?.message || (error as any)?.message || "Failed to get your Tasks"
         );
        
       }finally{
        setIsLoading(false)
       }
    }
    const AllProjects = async()=>{
      try {
         await  axiosInstance.get(PROJECTS_URLS.GET_ALL_PROJECTS, {
            params: {
              pageSize: 10,
            },
         })
     
      } catch (error:any) {
        toast.error(error?.response?.data?.message || "Failed to fetch tasks");
        
      }
       
    }
     const handleDelete = async (): Promise<void> => {
    try {
      if (!selectedItem?.id) return;

      await axiosInstance.delete(TASKS_URLS.DELETE_TASK(selectedItem.id));
      toast.success("Task deleted successfully");
      setShowDeleteModal(false);
      getTasks();
    } catch (error: any) {
      console.error("Delete Error:", error);
      setError(error?.data?.message || "Failed to delete project");
      toast.error(error);
    }
  };
    useEffect(() => {
        AllProjects();
    getTasks();
    }, [search, status, page, pageSize]);
    return (
        <>
        <Header
         title="Tasks" 
         showAddButton={true}
          item="Task"
          path="/dashboard/tasksData"
          />
            <UsedTable
             columns={columns} 
             data={{
                data: tableData,
                pageNumber: page,
                pageSize: pageSize,
                totalNumberOfPages: totalPages,
                totalNumberOfRecords: totalItems
             }}
             isLoading={isLoading}
              onSearch={(value: string) => setSearch(value)}
        onPageChange={(newPage: number) => setPage(newPage)}
        onPageSizeChange={(newSize: number) => {
          setPageSize(newSize);
          setPage(1);
        }}
         showFilterSelect={true}
  filterLabel="Filter by Status"
  filterValue={status}
  filterOptions={statusOptions}
  onFilterChange={(value) => {
    setStatus(value);
  }}
             />
              <DeleteConfirmation
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        itemName={selectedItem?.title || "this item"}
      />
      <Modal show={viewModal} onHide={() => setViewModal(false)} centered>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="p-3">
             <div className="details-container">
          <div className="d-flex">
            <p className="title-view fw-bold">Task Name : </p>
            <span className="mx-2">{selectedItem?.title}</span>
          </div>
  <div className="d-flex">
            <p className="title-view fw-bold">Status : </p>
            <span className="mx-2">{selectedItem?.status}</span>
          </div>
          <div className="d-flex">
            <p className="title-view fw-bold">Description : </p>
            <span className="mx-2">{selectedItem?.description}</span>
          </div>
          <div className="d-flex">
            <p className="title-view fw-bold">Project Title : </p>
            <span className="mx-2">{selectedItem?.project?.title}</span>
          </div>
            <div className="d-flex">
            <p className="title-view fw-bold">User : </p>
            <span className="mx-2">{selectedItem?.employee?.userName}</span>
          </div>
          <div className="d-flex">
            <p className="title-view fw-bold">Creation Date : </p>
            <span className="mx-2">
              {selectedItem?.creationDate
                ? new Date(selectedItem.creationDate).toLocaleDateString(
                    "en-GB"
                  )
                : "N/A"}
            </span>
          </div>
          </div>
          </div>
        </Modal.Body>
      </Modal>
        </>
    );
}

export default TasksList;
