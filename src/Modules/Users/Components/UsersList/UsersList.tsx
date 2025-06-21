import React, { useState } from 'react';
import '../UsersList.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { USERLIST } from '../../../../Services/url';

const UsersList:React.FC = ()=> {

interface UserData {
  userName?: string;
  email?: string;
  country?: string;
  groups?: number[];
  pageSize: number;
  pageNumber: number;
}


const [user , setUser] = useState([]);
const navigate = useNavigate();
const [loading, setLoading] = useState<boolean>(false);


const featchUser = async (params :UserData) =>
{
    setLoading(true);
    try {
        const response = await axios.get(USERLIST.GETALLUSERS , {params});
        console.log(response.data);
        setUser(response.data);

    }

    catch(error:any)
    {

     toast.error(
        error.response?.data?.message || "User failed. Please try again."
     )
    }
    finally
    {
        setLoading(false);
    }
}

    return (

        <>


    
<table className="table table-striped text-center custom-table">
  <thead>
    <tr>
      <th>UserName</th>
      <th>Statues</th>
      <th>Phone Number</th>
      <th>Email</th>
      <th>Date Created</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Apple</td>
      <td>Fruit</td>
      <td>$1.20</td>
      <td>Available</td>
      <td>Available</td>
      <td>Available</td>
    </tr>
   
  </tbody>
</table>

        </>
    );
};

export default UsersList;
