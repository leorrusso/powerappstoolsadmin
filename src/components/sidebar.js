import {FaFire, FaPoo, FaPlus, FaSearch} from 'react-icons/fa'

function Sidebar(){
    return(
        <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-gray-900 text-white shadow-sm">
            <SidebarIcon icon={<FaFire size="28"/>}/>
            <SidebarIcon icon={<FaPlus size="28"/>}/>
            <SidebarIcon icon={<FaPoo size="28"/>}/>
            <SidebarIcon icon={<FaSearch size="28"/>}/>
        </div>
    );
}

function SidebarIcon({icon}){
    return(
    <div className="sidebar-icon">
        {icon}
    </div>
    )
}

export default Sidebar;