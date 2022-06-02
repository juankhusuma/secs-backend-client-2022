import { useNavigate } from "react-router-dom";
import React from "react";
import { RiPencilLine } from "react-icons/ri";

export default function MahasiswaRow({ mahasiswa, idx }) {
  const navigate = useNavigate();
  const [hover, setHover] = React.useState(false);
  const { id, name, NIM, MataKuliah } = mahasiswa;
  return (
    <>
      <tr
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="hover:bg-stone-200"
      >
        <td
          onClick={() => {
            navigate("/mahasiswa/" + id);
          }}
          className="pl-5 pr-3 border border-collapse border-black cursor-pointer"
        >
          {hover ? <RiPencilLine /> : idx + 1}
        </td>
        <td className="px-2 border border-collapse border-black ">{name}</td>
        <td className="px-2 border border-collapse border-black ">{NIM}</td>
        <td className="px-3 py-2 border border-collapse border-black ">
          {MataKuliah.map((item, index) => (
            <div
              onClick={() => navigate(`/mata-kuliah/${item.id}`)}
              className="w-full hover:bg-blue-300  m-1 p-1 text-center border cursor-pointer"
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
