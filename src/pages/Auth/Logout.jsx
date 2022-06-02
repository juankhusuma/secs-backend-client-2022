import React from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../lib/UserContext";

export default function Logout() {
  const navigate = useNavigate();
  const { setUser } = React.useContext(UserContext);
  React.useEffect(() => {
    !localStorage.getItem("auth-token") && navigate("/");
  }, []);
  return (
    <div className="flex w-full h-[100vh] items-center justify-center flex-col">
      <h1 className="font-bold">Are you sure?</h1>
      <div className="flex">
        <div
          onClick={() => {
            setUser(null);
            localStorage.removeItem("auth-token");
            navigate("/login");
          }}
          className="border px-4 py-2  border-black hover:text-white hover:bg-black hover:font-bold  mx-2 my-5"
        >
          Yes
        </div>
        <div
          onClick={() => navigate("/")}
          className="border px-4 py-2  border-black hover:text-white hover:bg-black hover:font-bold  mx-2 my-5"
        >
          No
        </div>
      </div>
    </div>
  );
}
