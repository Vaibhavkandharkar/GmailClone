import { useSelector } from "react-redux";
import React from "react";
import { IoMdArrowBack, IoMdMore } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { BiArchiveIn } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast"; 
import {
  MdDeleteOutline,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdOutlineMarkEmailUnread,
  MdOutlineReport,
  MdOutlineWatchLater,
} from "react-icons/md";

const Mail = () => {   
  const navigate = useNavigate();
  const { selectedEmail } = useSelector((store) => store.app)   // ✅ Ensure selectedEmails is not undefined
  const params = useParams(); // ✅ Retrieve params from URL
  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/v1/email/${params.id}`,
        { withCredentials:true}
      );
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete email"); // ✅ Handle API error response
    }
  };

  return (
    <div className="flex-1 bg-white rounded-xl mx-5">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2">
          <div
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"
          >
            <IoMdArrowBack size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <BiArchiveIn size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineReport size={"20px"} />
          </div>
          <div
            onClick={deleteHandler}
            className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"
          >
            <MdDeleteOutline size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineMarkEmailUnread size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineWatchLater size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineAddTask size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <IoMdArrowBack size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineDriveFileMove size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <IoMdMore size={"20px"} />
          </div>
        </div>
        {/* Pagination */}
        <div className="flex items-center gap-2">
          <span>1 to 50</span>
          <MdKeyboardArrowLeft size={"24px"} />
          <MdKeyboardArrowRight size={"24px"} />
        </div>
      </div>

      {/* Email Content */}
      <div className="h-[90vh] overflow-y-auto p-4">
        <div className="flex justify-between bg-white items-center gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium">
              {selectedEmail?.subject || "No Subject"} {/* ✅ Handle missing subject */}
            </h1>
            <span className="text-sm bg-gray-200 rounded-md px-2">Inbox</span>
          </div>
          <div className="flex-none text-gray-400 my-5 text-sm">
            <p>12 days ago</p>
          </div>
        </div>

        <div className="text-gray-500 text-sm">
          <h1>{selectedEmail?.to || "Unknown Recipient"}</h1> {/* ✅ Handle missing recipient */}
          <span>to me</span>
        </div>

        <div className="my-10">
          <p>{selectedEmail?.message || "No Content Available"}</p> {/* ✅ Handle missing message */}
        </div>
      </div>
    </div>
  );
};

export default Mail;
