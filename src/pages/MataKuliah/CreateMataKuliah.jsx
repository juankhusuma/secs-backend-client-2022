import config from "../../../config.json";
import { useNavigate } from "react-router-dom";
import React from "react";
import UserContext from "../../lib/UserContext";

export default function CreateMataKuliah() {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);
  const [error, setError] = React.useState("");
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [schedule, setSchedule] = React.useState([]);
  const [monday, setMonday] = React.useState(false);
  const [tuesday, setTuesday] = React.useState(false);
  const [wednesday, setWednesday] = React.useState(false);
  const [thursday, setThursday] = React.useState(false);
  const [friday, setFriday] = React.useState(false);
  const [saturday, setSaturday] = React.useState(false);
  const [sunday, setSunday] = React.useState(false);
  const [token, setToken] = React.useState("");

  React.useEffect(() => {
    setSchedule((_) => []);
    monday && setSchedule((schedule) => [...schedule, "SENIN"]);
    tuesday && setSchedule((schedule) => [...schedule, "SELASA"]);
    wednesday && setSchedule((schedule) => [...schedule, "RABU"]);
    thursday && setSchedule((schedule) => [...schedule, "KAMIS"]);
    friday && setSchedule((schedule) => [...schedule, "JUMAT"]);
    saturday && setSchedule((schedule) => [...schedule, "SABTU"]);
  }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday]);

  React.useEffect(() => {
    user && setToken(localStorage.getItem("auth-token"));
  }, [user]);
  return (
    <div>
      <div className="flex w-full mt-16 lg:mt-0  lg:h-[100vh] items-center justify-center flex-col">
        {user && token && user.Role === "ADMIN" ? (
          <>
            <h1 className="font-bold">Add Mata Kuliah</h1>
            <p className="text-red-500 mt-3 mb-3">{error ? `${error}` : ""}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetch(`${config.url}/mata-kuliah`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    name,
                    code,
                    jadwal: schedule,
                  }),
                }).then((res) =>
                  res.status === 200
                    ? navigate("/mata-kuliah")
                    : res.json().then((data) => setError(data.error.message))
                );
              }}
              className="flex flex-col"
            >
              <div className="px-4 py-2  flex flex-col">
                <label className="text-gray-700" htmlFor="name">
                  Name
                </label>
                <input
                  required
                  className="px-4 py-2 border border-black focus:border-2  flex flex-col"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Insert name here..."
                />
              </div>
              <div className="px-4 py-2  flex flex-col">
                <label className="text-gray-700" htmlFor="code">
                  Code
                </label>
                <input
                  required
                  className="px-4 py-2 border border-black focus:border-2  flex flex-col"
                  name="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Insert code here..."
                />
              </div>
              <div className="px-4 py-2  flex flex-col border mt-5 border-black">
                <p className="text-gray-700 mb-3">Schedule</p>
                <div>
                  <input
                    type="checkbox"
                    name="senin"
                    onChange={() => setMonday(!monday)}
                  />
                  <label className="ml-4" htmlFor="senin">
                    Senin
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="selasa"
                    onChange={() => setTuesday(!tuesday)}
                  />
                  <label className="ml-4" htmlFor="selasa">
                    Selasa
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="rabu"
                    onChange={() => setWednesday(!wednesday)}
                  />
                  <label className="ml-4" htmlFor="rabu">
                    Rabu
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="kamis"
                    onChange={() => setThursday(!thursday)}
                  />
                  <label className="ml-4" htmlFor="kamis">
                    Kamis
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="jumat"
                    onChange={() => setFriday(!friday)}
                  />
                  <label className="ml-4" htmlFor="jumat">
                    Jumat
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="sabtu"
                    onChange={() => setSaturday(!saturday)}
                  />
                  <label className="ml-4" htmlFor="sabtu">
                    Sabtu
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="minggu"
                    onChange={() => setSunday(!sunday)}
                  />
                  <label className="ml-4" htmlFor="minggu">
                    Minggu
                  </label>
                </div>
              </div>
              <input
                className="px-4 bg-green-300 hover:bg-green-400 py-2 border-2 inline-block mt-8 border-black hover:text-white"
                type="submit"
                value="Submit"
              />
              <div
                className="cursor-pointer select-none px-4 py-2 border-2 inline-block mt-2 border-black bg-yellow-300 hover:bg-yellow-300 text-center"
                onClick={() => navigate("/mata-kuliah")}
              >
                Back
              </div>
            </form>
          </>
        ) : (
          <p className="font-bold text-center p-5">
            Unauthorized. You must be logged in to access this page
          </p>
        )}
      </div>
    </div>
  );
}
