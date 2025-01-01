import { AdminHeader } from "../../components/Admin/AdminNavbar";
import { SideBar } from "../../components/Admin/SideBar";
import  { useState } from 'react';
import '../../CSS/AdminUserPage.css';

// Initial Users
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Star', status: 'approved' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Magical', status: 'inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Crown', status: 'pending' },
];

export const AlluserPage = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleApprove = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: 'approved' } : user
    ));
  };

  const handleHold = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: 'inactive' } : user
    ));
  };

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
                  <th>Club Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <span className={`status ${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleApprove(user.id)}
                        disabled={user.status === 'approved'}
                        className="approve-btn"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleHold(user.id)}
                        disabled={user.status === 'inactive'}
                        className="hold-btn"
                      >
                        Hold
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
        </div>
      </div>
    </>
  );
};
