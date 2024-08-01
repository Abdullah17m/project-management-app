// import React, { Fragment, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AiTwotoneFolderOpen } from "react-icons/ai";
// import { BsThreeDots } from "react-icons/bs";
// import { HiDuplicate } from "react-icons/hi";
// import { MdAdd, MdOutlineEdit } from "react-icons/md";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { Menu, Transition } from "@headlessui/react";
// import AddTask from "./AddTask";
// import AddSubTask from "./AddSubTask";
// import ConfirmatioDialog from "../Dialogs";
// import { useTrashTaskMutation } from "../../redux/slices/taskApiSlice";
// import { toast } from "sonner";

// const TaskDialog = ({ task }) => {
//   const [open, setOpen] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const navigate = useNavigate();
//   const [deleteTask] = useTrashTaskMutation();
//   const duplicateHandler = () => {};
//   const deleteClicks = () => {
    
//     setOpenDialog(true);
//   };
//   // const deleteHandler = async() => {
//   //   try {
//   //     console.log(task._id)
//   //     const res = await deleteTask({
//   //       id: task?._id
//   //     }).unwrap()

//   //     toast.success(res?.message);
//   //     setTimeout(() => {
//   //       setOpenDialog(false);
//   //       window.location.reload();
//   //     }, 500);
      
//   //   } catch (error) {
//   //     console.log(error);
//   //     toast.error(error?.data?.message || error.error);
//   //   }
//   // };

//   const deleteHandler = async () => {
//     try {
//       const res = await deleteTask({ id: task?._id }).unwrap();
//       toast.success(res?.message);
//       setTimeout(() => {
//         setOpenDialog(false);
//         window.location.reload();
//       }, 500);
//     } catch (error) {
//       toast.error( error.error);
//     }
//   };

//   const items = [
//     {
//       label: "Open Task",
//       icon: <AiTwotoneFolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
//       onClick: () => navigate(`/task/${task._id}`),
//     },
//     {
//       label: "Edit",
//       icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
//       onClick: () => setOpenEdit(true),
//     },
//     {
//       label: "Add Sub-Task",
//       icon: <MdAdd className='mr-2 h-5 w-5' aria-hidden='true' />,
//       onClick: () => setOpen(true),
//     },
//     {
//       label: "Duplicate",
//       icon: <HiDuplicate className='mr-2 h-5 w-5' aria-hidden='true' />,
//       onClick: () => duplicateHanlder(),
//     },
//   ];

//   return (
//     <>
//       <div>
//         <Menu as='div' className='relative inline-block text-left'>
//           <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 '>
//             <BsThreeDots />
//           </Menu.Button>

//           <Transition
//             as={Fragment}
//             enter='transition ease-out duration-100'
//             enterFrom='transform opacity-0 scale-95'
//             enterTo='transform opacity-100 scale-100'
//             leave='transition ease-in duration-75'
//             leaveFrom='transform opacity-100 scale-100'
//             leaveTo='transform opacity-0 scale-95'
//           >
//             <Menu.Items className='absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
//               <div className='px-1 py-1 space-y-2'>
//                 {items.map((el) => (
//                   <Menu.Item key={el.label}>
//                     {({ active }) => (
//                       <button
//                         onClick={el?.onClick}
//                         className={`${
//                           active ? "bg-blue-500 text-white" : "text-gray-900"
//                         } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                       >
//                         {el.icon}
//                         {el.label}
//                       </button>
//                     )}
//                   </Menu.Item>
//                 ))}
//               </div>

//               <div className='px-1 py-1'>
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       onClick={() => deleteClicks()}
//                       className={`${
//                         active ? "bg-blue-500 text-white" : "text-red-900"
//                       } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                     >
//                       <RiDeleteBin6Line
//                         className='mr-2 h-5 w-5 text-red-400'
//                         aria-hidden='true'
//                       />
//                       Delete
//                     </button>
//                   )}
//                 </Menu.Item>
//               </div>
//             </Menu.Items>
//           </Transition>
//         </Menu>
//       </div>

//       <AddTask
//         open={openEdit}
//         setOpen={setOpenEdit}
//         task={task}
//         key={new Date().getTime()}
//       />

//       <AddSubTask open={open} setOpen={setOpen} />

//       <ConfirmatioDialog
//         open={openDialog}
//         setOpen={setOpenDialog}
//         onClick={deleteHandler}
//       />
//     </>
//   );
// };

// export default TaskDialog;

import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line, RiUserUnfollowFill } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import ConfirmatioDialog from "../Dialogs";
import { useLeavTaskMutation, useTrashTaskMutation } from "../../redux/slices/taskApiSlice";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const TaskDialog = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [leaveDialog, setleaveDialog] = useState(false);
  const navigate = useNavigate();
  const [deleteTask] = useTrashTaskMutation();
  const [leaveTask] = useLeavTaskMutation();
  const { user } = useSelector((state) => state.auth);
  
  const msg ='Are you sure you want to Leave?';
  const type ='leave';
  

  const deleteClicks = () => {
    console.log();
    if (user._id === task?.createdBy) {
      setOpenDialog(true);
    } else {
      toast.error("You do not have permission to delete this task.");
    }
    
  };

  const leaveClicks = () => {
  
   setleaveDialog(true);
    
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteTask({ id: task?._id }).unwrap();
      toast.success(res?.message);
      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const leaveHandler = async () => {
    try {
      console.log(task?._id)
      const res = await leaveTask({ id:task?._id}).unwrap();
      toast.success(res?.message);
      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => navigate(`/task/${task._id}`),
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpenEdit(true),
    },
    
  
  ];

  return (
    <>
      <div>
        <Menu as='div' className='relative inline-block text-left'>
          <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 '>
            <BsThreeDots />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
              <div className='px-1 py-1 space-y-2'>
                {items.map((el) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el?.onClick}
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>

              <div className='px-1 py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => deleteClicks()}
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-red-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <RiDeleteBin6Line
                        className='mr-2 h-5 w-5 text-red-400'
                        aria-hidden='true'
                      />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>

              <div className='px-1 py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => leaveClicks()}
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-red-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <RiUserUnfollowFill
                        className='mr-2 h-5 w-5 text-red-400'
                        aria-hidden='true'
                      />
                      Leave
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={task}
        key={new Date().getTime()}
      />

      <AddSubTask open={open} setOpen={setOpen} />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
      <ConfirmatioDialog
        open={leaveDialog}
        msg={msg}
        type={type}
        setOpen={setleaveDialog}
        onClick={leaveHandler}
      />
    </>
  );
};

export default TaskDialog;
