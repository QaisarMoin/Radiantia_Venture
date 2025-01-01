import { AdminHeader } from "./AdminNavbar";
import { SideBar } from "./SideBar";


export const AdminDashBoard = () => {
  return (
    <>
      <div className='admin-dashboard'>
        <AdminHeader />
        <div className="sideBar">
          <div className="SideBar-Container">

          <SideBar />
          </div>
        </div>
        <div className="mainScreen">

        </div>
      </div>
    </>
  );
};