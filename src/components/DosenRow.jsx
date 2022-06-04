import { useNavigate } from "react-router-dom";
import React from "react";
import { RiPencilLine } from "react-icons/ri";
import UserContext from "../lib/UserContext";

export default function DosenRow({ dosen, idx }) {
  const navigate = useNavigate();
  const { id, name, NIP, username, Role, MataKuliah } = dosen;
  const [hover, setHover] = React.useState(false);
  const { user } = React.useContext(UserContext);

  return (
    <>
      <tr
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="hover:bg-stone-200"
      >
        <td
          onClick={() => {
            user.Role === "ADMIN" && navigate("/dosen/" + id);
          }}
          className="pl-5 pr-3 border border-collapse border-black cursor-pointer"
        >
          {hover && user.Role === "ADMIN" ? <RiPencilLine /> : idx + 1}
        </td>
        <td className="px-2 border border-collapse border-black whitespace-nowrap">
          {name}
        </td>
        <td className="px-2 border border-collapse border-black whitespace-nowrap">
          {NIP}
        </td>
        <td className="px-2 border border-collapse border-black whitespace-nowrap">
          {username}
        </td>
        <td className="px-2 border border-collapse border-black whitespace-nowrap">
          {Role}
        </td>
        <td className="px-3 py-2 border border-collapse border-black">
          {MataKuliah.map((item, index) => (
            <div
              onClick={() =>
                user.Role === "ADMIN" && navigate(`/mata-kuliah/${item.id}`)
              }
              className="w-full hover:bg-blue-300 whitespace-nowrap  m-1 p-1 text-center border cursor-pointer"
              key={index}
            >
              {`${item.name} (${item.code})`}
            </div>
          ))}
        </td>
      </tr>
    </>
  );
}
