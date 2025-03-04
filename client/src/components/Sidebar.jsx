// import React from 'react'
// import {
//   MdDashboard,
//   MdOutlineAddTask,
//   MdOutlinePendingActions,
//   MdSettings,
//   MdTaskAlt,
// } from "react-icons/md";
// import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { setOpenSidebar } from "../redux/slices/authSlice";
// import clsx from "clsx";

// const linkData = [
//   {
//     label: "Dashboard",
//     link: "/dashboard",
//     icon: <MdDashboard />,
//   },
//   {
//     label: "Tasks",
//     link: "/tasks",
//     icon: <FaTasks />,
//   },
//   {
//     label: "Completed",
//     link: "/tasks/completed",
//     icon: <MdTaskAlt />,
//   },
//   {
//     label: "In Progress",
//     link: "/tasks/in progress",
//     icon: <MdOutlinePendingActions />,
//   },
//   {
//     label: "To Do",
//     link: "/tasks/todo",
//     icon: <MdOutlinePendingActions />,
//   },
//   {
//     label: "Team",
//     link: "/team",
//     icon: <FaUsers />,
//   },
//   {
//     label: "Trash",
//     link: "/trashed",
//     icon: <FaTrashAlt />,
//   },
// ];

// const Sidebar = () => {
//   const { user } = useSelector((state) => state.auth);
//   console.log("User:", user);
//   const dispatch = useDispatch();
//   const location = useLocation();

//   const currentPath = decodeURIComponent(location.pathname);

//   const sidebarLinks = user.isAdmin ? linkData : linkData.slice(0, 5);

//   const closeSidebar = () => {
//     dispatch(setOpenSidebar(false));
//   };

//   const NavLink = ({ el }) => {
    
    
//     return (
      
//       <Link
//         to={el.link}
//         onClick={closeSidebar}
//         className={clsx(
//           "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
//           currentPath === el.link ? "bg-blue-700 text-neutral-100" : ""
//         )}
        
//       >
//         {console.log(el)}
//         {el.icon}
//         <span className='hover:text-[#2564ed]'>{el.label}</span>
//       </Link>
//     );
//   };

//   return (
//     <div className='w-full h-full flex flex-col gap-6 p-5'>
//       <h1 className='flex gap-1 items-center'>
//         <p className='bg-blue-600 p-2 rounded-full'>
//           <MdOutlineAddTask className='text-white text-2xl font-black' />
//         </p>
//         <span className='text-2xl font-bold text-black'>TaskMe</span>
//       </h1>
//       <div className='flex-1 flex flex-col gap-y-5 py-8'>
//         {sidebarLinks.map((link) => (
//           <NavLink el={link} key={link.label} />
//         ))}
//       </div>

//       <div className=''>
//         <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
//           <MdSettings />
//           <span>Settings</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const linkData = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Projects",
    link: "/tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "/tasks/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "/tasks/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "/tasks/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Trash",
    link: "/trashed",
    icon: <FaTrashAlt />,
  },
  {
    label: "Users",
    link: "/team",
    icon: <FaUsers />,
  },
 
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  console.log("User from Redux state:", user); // Check user details

  const dispatch = useDispatch();
  const location = useLocation();

  const currentPath = decodeURIComponent(location.pathname);

  const isAdmin = user?.isAdmin;
  console.log("isAdmin status:", isAdmin); // Verify isAdmin status

  const sidebarLinks = isAdmin ? linkData : linkData.slice(0, 6);
  console.log("Sidebar Links to render:", sidebarLinks); // Check sidebarLinks content

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    console.log("Rendering NavLink:", el.label); // Log each NavLink being rendered
    
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
          currentPath === el.link ? "bg-blue-700 text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className='hover:text-[#2564ed]'>{el.label}</span>
      </Link>
    );
  };

  return (
    <div className='w-full h-full flex flex-col gap-6 p-5'>
      <h1 className='flex gap-1 items-center'>
        {/* <p className='bg-blue-600 p-2 rounded-full'>
          <MdOutlineAddTask className='text-white text-2xl font-black' />
        </p> */}
        <span className='text-2xl font-bold text-black'>TaskTrack</span>
      </h1>
      <div className='flex-1 flex flex-col gap-y-5 py-8'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      {/* <div className=''>
        <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
          <MdSettings />
          <span>Settings</span>
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
