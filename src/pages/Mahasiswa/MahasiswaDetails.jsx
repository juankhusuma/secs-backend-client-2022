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
  const [schedule, setSchedule] = React.useState([]);

  React.useEffect(() => {
    if (mahasiswa) {
      const schedule = {
        SENIN: [],
        SELASA: [],
        RABU: [],
        KAMIS: [],
        JUMAT: [],
        SABTU: [],
        MINGGU: [],
      };
      for (const mataKuliah of mahasiswa.MataKuliah) {
        for (const jadwal of mataKuliah.jadwal) {
          if (!schedule[jadwal]) {
            schedule[jadwal] = [];
          }
          schedule[jadwal].push(mataKuliah);
        }
        console.log(schedule);
        setSchedule((_) => schedule);
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
    <div className="flex flex-col w-full mt-10  items-center justify-center">
      {error && (
        <div className="font-bold text-red-600 text-center">{error}</div>
      )}
      {user ? (
        !loading ? (
          <>
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
            {Object.keys(schedule).length !== 0 && (
              <>
                <h1 className="font-bold mb-3 mt-16">Jadwal</h1>
                <table>
                  <tbody>
                    {Object.keys(schedule).map((key) => (
                      <tr key={key} className="border-stone-400">
                        <td className="font-bold px-4 bg-sky-300 py-2">
                          {key}
                        </td>
                        {schedule[key].length > 0 &&
                          schedule[key].map((mataKuliah) => (
                            <td
                              className="px-6 bg-green-300 hover:font-bold hover:underline cursor-pointer"
                              onClick={() =>
                                navigate(`/mata-kuliah/${mataKuliah.id}`)
                              }
                            >
                              {mataKuliah.code}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        ) : (
          <div className="font-bold">Loading...</div>
        )
      ) : (
        <p className="font-bold">Unauthorized</p>
      )}
    </div>
  );
}
