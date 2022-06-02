import React from "react";
import { Link } from "react-router-dom";
import UserContext from "../lib/UserContext";
export default function NavBar() {
  const { user, loading } = React.useContext(UserContext);
  return (
    <nav className="border-2 flex w-full items-center justify-between border-black">
      <div className="flex">
        <h1 className="select-none font-bold cursor-pointer border-r-2 border-black px-2 hover:bg-black hover:text-white">
          <Link to={"/"}>SECS 2022</Link>
        </h1>
        <h1 className="font-bold cursor-pointer border-r-2 border-black px-2 hover:bg-black hover:text-white">
          <Link
            className="select-none"
            to={user && !loading ? "/logout" : "/login"}
          >
            {user && !loading ? "Logout" : "Login"}
          </Link>
        </h1>
      </div>
      <ul className="px-3 flex w-1/2 justify-center">
        <li className="border-l-2 cursor-pointer px-3 border-black hover:bg-black hover:text-white">
          <Link className="select-none" to={"/dosen"}>
            Dosen
          </Link>
        </li>
        <li className="border-l-2 cursor-pointer px-3 border-black hover:bg-black hover:text-white">
          <Link className="select-none" to={"/mahasiswa"}>
            Mahasiswa
          </Link>
        </li>
        <li className="border-x-2 cursor-pointer px-3 border-black hover:bg-black hover:text-white">
          <Link className="select-none" to={"/mata-kuliah"}>
            Mata Kuliah
          </Link>
        </li>
      </ul>
    </nav>
  );
}
