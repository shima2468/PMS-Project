import React, { useEffect, useState } from 'react';
import UsedTable from '../../../Shared/Components/UsedTable/UsedTable';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { axiosInstance, USERLIST } from '../../../../Services/url';
import Header from '../../../Shared/Components/Header/Header';
import ActionsPopover from '../../../Shared/Components/ActionsPopover/ActionsPopOver';

const UsersList: React.FC = () => {
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
    userName: '',
  });

  const navigate = useNavigate();

  const fetchUser = async (params: any) => {
    try {
      const response = await axiosInstance.get(USERLIST.GETALLUSERS, { params });
      setUserData(response.data);

    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch users.');
    }
  };


  const handleBlockUser = async (id:number)=>
  {
    try{
        const response = await axiosInstance.put (USERLIST.BLOCKED_USER(id));
         toast.success("User activation status toggled successfully");
        fetchUser(filters); 
    }
    catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to toggle user status.');
    }
  }

  useEffect(() => {
    fetchUser(filters);
  }, []);

  const columns = [
    {
      key: 'userName',
      label: 'UserName',
      render: (row: any) => row.userName,
    },
    {
      key: 'email',
      label: 'Email',
      render: (row: any) => row.email,
    },
    {
      key: 'country',
      label: 'Country',
      render: (row: any) => row.country,
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
      render: (row: any) => row.phoneNumber,
    },
    {
      key: 'isActivated',
      label: 'Status',
      render: (row: any) => (
        <span className={`badge ${row.isActivated ? 'bg-success' : 'bg-danger'}`}>
          {row.isActivated ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'creationDate',
      label: 'Date Created',
      render: (row: any) =>
        new Date(row.creationDate).toLocaleDateString('en-GB'),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row: any) => (
        <ActionsPopover 

 onView={() => console.log('view')}
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
     <Header
          title="Users"
          showAddButton={false}
          item="Users"
          path="new-Users"
        />


      <UsedTable
      columns={columns}
      data={{
        data: userData.data || [],
        totalNumberOfPages: userData.totalNumberOfPages,
        totalNumberOfRecords: userData.totalNumberOfRecords,
        pageNumber: userData.pageNumber,
        pageSize: userData.pageSize,
      }}
      onSearch={handleSearch}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />

</>



  );
};

export default UsersList;
