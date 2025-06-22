import { useEffect, useState } from "react";
import ActionsPopover from "../../../Shared/Components/ActionsPopover/ActionsPopOver";
import Header from "../../../Shared/Components/Header/Header";
import UsedTable from "../../../Shared/Components/UsedTable/UsedTable";
import { axiosInstance, PROJECTS_URLS } from "../../../../Services/url";
import DeleteConfirmation from "../../../Shared/Components/DeletConiformation/DeletConiformation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

 const ProjectsList = () => {
  const columns = [
    {
      key: "title",
      label: "Title",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (row: any) => row.title,
    },
    {
      key: "status",
      label: "Status",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (row: any) =>
        row?.status || <span className="text-muted">N/A</span>,
    },
    {
      key: "usersNumber",
      label: "Num Users",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (row: any) =>
        row?.usersNumber || <span className="text-muted">N/A</span>,
    },
    {
      key: "usersTasks",
      label: "Num Tasks",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (row: any) =>
        row?.usersTasks || <span className="text-muted">N/A</span>,
    },
    {
      key: "creationDate",
      label: "Date Created",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (row: any) =>
        new Date(row.creationDate).toLocaleDateString("en-GB"),
    },
    {
      key: "actions",
      label: "Actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (row: any) => (
        <ActionsPopover
          onView={()=>{
            
          }}
          onEdit={() => {  
          
            navigate(`/dashboard/projects/:${row.id}`, {state: row});
          }}
          onDelete={() => {
            setSelectedItem(row);
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
const navigate = useNavigate();
  const [tableData, setTableData] = useState<Project[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

interface Project {
  id: string;
  title: string;
  status?: string;
  usersNumber?: number;
  usersTasks?: number;
  creationDate: string;
}

interface FetchProjectsResponse {
  data: Project[];
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}




const fetchList = async (): Promise<void> => { 
     setIsLoading(true);
  try {

    const res = await axiosInstance.get<FetchProjectsResponse>(PROJECTS_URLS.GET_ALL_PROJECTS, {
      params: {
        pageNumber: page,
        pageSize: pageSize,
        title: search,
      },
    });
    setTableData(res?.data?.data);
    setTotalPages(res?.data?.totalNumberOfPages);
    setTotalItems(res?.data?.totalNumberOfRecords);
  } catch (error: any) {
    setError(error?.data?.message || "Failed to fetch your projects");
  } finally {
    setIsLoading(false);
  }
};

const handleDelete = async (): Promise<void> => {
  try {
    if (!selectedItem?.id) return;

    await axiosInstance.delete(PROJECTS_URLS.DELETE_PROJECT(selectedItem.id));
    toast.success("Project deleted successfully");
    setShowDeleteModal(false);
    fetchList();
  } catch (error: any) {
    console.error("Delete Error:", error);
    setError(error?.data?.message || "Failed to delete project");
    toast.error(error);
  }
};

useEffect(() => {
  fetchList();
}, [page, pageSize, search]);
 


if (isLoading) {
  return (
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
  );
}

return (
  <>
    <Header
      title="Projects"
      showAddButton={true}
      item="Project"
      path="new-project"
    />
    <UsedTable
      columns={columns}
      data={{
        data: tableData,
        totalNumberOfPages: totalPages,
        totalNumberOfRecords: totalItems,
        pageNumber: page,
        pageSize: pageSize,
      }}
      onSearch={(value: string) => setSearch(value)}
      onPageChange={(newPage: number) => setPage(newPage)}
      onPageSizeChange={(newSize: number) => {
        setPageSize(newSize);
        setPage(1);
        
      }}

    />
    <DeleteConfirmation
      show={showDeleteModal}
      onHide={() => setShowDeleteModal(false)}
      onConfirm={handleDelete}
      itemName={selectedItem?.title || "this item"}
    />
  </>
);

}
export default ProjectsList;