import React from "react";
import { BiPlusCircle } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import config from "../../config.json";
import DosenMahasiswaContext from "../lib/DosenMahasiswaContext";

export default function MataKuliahDosenRow({
  dosen,
  idx,
  assign,
  user,
  mataKuliahId,
}) {
  const [hover, setHover] = React.useState(false);
  const { id: dosenId, name, NIP } = dosen;
  const {
    dosen: _dosen,
    setDosen: _setDosen,
    allDosen: _allDosen,
    setAllDosen: _setAllDosen,
  } = React.useContext(DosenMahasiswaContext);

  return user ? (
    <tr
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="hover:bg-stone-200"
    >
      <td
        onClick={() => {
          if (user) {
            fetch(
              assign
                ? `${config.url}/mata-kuliah/${mataKuliahId}/assign/dosen`
                : `${config.url}/mata-kuliah/${mataKuliahId}/remove/dosen`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  id: dosenId,
                }),
              }
            );
            assign
              ? _setDosen((prev) => [...prev, dosen])
              : _setDosen((prev) => prev.filter((d) => d.id !== dosenId));
            _setAllDosen((prev) =>
              prev.map((d) =>
                d.id === dosenId ? { ...d, assigned: !d.assigned } : d
              )
            );
          }
        }}
        className="pl-5 pr-3 border border-collapse border-black cursor-pointer"
      >
        {hover ? assign ? <BiPlusCircle /> : <TiDelete /> : idx + 1}
      </td>
      <td className="px-2 border border-collapse border-black ">{name}</td>
      <td className="px-2 border border-collapse border-black ">{NIP}</td>
    </tr>
  ) : (
    <tr></tr>
  );
}
