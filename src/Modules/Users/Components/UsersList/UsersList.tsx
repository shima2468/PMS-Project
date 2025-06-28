import React, { useContext, useEffect, useState } from "react";
import UsedTable from "../../../Shared/Components/UsedTable/UsedTable";
import toast from "react-hot-toast";
import { axiosInstance, USERLIST } from "../../../../Services/url";
import Header from "../../../Shared/Components/Header/Header";
import ActionsPopover from "../../../Shared/Components/ActionsPopover/ActionsPopOver";
import { Modal } from "react-bootstrap";
import "../UsersList.css";
import type { IUser } from "../../../../interfaces/UserInterface";
import { CountContext } from "../../../../Context/CountContext";

const UsersList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {getUsersCount} = useContext(CountContext);
  const [userData, setUserData] = useState<any>({
    data: [],
    pageNumber: 1,
    pageSize: 5,
    totalNumberOfPages: 1,
    totalNumberOfRecords: 0,
  });
  const [filters, setFilters] = useState({
    pageSize: 5,
    pageNumber: 1,
    userName: "",
    group: "",
  });

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  type UserFilters = {
    pageSize: number;
    pageNumber: number;
    userName: string;
    group: string;
  };

  const fetchUser = async (params: UserFilters) => {
    setIsLoading(true);
    try {
      const queryParams = {
        ...params,
        groups: params.group ? [parseInt(params.group)] : undefined,
      };
      const response = await axiosInstance.get(USERLIST.GETALLUSERS, {
        params: queryParams,
      });
      setUserData(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch users.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlockUser = async (id: number) => {
    try {
      const response = await axiosInstance.put(USERLIST.BLOCKED_USER(id));

      toast.success(
        response?.data?.message || "User activation status toggled successfully"
      );
       await fetchUser(filters);
         getUsersCount();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to toggle user status."
      );
    }
  };

  useEffect(() => {
    fetchUser(filters);
  }, []);

  const columns = [
    {
      key: "userName",
      label: "UserName",
      render: (row: IUser) => row.userName,
    },
    {
      key: "email",
      label: "Email",
      render: (row: IUser) => row.email,
    },
    {
      key: "country",
      label: "Country",
      render: (row: IUser) => row.country,
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
      render: (row: IUser) => row.phoneNumber,
    },
    {
      key: "isActivated",
      label: "Status",
      render: (row: IUser) => (
        <span
          className={`badge ${row.isActivated ? "bg-success" : "bg-danger"}`}
        >
          {row.isActivated ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "creationDate",
      label: "Date Created",
      render: (row: IUser) =>
        new Date(row.creationDate).toLocaleDateString("en-GB"),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: IUser) => (
        <ActionsPopover
          onView={() => {
            setSelectedUser(row);
            setShowViewModal(true);
          }}
          onBlock={() => handleBlockUser(row.id)}
          blockLabel={row.isActivated ? "Deactivate" : "Activate"}
          showView={true}
          showBlock={true}
          showEdit={false}
          showDelete={false}
        />
      ),
    },
  ];

  const handleSearch = (value: string) => {
    const newFilters = { ...filters, userName: value, pageNumber: 1 };
    setFilters(newFilters);
    fetchUser(newFilters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, pageNumber: page };
    setFilters(newFilters);
    fetchUser(newFilters);
  };

  const handlePageSizeChange = (size: number) => {
    const newFilters = { ...filters, pageSize: size, pageNumber: 1 };
    setFilters(newFilters);
    fetchUser(newFilters);
  };

  return (
    <>
      <Header title="Users" />

      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div className="p-3">
              <div className="details-container">
                <h5 className="user-details-title">User Information</h5>

                <div className="mb-2">
                  <span className="user-detail-label">Name:</span>
                  {selectedUser.userName}
                </div>
                <div className="mb-2">
                  <span className="user-detail-label">Email:</span>
                  {selectedUser.email}
                </div>
                <div className="mb-2">
                  <span className="user-detail-label">Country:</span>
                  {selectedUser.country}
                </div>
                <div className="mb-2">
                  <span className="user-detail-label">Phone Number:</span>
                  {selectedUser.phoneNumber}
                </div>
                <div className="mb-2">
                  <span className="user-detail-label">Status:</span>
                  <span
                    className={`badge ${
                      selectedUser.isActivated ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {selectedUser.isActivated ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="user-detail-label">Date Created:</span>
                  {new Date(selectedUser.creationDate).toLocaleDateString(
                    "en-GB"
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <UsedTable
        columns={columns}
        data={{
          data: userData.data || [],
          totalNumberOfPages: userData.totalNumberOfPages,
          totalNumberOfRecords: userData.totalNumberOfRecords,
          pageNumber: userData.pageNumber,
          pageSize: userData.pageSize,
        }}
        isLoading={isLoading}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        showFilterSelect={true}
        filterLabel="Filter by Group"
        filterValue={filters.group}
        filterOptions={[
          { value: "", label: "All" },
          { value: "1", label: "Manager" },
          { value: "2", label: "Employee" },
        ]}
        onFilterChange={(value) => {
          setFilters({ ...filters, group: value });
          fetchUser({ ...filters, group: value });
        }}
      />
    </>
  );
};

export default UsersList;
