import { useEffect, useState } from "react";
import ActionsPopover from "../../../Shared/Components/ActionsPopover/ActionsPopOver";
import Header from "../../../Shared/Components/Header/Header";
import UsedTable from "../../../Shared/Components/UsedTable/UsedTable";
import { axiosInstance, PROJECTS_URLS } from "../../../../Services/url";
import DeleteConfirmation from "../../../Shared/Components/DeletConiformation/DeletConiformation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Modal } from "react-bootstrap";


const ProjectsList = () => {
  interface Project {
  id: string;
  title: string;
  status?: string;
  usersNumber?: number;
  usersTasks?: number;
  creationDate: string;
  manager?: {
    userName: string;
  };
}
      interface Column<T> {
        key: string;
        label: string;
        render: (row: T) => React.ReactNode;
    }
  const columns: Column<Project>[] = [
    {
      key: "title",
      label: "Title",
      render: (row: Project) => row.title,
    },
    {
      key: "status",
      label: "Status",
      
      render: (row: Project) =>
        row?.status || <span className="text-muted">N/A</span>,
    },
    {
      key: "usersNumber",
      label: "Num Users",
      
      render: (row: Project) =>
        row?.usersNumber || <span className="text-muted">N/A</span>,
    },
    {
      key: "usersTasks",
      label: "Num Tasks",
      
      render: (row: Project) =>
        row?.usersTasks || <span className="text-muted">N/A</span>,
    },
    {
      key: "creationDate",
      label: "Date Created",
      
      render: (row: Project) =>
        new Date(row.creationDate).toLocaleDateString("en-GB"),
    },
    {
      key: "actions",
      label: "Actions",
      
      render: (row: Project) => (
        <ActionsPopover
          onView={() => {
            setSelectedItem(row);
            setViewModal(!viewModal);
          }}
          onEdit={() => {
            navigate(`/dashboard/projects/:${row.id}`, { state: row });
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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Project | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

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
      setTableData(res?.data?.data);
      setTotalPages(res?.data?.totalNumberOfPages);
      setTotalItems(res?.data?.totalNumberOfRecords);
    } catch (error: any) {
      setError(error?.data?.message || "Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (): Promise<void> => {
    console.log(selectedItem);
    
    try {
      if (!selectedItem?.id) return;
        
      await axiosInstance.delete(PROJECTS_URLS.DELETE_PROJECT(selectedItem.id));
      toast.success("Project deleted successfully");
      setShowDeleteModal(false);
      fetchList();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Delete Error:", error);
      setError(error?.data?.message || "Failed to delete project");
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, [page, pageSize, search]);

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
        <Modal.Header className=" modal-header" closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
              <div className="details-container">
          <div className="d-flex">
            <p className="title-view fw-bold">Project Name : </p>
            <span className="mx-2">{selectedItem?.title}</span>
          </div>

          <div className="d-flex">
            <p className="title-view fw-bold">Manager : </p>
            <span className="mx-2">{selectedItem?.manager?.userName}</span>
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
};
export default ProjectsList;
