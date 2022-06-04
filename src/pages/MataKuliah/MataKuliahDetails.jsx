import React from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../lib/UserContext";
import config from "../../../config.json";
import { useNavigate } from "react-router-dom";
import MataKuliahMahasiswaRow from "../../components/MataKuliahMahasiswaRow";
import DosenMahasiswaContext from "../../lib/DosenMahasiswaContext";
import MataKuliahDosenRow from "../../components/MataKuliahDosenRow";

export default function MataKuliahDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = React.useContext(UserContext);
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [mataKuliah, setMataKuliah] = React.useState(null);
  const [mahasiswa, setMahasiswa] = React.useState([]);
  const [allMahasiswa, setAllMahasiswa] = React.useState([]);
  const [dosen, setDosen] = React.useState([]);
  const [allDosen, setAllDosen] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [changed, setChanged] = React.useState(false);
  const [error, setError] = React.useState("");
  const [schedule, setSchedule] = React.useState([]);
  const [monday, setMonday] = React.useState(false);
  const [tuesday, setTuesday] = React.useState(false);
  const [wednesday, setWednesday] = React.useState(false);
  const [thursday, setThursday] = React.useState(false);
  const [friday, setFriday] = React.useState(false);
  const [saturday, setSaturday] = React.useState(false);
  const [sunday, setSunday] = React.useState(false);

  React.useEffect(() => {
    setSchedule((_) => []);
    monday && setSchedule((schedule) => [...schedule, "SENIN"]);
    tuesday && setSchedule((schedule) => [...schedule, "SELASA"]);
    wednesday && setSchedule((schedule) => [...schedule, "RABU"]);
    thursday && setSchedule((schedule) => [...schedule, "KAMIS"]);
    friday && setSchedule((schedule) => [...schedule, "JUMAT"]);
    saturday && setSchedule((schedule) => [...schedule, "SABTU"]);
    sunday && setSchedule((schedule) => [...schedule, "MINGGU"]);
  }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday]);

  React.useEffect(() => {
    schedule.includes("SENIN") && setMonday((_) => true);
    schedule.includes("SELASA") && setTuesday((_) => true);
    schedule.includes("RABU") && setWednesday((_) => true);
    schedule.includes("KAMIS") && setThursday((_) => true);
    schedule.includes("JUMAT") && setFriday((_) => true);
    schedule.includes("SABTU") && setSaturday((_) => true);
    schedule.includes("MINGGU") && setSunday((_) => true);
  }, [mataKuliah]);

  React.useEffect(() => {
    if (user && user.Role === "ADMIN") {
      fetch(`${config.url}/mata-kuliah/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setMataKuliah(res.data);
          setName(res.data.name);
          setCode(res.data.code);
          setSchedule(res.data.jadwal);
          setMahasiswa(res.data.Mahasiswa);
          setDosen(res.data.Dosen);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      fetch(`${config.url}/mahasiswa`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setAllMahasiswa(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      if (user.Role === "ADMIN") {
        fetch(`${config.url}/dosen`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setAllDosen(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else setLoading(false);
  }, [user]);
  return (
    <div className="flex flex-col xl:flex-row  w-full mt-10 xl:items-start xl:justify-around   items-center justify-center">
      {error && (
        <div className="font-bold text-red-600 text-center">{error}</div>
      )}
      {user && user.Role === "ADMIN" ? (
        !loading ? (
          <>
            <form>
              {mataKuliah ? (
                <>
                  <div className="text-center font-bold mb-5">Mata Kuliah</div>
                  <div className="w-[300px] overflow-auto">
                    <table className="text-sm">
                      <tbody>
                        <tr>
                          <td className="bg-stone-300 font-bold px-2 py-2">
                            Name
                          </td>
                          <td className="px-6">
                            <input
                              className="w-[150px] border m-2 px-2 py-1 bg-stone-300"
                              type="text"
                              value={name}
                              onChange={(e) =>
                                setName(e.target.value) || setChanged(true)
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-stone-300 font-bold px-2 py-2">
                            Code
                          </td>
                          <td className="px-6">
                            <input
                              className="border w-[150px] m-2 px-2 py-1 bg-stone-300"
                              type="text"
                              value={code}
                              onChange={(e) =>
                                setCode(e.target.value) || setChanged(true)
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-stone-300 font-bold px-2 py-2">
                            Schedule
                          </td>
                          <td className="px-6 py-3">
                            <div>
                              <input
                                type="checkbox"
                                checked={monday}
                                name="senin"
                                onChange={() =>
                                  setMonday(!monday) || setChanged(true)
                                }
                              />
                              <label className="ml-4" htmlFor="senin">
                                Senin
                              </label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                checked={tuesday}
                                name="selasa"
                                onChange={() =>
                                  setTuesday(!tuesday) || setChanged(true)
                                }
                              />
                              <label className="ml-4" htmlFor="selasa">
                                Selasa
                              </label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                checked={wednesday}
                                name="rabu"
                                onChange={() =>
                                  setWednesday(!wednesday) || setChanged(true)
                                }
                              />
                              <label className="ml-4" htmlFor="rabu">
                                Rabu
                              </label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                checked={thursday}
                                name="kamis"
                                onChange={() =>
                                  setThursday(!thursday) || setChanged(true)
                                }
                              />
                              <label className="ml-4" htmlFor="kamis">
                                Kamis
                              </label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                checked={friday}
                                name="jumat"
                                onChange={() =>
                                  setFriday(!friday) || setChanged(true)
                                }
                              />
                              <label className="ml-4" htmlFor="jumat">
                                Jumat
                              </label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                checked={saturday}
                                name="sabtu"
                                onChange={() =>
                                  setSaturday(!saturday) || setChanged(true)
                                }
                              />
                              <label className="ml-4" htmlFor="sabtu">
                                Sabtu
                              </label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                checked={sunday}
                                name="minggu"
                                onChange={() =>
                                  setSunday(!sunday) || setChanged(true)
                                }
                              />
                              <label className="ml-4" htmlFor="minggu">
                                Minggu
                              </label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="font-bold">User Not Found</div>
              )}
              <div className="text-center">
                <div
                  className="cursor-pointer border bg-blue-300 hover:bg-blue-400  border-black px-2 py-2 font-bold hover:text-white"
                  onClick={() => navigate("/mata-kuliah")}
                >
                  Go Back
                </div>
                <div
                  className="cursor-pointer border bg-yellow-300 hover:bg-yellow-400 border-black px-2 py-2 font-bold hover:text-white"
                  onClick={() => {
                    setName(mataKuliah.name);
                    setCode(mataKuliah.code);
                    setSchedule(mataKuliah.schedule);
                    setMonday(false);
                    setTuesday(false);
                    setWednesday(false);
                    setThursday(false);
                    setFriday(false);
                    setSaturday(false);
                    setSunday(false);
                    mataKuliah.jadwal.includes("SENIN") &&
                      setMonday((_) => true);
                    mataKuliah.jadwal.includes("SELASA") &&
                      setTuesday((_) => true);
                    mataKuliah.jadwal.includes("RABU") &&
                      setWednesday((_) => true);
                    mataKuliah.jadwal.includes("KAMIS") &&
                      setThursday((_) => true);
                    mataKuliah.jadwal.includes("JUMAT") &&
                      setFriday((_) => true);
                    mataKuliah.jadwal.includes("SABTU") &&
                      setSaturday((_) => true);
                    mataKuliah.jadwal.includes("MINGGU") &&
                      setSunday((_) => true);
                    setChanged(false);
                  }}
                >
                  Reset
                </div>
                {changed ? (
                  <div
                    className="cursor-pointer border bg-green-400 hover:bg-green-500 border-black px-2 py-2 font-bold hover:text-white"
                    onClick={() => {
                      let data = { name, code, jadwal: schedule };
                      for (const key in data) {
                        if (data[key] === mataKuliah[key]) {
                          delete data[key];
                        }
                      }
                      fetch(`${config.url}/mata-kuliah/${id}`, {
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
                          ? navigate("/mata-kuliah")
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
                    className="cursor-pointer border bg-red-500 hover:bg-red-600 border-black px-2 py-2 font-bold hover:text-white"
                    onClick={() => navigate("delete")}
                  >
                    Delete
                  </div>
                )}
              </div>
            </form>
            <DosenMahasiswaContext.Provider
              value={{
                mahasiswa,
                setMahasiswa,
                allMahasiswa,
                setAllMahasiswa,
                dosen,
                setDosen,
                allDosen,
                setAllDosen,
              }}
            >
              <div>
                <h1 className="font-bold text-center mt-10 xl:mt-0 mb-5">
                  Mahasiswa
                </h1>
                <div className="w-[300px] max-h-[500px] lg:max-h-[800px] overflow-auto border-2 border-black mb-20">
                  <table>
                    <thead className="text-center">
                      <tr>
                        <th colSpan={3} className="bg-green-300">
                          Assigned
                        </th>
                      </tr>
                      <tr>
                        <th className="px-2 py-1 w-[50px] border border-collapse border-black bg-gray-100">
                          No.
                        </th>
                        <th className="px-2 py-1 border border-collapse border-black bg-gray-100">
                          Name
                        </th>
                        <th className="px-2 py-1 border border-collapse border-black bg-gray-100">
                          NIM
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mahasiswa.map((mahasiswa, index) => (
                        <MataKuliahMahasiswaRow
                          user
                          mahasiswa={mahasiswa}
                          idx={index}
                          mataKuliahId={id}
                          key={index}
                        />
                      ))}
                      {mahasiswa.length === 0 && (
                        <tr className="text-center">
                          <td
                            colSpan={3}
                            className="border border-collapse border-black bg-gray-100"
                          >
                            <p>None</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <thead>
                      <tr>
                        <th colSpan={3} className="bg-sky-300">
                          All
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allMahasiswa
                        .filter((item) => {
                          return !mahasiswa.some(
                            (mahasiswa) => mahasiswa.id === item.id
                          );
                        })
                        .map((mahasiswa, index) => (
                          <MataKuliahMahasiswaRow
                            assign
                            user
                            mahasiswa={mahasiswa}
                            idx={index}
                            mataKuliahId={id}
                            key={index}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h1 className="font-bold text-center mb-5">Dosen</h1>
                <div className="w-[300px] max-h-[500px] lg:max-h-[800px] overflow-auto border-2 border-black mb-20">
                  <table className="w-full h-full">
                    <thead className="text-center">
                      <tr>
                        <th className="bg-green-300" colSpan={3}>
                          Assigned
                        </th>
                      </tr>
                      <tr>
                        <th className="px-2 py-1 border border-collapse border-black bg-gray-100">
                          No.
                        </th>
                        <th className="px-2 py-1 border border-collapse border-black bg-gray-100">
                          Name
                        </th>
                        <th className="px-2 py-1 border border-collapse border-black bg-gray-100">
                          NIP
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dosen.map((dosen, index) => (
                        <MataKuliahDosenRow
                          user
                          dosen={dosen}
                          idx={index}
                          mataKuliahId={id}
                          key={index}
                        />
                      ))}
                      {dosen.length === 0 && (
                        <tr className="text-center">
                          <td
                            colSpan={3}
                            className="border border-collapse border-black bg-gray-100"
                          >
                            <p>None</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <thead>
                      <tr>
                        <th className="bg-sky-300" colSpan={3}>
                          All
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allDosen
                        .filter((item) => {
                          return !dosen.some((dosen) => dosen.id === item.id);
                        })
                        .map((dosen, index) => (
                          <MataKuliahDosenRow
                            assign
                            user
                            dosen={dosen}
                            idx={index}
                            mataKuliahId={id}
                            key={index}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </DosenMahasiswaContext.Provider>
          </>
        ) : (
          <div className="font-bold">Loading...</div>
        )
      ) : (
        <p className="font-bold text-center p-5">
          Unauthorized. Only user with ADMIN privilidge is allowed
        </p>
      )}
    </div>
  );
}
