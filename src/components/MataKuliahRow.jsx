import { useNavigate } from "react-router-dom";
import React from "react";
import { RiPencilLine } from "react-icons/ri";
import UserContext from "../lib/UserContext";

export default function MataKuliahRow({ mahasiswa, idx }) {
  const navigate = useNavigate();
  const [hover, setHover] = React.useState(false);
  const { user } = React.useContext(UserContext);
  const { id, name, code, jadwal } = mahasiswa;
  return (
    <>
      <tr
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="hover:bg-stone-200"
      >
        <td
          onClick={() => {
            user.Role === "ADMIN" && navigate("/mata-kuliah/" + id);
          }}
          className="pl-5 pr-3 border border-collapse border-black cursor-pointer"
        >
          {hover && user.Role === "ADMIN" ? <RiPencilLine /> : idx + 1}
        </td>
        <td className="px-2 border border-collapse border-black whitespace-nowrap">
          {name}
        </td>
        <td className="px-2 border border-collapse border-black whitespace-nowrap">
          {code}
        </td>
        <td className="px-1 py-1 border border-collapse border-black">
          {jadwal.map((item, index) => (
            <div
              className="w-full hover:bg-stone-400 px-2 text-center whitespace-nowrap"
              key={index}
            >
              {item}
            </div>
          ))}
        </td>
      </tr>
    </>
  );
}
