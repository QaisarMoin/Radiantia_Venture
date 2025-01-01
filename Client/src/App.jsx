
import './App.css';
import "awesome-notifications/dist/style.css";
import { AdminRoute } from './Routes/AdminRoute';
import { AllWebsiteRoute } from './Routes/AllWebsiteRoute';
import { UserRoute } from './Routes/UserRoute';


function App() {


  return (
    <>
        {/* All Website Routes and nagition routes  */}
      <AllWebsiteRoute />
       {/* <-------User Route All Routes----> */}
        
      {/* // All User Sides routes  */}
      <UserRoute />
      {/* <-------User Route END----> */}

      {/* // All Admin Sides routes  */}
        <AdminRoute/>
       {/* <-------Admin Route END----> */}
    </>
  )
}

export default App
