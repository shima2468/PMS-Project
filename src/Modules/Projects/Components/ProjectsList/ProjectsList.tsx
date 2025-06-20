import { useEffect, useState } from "react";
import ActionsPopover from "../../../Shared/Components/ActionsPopover/ActionsPopOver";
import Header from "../../../Shared/Components/Header/Header";
import UsedTable from "../../../Shared/Components/UsedTable/UsedTable";
import { axiosInstance, PROJECTS_URLS } from "../../../../Services/url";
import DeleteConfirmation from "../../../Shared/Components/DeletConiformation/DeletConiformation";
import toast from "react-hot-toast";

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
          onView={() => console.log("View", row)}
          onEdit={() => console.log("Edit", row)}
          onDelete={() => {
            setSelectedItem(row);
            setShowDeleteModal(true);
          }}
        />
      ),
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(PROJECTS_URLS.GET_ALL_PROJECTS, {
        params: {
          pageNumber: page,
          pageSize: pageSize,
          title: search,
        },
      });
      setTableData(res?.data?.data);
      setTotalPages(res?.data?.totalNumberOfPages);
      setTotalItems(res?.data?.totalNumberOfRecords);
    } catch (error) {
      setError(error?.data?.message || "Failed to fetch your projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedItem?.id) return;

      await axiosInstance.delete(PROJECTS_URLS.DELETE_PROJECT(selectedItem.id));
      toast.success("Project deleted successfully");
      setShowDeleteModal(false);
      fetchList();
    } catch (error) {
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
        onSearch={(value) => setSearch(value)}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => {
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
};

export default ProjectsList;
