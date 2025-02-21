import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Mail from "./components/Mail";
import Inbox from "./components/Inbox";
import SendEmail from "./components/SendEmail";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Inbox />,
      },
      {
        path: "/mail/:id",
        element: <Mail />,
      },
    ],
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/Signup',
    element:<Signup/>
  }
]);

function App() {

  return (
    <div className="bg-[#F6F8FC] h-screen">
 
      <RouterProvider router={appRouter} />
      <div className="absolute w-[30%] bottom-0 right-20 z-10">
        <SendEmail />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
