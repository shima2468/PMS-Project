import { useContext, useEffect, useState } from "react";
import ActionsPopover from "../../../Shared/Components/ActionsPopover/ActionsPopOver";
import Header from "../../../Shared/Components/Header/Header";
import UsedTable from "../../../Shared/Components/UsedTable/UsedTable";
import { axiosInstance, PROJECTS_URLS } from "../../../../Services/url";
import DeleteConfirmation from "../../../Shared/Components/DeletConiformation/DeletConiformation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { AuthContext } from "../../../../Context/AuthContext";

interface Project {
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

const ProjectsList = () => {
  const navigate = useNavigate();
  const { loginData } = useContext(AuthContext)!;

  const [tableData, setTableData] = useState<Project[]>([]);
  const [tableDataEmployee, settableDataEmployee] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Project | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const columnsManager = [
    { key: "title", label: "Title", render: (row: any) => row.title },
    {
      key: "status",
      label: "Status",
      render: (row: any) =>
        row?.status || <span className="text-muted">N/A</span>,
    },
    {
      key: "usersNumber",
      label: "Num Users",
      render: (row: any) =>
        row?.usersNumber || <span className="text-muted">N/A</span>,
    },
    {
      key: "usersTasks",
      label: "Num Tasks",
      render: (row: any) =>
        row?.usersTasks || <span className="text-muted">N/A</span>,
    },
    {
      key: "creationDate",
      label: "Date Created",
      render: (row: any) =>
        new Date(row.creationDate).toLocaleDateString("en-GB"),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <ActionsPopover
          onView={() => {
            setSelectedItem(row);
            setViewModal(true);
          }}
          onEdit={() =>
            navigate(`/dashboard/projects/:${row.id}`, { state: row })
          }
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

  const columnsEmployee = [
    { key: "title", label: "Title", render: (row: any) => row.title },
    {
      key: "description",
      label: "Description",
      render: (row: any) => row.description,
    },
    {
      key: "modificationDate",
      label: "modification Date",
      render: (row: any) =>
        new Date(row.modificationDate).toLocaleDateString("en-GB"),
    },
    {
      key: "usersTasks",
      label: "Num Tasks",
      render: (row: any) =>
        row?.usersTasks || <span className="text-muted">N/A</span>,
    },
    {
      key: "creationDate",
      label: "Date Created",
      render: (row: any) =>
        new Date(row.creationDate).toLocaleDateString("en-GB"),
    },
  ];

  interface FetchProjectsResponse {
    data: Project[];
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
  }

  interface FetchProjectsResponseForEmployee {
    data: any[];
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
    pageNumber: number;
    pageSize: number;
  }

  const fetchList = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get<FetchProjectsResponse>(
        PROJECTS_URLS.GET_ALL_PROJECTS,
        {
          params: {
            pageNumber: page,
            pageSize: pageSize,
            title: search,
          },
        }
      );
      setTableData(res.data.data);
      setTotalPages(res.data.totalNumberOfPages);
      setTotalItems(res.data.totalNumberOfRecords);
    } catch (error: any) {
      setError(error?.data?.message || "Failed to fetch your projects");
    } finally {
      setIsLoading(false);
    }
  };

  const GetProjectsForEmployee = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get<FetchProjectsResponseForEmployee>(
        PROJECTS_URLS.GET_PROJECTS_EMPLOYEE,
        {
          params: {
            pageNumber: page,
            pageSize: pageSize,
            title: search,
          },
        }
      );
      settableDataEmployee(res.data.data);
      setTotalPages(res.data.totalNumberOfPages);
      setTotalItems(res.data.totalNumberOfRecords);
    } catch (error: any) {
      setError(error?.data?.message || "Failed to fetch employee projects");
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
      setError(error?.data?.message || "Failed to delete project");
      toast.error(error?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    if (loginData?.userGroup === "Manager") {
      fetchList();
    } else {
      GetProjectsForEmployee();
    }
  }, [page, pageSize, search]);

  return (
    <>
      <Header
        title="Projects"
        showAddButton={loginData?.userGroup === "Manager"}
        item="Project"
        path="new-project"
      />
      <UsedTable
        columns={
          loginData?.userGroup === "Manager" ? columnsManager : columnsEmployee
        }
        data={{
          data:
            loginData?.userGroup === "Manager" ? tableData : tableDataEmployee,
          totalNumberOfPages: totalPages,
          totalNumberOfRecords: totalItems,
          pageNumber: page,
          pageSize: pageSize,
        }}
        isLoading={isLoading}
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
      
      <Modal show={viewModal} onHide={() => setViewModal(false)} centered>
        <Modal.Header className="text-secondary" closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <p className="title-view fw-bold">Project Name: </p>
            <span className="mx-2">{selectedItem?.title}</span>
          </div>
          <div className="d-flex">
            <p className="title-view fw-bold">Manager: </p>
            <span className="mx-2">{selectedItem?.manager?.userName}</span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProjectsList;
