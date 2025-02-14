import React from "react";
import { MdCropSquare, MdOutlineStarBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedEmail } from "../redux/appSlice";

const Email = ({email}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openMail = () => {
    dispatch(setSelectedEmail(email));
    navigate(`/mail/${email._id}`);
  };

  // Convert `createdAt` timestamp to readable format (e.g., "2 days ago")
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const diffInMs = new Date() - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays > 0 ? `${diffInDays} days ago` : "Today";
  };

  return (
    <div
      onClick={openMail}
      className="flex items-center justify-between border-b text-sm border-gray-200 px-4 py-3 hover:shadow-md hover:cursor-pointer"
    >
      <div className="flex items-center gap-3">
        {/* Prevent clicking on icons from opening the email */}
        <div className="text-gray-400" onClick={(e) => e.stopPropagation()}>
          <MdCropSquare size="20px" />
        </div>
        <div className="text-gray-400" onClick={(e) => e.stopPropagation()}>
          <MdOutlineStarBorder size="20px" />
        </div>
        <div>
          <h1 className="font-semibold">{email?.subject || "No Subject"}</h1>
        </div>
      </div>
      <div className="flex-1 ml-4">
        <p className="truncate">{email?.message || "No Content"}</p>
      </div>
      <div className="flex-none text-gray-400 text-sm">
        <p>{formatDate(email?.createdAt)}</p>
      </div>
    </div>
  );
};

export default Email;
