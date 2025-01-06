import { AdminHeader } from "../../components/Admin/AdminNavbar";
import { SideBar } from "../../components/Admin/SideBar";
import  { useEffect, useState } from 'react';
import '../../CSS/AdminUserPage.css';
import axios from "axios";
import { usePagination } from "../../components/utils/Pagination/Pagination";
import { PagingList } from "../../components/shared/PagingList/PagingList";



export const AlluserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); 

  const paginate = usePagination(users, 10);
  const usersData = (paginate?.currentData());

  const updateUserStatus = async (id, status) => {

    
    setLoading(true); 
    try {
      const response = await axios.put(
        `https://rmpl.net.in/api/admin/updateUserStatus/${id}`,
        { status }
      );
      // console.log(response.data.message); // Log success message
      setUsers(users.map(user => (user.id === id ? { ...user, status } : user))); // Update local state
    } catch (error) {
      console.error('Error updating user status:', error.response?.data?.message || error.message);
      alert('Failed to update user status. Please try again.');
    } finally {
      setLoading(false); // Reset loading
    }
  };

  const handleApprove = (id) => {
    updateUserStatus(id, 'approved');
  };

  const handleHold = (id) => {
    updateUserStatus(id, 'inactive');
  };
  
  const handleRemove = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this user? This action cannot be undone.");
    if (!isConfirmed) {
      
      return;
    }

    try {
      console.log(`Removing user with ID: ${id}`);
      const response = await axios.delete(`https://rmpl.net.in/api/admin/removeUser/${id}`);
      console.log(response.data.message);

      setUsers(users.filter(user => user.id !== id));
  
      alert("User has been removed successfully.");
    } catch (error) {
      console.error('Error removing user:', error.response?.data?.message || error.message);
  
      alert("Failed to remove user. Please try again.");
    }
  };

  // const handleApprove = (id) => {
  //   setUsers(users.map(user => 
  //     user.id === id ? { ...user, status: 'approved' } : user
  //   ));
  // };

  // const handleHold = (id) => {
  //   setUsers(users.map(user => 
  //     user.id === id ? { ...user, status: 'inactive' } : user
  //   ));
  // };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await axios.get(`https://rmpl.net.in/api/admin/Allusers-list`);
        
        setUsers(userData.data);
        console.log(userData.data, "userData");
      } catch (err) {
        console.error('Error fetching user info:', err);
    
      } 
    };
  
    fetchUserInfo();
  }, []);

  console.log(users, "users");
  

  return (
    <>
      <div className='admin-dashboard'>
        <AdminHeader />
        <div className="Admin-al-user-container">
        <div className="sideBar">
          <div className="SideBar-Container">
            <SideBar />
          </div>
        </div>
        <div className="mainScreen">
          <div className="admin-user-table">
            <h1>User Management</h1>
            <div className="Table-data">

            <table>
              <thead>
                <tr>
                  <th>S.no.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Club Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user, index) => (
                  <tr key={user.id}>
                    <td>{paginate.currentPage * 10-10 + index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile_no}</td>
                    <td>{user.club_name}</td>
                    <td>
                      <span className={`status ${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleApprove(user.id)}
                        disabled={loading || user.status === 'approved'}
                        className="approve-btn"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleHold(user.id)}
                        disabled={loading || user.status === 'inactive'}
                        className="hold-btn"
                      >
                        Hold
                      </button>
                    </td>
                    <td>
                      <button className="remove-btn" disabled={loading} onClick={() => handleRemove(user.id)} >Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              <PagingList paginate={paginate} />
          </div>
        </div>
        </div>
        </div>
      </div>
    </>
  );
};
