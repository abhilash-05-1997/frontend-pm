  import {
    Link,
    Routes,
    Route,
    Outlet,
    Navigate,
    useLocation,
  } from "react-router-dom";
  import LeaveRequest from "./mydata/LeaveRequest";
  import LeaveBalance from "./mydata/LeaveBalance";
  import LeaveSummary from "./mydata/LeaveSummary";
  import LeaveRequests from "./team/LeaveRequests";
  import OnLeave from "./team/OnLeave";
  import Reportees from "./team/Reportees";
  import Holidays from "./holidays/Holidays";

  // Reusable Tab Link
  const TabLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname.includes(`/${to}`);

    return (
      <Link
        to={to}
        className={`px-4 py-2 pb-2 text-lg font-semibold rounded-md transition duration-300 ]${
          isActive
            ? "text-blue-600 light:border-blue-600 bg-gray-200 dark:bg-dark-card dark:text-dark-text rounded-xl"
            : "text-gray-600 hover:text-blue-600 dark:text-dark-text"
        }`}
      >
        {children}
      </Link>
    );
  };

  // SubTabLinks Component
  const SubTabLinks = ({ basePath, tabs }) => {
    const location = useLocation();

    return (
      <div className="flex flex-wrap gap-3 justify-self-start md:justify-evenly dark:text-dark-text py-4 pb-2 px-4">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={`${tab.path}`} // Use basePath directly
            className={`px-3 font-semibold py-2 pb-2 rounded-xl transition duration-300 sm:py-3 ${
              location.pathname.includes(`/${basePath}/${tab.path}`)
                ? "bg-blue-100 text-blue-600 dark:bg-dark-card dark:text-dark-text"
                : "hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-purple-600 dark:hover:text-dark-text"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    );
  };

  // Layout Components
  const MyDataLayout = () => (
    <div>
      <SubTabLinks
        basePath="mydata" // Ensure basePath is correct
        tabs={[
          { path: "leave-summary", label: "Leave Summary" },
          { path: "leave-balance", label: "Leave Balance" },
          { path: "leave-request", label: "Leave Request" },
        ]}
      />
      <Outlet />
    </div>
  );

  const TeamLayout = () => (
    <div>
      <SubTabLinks
        basePath="team" // Ensure basePath is correct
        tabs={[
          { path: "reportees", label: "Reportees" },
          { path: "on-leave", label: "On Leave" },
          { path: "leave-requests", label: "Leave Requests" },
        ]}
      />
      <Outlet />
    </div>
  );

  // Main LeaveTracker Component
  const LeaveTracker = () => (
    <div className="pt-4 dark:bg-dark-bg px-4 mx-auto">
      {/* Main Tab Navigation */}
      <div>
        <div className="flex justify-between sm:justify-start sm:border-b sm:border-gray-200 dark:sm:border-gray-600 dark:bg-dark-bg pb-2 sm:py-2 mt-[-0.65rem]">
          <TabLink to="team">Team</TabLink>
          <TabLink to="mydata">My Data</TabLink>
          <TabLink to="holidays">Holidays</TabLink>
        </div>
      </div>

      {/* Routes Configuration */}
      <div>
        <Routes>
          {/* <Route path="/" element={<div>Welcome to Leave Tracker</div>} /> */}
          {/* My Data Routes */}
          <Route path="mydata/*" element={<MyDataLayout />}>
            <Route index element={<Navigate to="leave-summary" replace />} />
            <Route path="leave-summary" element={<LeaveSummary />} /> 
            <Route path="leave-balance" element={<LeaveBalance />} />
            <Route path="leave-request" element={<LeaveRequest />}/>
          </Route>

          {/* Team Routes */}
          <Route path="team/*" element={<TeamLayout />}>
            <Route index element={<Navigate to="reportees" replace />} />
            <Route path="reportees" element={<Reportees />} />
            <Route path="on-leave" element={<OnLeave />} />
            <Route path="leave-requests" element={<LeaveRequests />} />
          </Route>

          {/* Holidays Route */}
          <Route path="holidays" element={<div><Holidays/></div>} />
        </Routes>
      </div>
    </div>
  );

  export default LeaveTracker;
