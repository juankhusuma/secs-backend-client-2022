import React from "react";
import { Link } from "react-router-dom";
import UserContext from "../lib/UserContext";
import { GiHamburgerMenu } from "react-icons/gi";

export default function NavBar() {
  const { user, loading } = React.useContext(UserContext);
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <nav className="relative border-2 flex flex-col lg:flex-row  w-full items-center justify-between border-black">
      <div className="flex w-full justify-between">
        <div className="flex">
          <h1 className="select-none font-bold cursor-pointer border-r-2 border-black px-2 hover:bg-black hover:text-white">
            <Link to="/" onClick={() => setShowMenu((_) => false)}>
              SECS 2022
            </Link>
          </h1>
          <h1 className="font-bold cursor-pointer border-r-2 border-black px-2 hover:bg-black hover:text-white">
            <Link
              onClick={() => setShowMenu((_) => false)}
              className="select-none"
              to={user && !loading ? "/logout" : "/login"}
            >
              {user && !loading ? "Logout" : "Login"}
            </Link>
          </h1>
        </div>
        <div
          className="lg:hidden p-1"
          onClick={() => setShowMenu((showMenu) => !showMenu)}
        >
          <GiHamburgerMenu className="cursor-pointer" />
        </div>
      </div>
      <ul
        className={`border border-black lg:border-none lg:px-3 lg:flex lg:flex-row lg:w-1/2 w-full justify-center absolute lg:static right-0 top-[25px] bg-white  ${
          showMenu ? "flex-col" : "hidden"
        }`}
      >
        <li className="border-b lg:border-b-0 py-3 lg:py-0 lg:border-l-2 cursor-pointer px-3 border-black hover:bg-black hover:text-white">
          <Link
            onClick={() => setShowMenu((_) => false)}
            className="select-none"
            to="/dosen"
          >
            Dosen
          </Link>
        </li>
        <li className="border-b lg:border-b-0 py-3 lg:py-0 lg:border-l-2 cursor-pointer px-3 border-black hover:bg-black hover:text-white">
          <Link
            onClick={() => setShowMenu((_) => false)}
            className="select-none"
            to="/mahasiswa"
          >
            Mahasiswa
          </Link>
        </li>
        <li className="border-b lg:border-b-0 py-3 lg:py-0 lg:border-x-2 cursor-pointer px-3 border-black hover:bg-black hover:text-white">
          <Link
            onClick={() => setShowMenu((_) => false)}
            className="select-none"
            to="/mata-kuliah"
          >
            Mata Kuliah
          </Link>
        </li>
      </ul>
    </nav>
  );
}
