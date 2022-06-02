import React from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../lib/UserContext";
import config from "../../../config.json";
import { useNavigate } from "react-router-dom";

export default function MahasiswaDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = React.useContext(UserContext);
  const [name, setName] = React.useState("");
  const [NIM, setNIM] = React.useState("");
  const [mahasiswa, setMahasiswa] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [changed, setChanged] = React.useState(false);
  const [error, setError] = React.useState("");
  const [mataKuliahSenin, setMataKuliahSenin] = React.useState([]);
  const [mataKuliahSelasa, setMataKuliahSelasa] = React.useState([]);
  const [mataKuliahRabu, setMataKuliahRabu] = React.useState([]);
  const [mataKuliahKamis, setMataKuliahKamis] = React.useState([]);
  const [mataKuliahJumat, setMataKuliahJumat] = React.useState([]);
  const [mataKuliahSabtu, setMataKuliahSabtu] = React.useState([]);
  const [mataKuliahMinggu, setMataKuliahMinggu] = React.useState([]);

  React.useEffect(() => {
    setMataKuliahSenin((_) => []);
    setMataKuliahSelasa((_) => []);
    setMataKuliahRabu((_) => []);
    setMataKuliahKamis((_) => []);
    setMataKuliahJumat((_) => []);
    setMataKuliahSabtu((_) => []);
    setMataKuliahMinggu((_) => []);
    if (mahasiswa) {
      for (const mataKuliah of mahasiswa.MataKuliah) {
        mataKuliah.jadwal.includes("SENIN") &&
          setMataKuliahSenin((prevState) => [...prevState, mataKuliah]);
        mataKuliah.jadwal.includes("SELASA") &&
          setMataKuliahSelasa((prevState) => [...prevState, mataKuliah]);
        mataKuliah.jadwal.includes("RABU") &&
          setMataKuliahRabu((prevState) => [...prevState, mataKuliah]);
        mataKuliah.jadwal.includes("KAMIS") &&
          setMataKuliahKamis((prevState) => [...prevState, mataKuliah]);
        mataKuliah.jadwal.includes("JUMAT") &&
          setMataKuliahJumat((prevState) => [...prevState, mataKuliah]);
        mataKuliah.jadwal.includes("SABTU") &&
          setMataKuliahSabtu((prevState) => [...prevState, mataKuliah]);
        mataKuliah.jadwal.includes("MINGGU") &&
          setMataKuliahMinggu((prevState) => [...prevState, mataKuliah]);
      }
    }
  }, [mahasiswa]);

  React.useEffect(() => {
    user
      ? fetch(`${config.url}/mahasiswa/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setMahasiswa(res.data);
            setName(res.data.name);
            setNIM(res.data.NIM);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          })
      : setLoading(false);
  }, [user]);
  return (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center">
      {error && (
        <div className="font-bold text-red-600 text-center">{error}</div>
      )}
      {user ? (
        !loading ? (
          <form>
            {mahasiswa ? (
              <table className="">
                <tbody>
                  <tr>
                    <td className="font-bold px-4 py-2">Name</td>
                    <td className="px-6">
                      <input
                        className="border m-2 px-2 py-1 bg-stone-300"
                        type="text"
                        value={name}
                        onChange={(e) =>
                          setName(e.target.value) || setChanged(true)
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold px-4 py-2">NIM</td>
                    <td className="px-6">
                      <input
                        className="border m-2 px-2 py-1 bg-stone-300"
                        type="text"
                        value={NIM}
                        onChange={(e) =>
                          setNIM(e.target.value) || setChanged(true)
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="font-bold">User Not Found</div>
            )}
            <div className="text-center">
              <div
                className="cursor-pointer border hover:bg-blue-400  border-black px-4 py-2 font-bold hover:text-white"
                onClick={() => navigate("/mahasiswa")}
              >
                Go Back
              </div>
              <div
                className="cursor-pointer border hover:bg-yellow-400 border-black px-4 py-2 font-bold hover:text-white"
                onClick={() => {
                  setName(mahasiswa.name);
                  setNIM(mahasiswa.NIM);
                  setChanged(false);
                }}
              >
                Reset
              </div>
              {changed ? (
                <div
                  className="cursor-pointer border hover:bg-green-500 border-black px-4 py-2 font-bold hover:text-white"
                  onClick={() => {
                    let data = { name, NIM, username, Role: role };
                    for (const key in data) {
                      if (data[key] === mahasiswa[key]) {
                        delete data[key];
                      }
                    }
                    fetch(`${config.url}/mahasiswa/${id}`, {
                      method: "PUT",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "auth-token"
                        )}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ ...data }),
                    }).then((res) =>
                      res.status === 200
                        ? navigate("/mahasiswa")
                        : res.json().then((res) => {
                            setError(res.error.message);
                          })
                    );
                  }}
                >
                  Save
                </div>
              ) : (
                <div
                  className="cursor-pointer border hover:bg-red-600 border-black px-4 py-2 font-bold hover:text-white"
                  onClick={() => {
                    fetch(`${config.url}/mahasiswa/${id}`, {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "auth-token"
                        )}`,
                      },
                    }).then((res) =>
                      res.status === 200
                        ? navigate("/mahasiswa")
                        : res.json().then((res) => {
                            setError(res.error.message);
                          })
                    );
                  }}
                >
                  Delete Record
                </div>
              )}
            </div>
          </form>
        ) : (
          <div className="font-bold">Loading...</div>
        )
      ) : (
        <p className="font-bold">Unauthorized</p>
      )}
    </div>
  );
}
