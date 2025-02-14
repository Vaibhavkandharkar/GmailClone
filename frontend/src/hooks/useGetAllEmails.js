
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../redux/appSlice";
import axios from "axios";

const useGetAllEmails = () => {
  const dispatch = useDispatch();
  const { emails } = useSelector((store) => store.app);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/email/getallemails", {
          withCredentials: true,
        });
        dispatch(setEmails(res.data.emails));
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    if (emails.length === 0) {
      fetchEmails();
    }
  }, [dispatch, emails.length]); // Added `dispatch` & `emails.length` to the dependency array

  return emails; // Returning emails instead of null
};

export default useGetAllEmails;
