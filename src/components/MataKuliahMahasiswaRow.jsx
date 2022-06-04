import React from "react";
import { BiPlusCircle } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import config from "../../config.json";
import DosenMahasiswaContext from "../lib/DosenMahasiswaContext";

export default function MataKuliahDosenRow({
  mahasiswa,
  idx,
  assign,
  user,
  mataKuliahId,
}) {
  const [hover, setHover] = React.useState(false);
  const { id: mahasiswaId, name, NIM } = mahasiswa;
  const {
    mahasiswa: _mahasiswa,
    setMahasiswa: _setMahasiswa,
    allMahasiswa: _allMahasiswa,
    setAllMahasiswa: _setAllMahasiswa,
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
                ? `${config.url}/mata-kuliah/${mataKuliahId}/assign/mahasiswa`
                : `${config.url}/mata-kuliah/${mataKuliahId}/remove/mahasiswa`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  id: mahasiswaId,
                }),
              }
            );
            assign
              ? _setMahasiswa((prev) => [...prev, mahasiswa])
              : _setMahasiswa((prev) =>
                  prev.filter((m) => m.id !== mahasiswaId)
                );
            _setAllMahasiswa((prev) =>
              prev.map((m) =>
                m.id === mahasiswaId ? { ...m, assigned: !m.assigned } : m
              )
            );
          }
        }}
        className="pl-5 pr-3 border border-collapse border-black cursor-pointer"
      >
        {hover ? (
          assign ? (
            <BiPlusCircle className="text-xs" />
          ) : (
            <TiDelete className="text-xs" />
          )
        ) : (
          idx + 1
        )}
      </td>
      <td className="px-2 border border-collapse border-black whitespace-nowrap">
        {name}
      </td>
      <td className="px-2 border border-collapse border-black whitespace-nowrap">
        {NIM}
      </td>
    </tr>
  ) : (
    <tr></tr>
  );
}
