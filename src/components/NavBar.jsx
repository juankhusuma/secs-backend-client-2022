import React from "react";
import UserContext from "../lib/UserContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { user, loading } = React.useContext(UserContext);
  const [showMenu, setShowMenu] = React.useState(false);
  const navigate = useNavigate();

  return (
    <nav className="relative border-2 flex flex-col lg:flex-row  w-full items-center justify-between border-black">
      <div className="flex w-full justify-between">
        <div className="flex">
          <h1 className="select-none font-bold cursor-pointer border-r-2 border-black px-2 hover:bg-black hover:text-white">
            <div
              onClick={() => {
                setShowMenu((_) => false);
                navigate("/");
              }}
            >
              SECS 2022
            </div>
          </h1>
          <h1
            className={`font-bold cursor-pointer border-r-2 border-black px-2 hover:bg-black hover:text-white`}
          >
            <div
              onClick={() => {
                setShowMenu((_) => false);
                navigate(user && !loading ? "/logout" : "/login");
              }}
              className="select-none"
            >
              {user && !loading ? "Logout" : "Login"}
            </div>
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
          <div
            onClick={() => {
              setShowMenu((_) => false);
              navigate("/dosen");
            }}
            className="select-none"
          >
            Dosen
          </div>
        </li>
        <li className="border-b lg:border-b-0 py-3 lg:py-0 lg:border-l-2 cursor-pointer px-3 border-black hover:bg-black hover:text-white">
          <div
            onClick={() => {
              setShowMenu((_) => false);
              navigate("/mahasiswa");
            }}
            className="select-none"
          >
            Mahasiswa
          </div>
        </li>
        <li className="border-b lg:border-b-0 py-3 lg:py-0 lg:border-x-2 cursor-pointer px-3 border-black hover:bg-black hover:text-white">
          <div
            onClick={() => {
              setShowMenu((_) => false);
              navigate("/mata-kuliah");
            }}
            className="select-none"
          >
            Mata Kuliah
          </div>
        </li>
      </ul>
    </nav>
  );
}
