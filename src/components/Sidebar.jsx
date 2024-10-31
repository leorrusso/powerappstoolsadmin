import { FaArrowCircleRight, FaChartLine, FaCode, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({handleLogout}) {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-gray-900 text-white shadow-sm">
      <SidebarIcon icon={<FaCode size="28" />} page="/snippets" />
      <SidebarIcon icon={<FaUser size="28" />} page="/users" />
      <SidebarIcon icon={<FaChartLine size="28" />} page="/dashboard" />
      <SidebarIcon icon={<FaArrowCircleRight size="28" onClick={handleLogout} />} />
    </div>
  );
}

function SidebarIcon({ icon, page }) {
  return (
    <Link to={page} className="sidebar-icon">
      {icon}
    </Link>
  );
}

export default Sidebar;