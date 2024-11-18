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

// Reusable Tab Link
const TabLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(`/${to}`);

  return (
    <Link
      to={to}
      className={`px-4 py-2 text-sm font-semibold ${
        isActive
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-600 hover:text-blue-600"
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
    <div className="flex flex-wrap gap-4 justify-start md:justify-center mb-6">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={`${tab.path}`} // Use basePath directly
          className={`px-4 py-2 rounded-md transition duration-300 ${
            location.pathname.startsWith(`/${basePath}/${tab.path}`)
              ? "bg-blue-100 text-blue-600"
              : "hover:bg-blue-100 hover:text-blue-600"
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
  <div className="mt-4">
    {/* Main Tab Navigation */}
    <div className="mb-4">
      <div className="flex justify-between sm:justify-start sm:border-b sm:border-gray-300">
        <TabLink to="team">Team</TabLink>
        <TabLink to="mydata">My Data</TabLink>
        <TabLink to="holidays">Holidays</TabLink>
      </div>
    </div>

    {/* Routes Configuration */}
    <div className="p-4">
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
        <Route path="holidays" element={<div>Holidays Content</div>} />
      </Routes>
    </div>
  </div>
);

export default LeaveTracker;
