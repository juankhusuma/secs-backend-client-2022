import React from "react";
import config from "../../../config.json";
import { useNavigate } from "react-router-dom";
import UserContext from "../../lib/UserContext";

export default function CreateMahasiswa() {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);
  const [error, setError] = React.useState("");
  const [name, setName] = React.useState("");
  const [NIM, setNIM] = React.useState("");
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    user && setToken(localStorage.getItem("auth-token"));
  }, [user]);
  return (
    <div>
      <div className="flex w-full mt-16 lg:mt-0  lg:h-[100vh] items-center justify-center flex-col">
        {user && token ? (
          <>
            <h1 className="font-bold">Add Mahasiswa</h1>
            <p className="text-red-500 mt-3 mb-3">{error ? `${error}` : ""}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetch(`${config.url}/mahasiswa`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    name,
                    NIM,
                  }),
                }).then((res) =>
                  res.status === 200
                    ? navigate("/mahasiswa")
                    : res.json().then((data) => setError(data.error.message))
                );
              }}
              className="flex flex-col"
            >
              <div className="px-4 py-2  flex flex-col">
                <label className="text-gray-700" htmlFor="username">
                  Name
                </label>
                <input
                  required
                  className="px-4 py-2 border border-black focus:border-2  flex flex-col"
                  name="username"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Insert name here..."
                />
              </div>
              <div className="px-4 py-2  flex flex-col">
                <label className="text-gray-700" htmlFor="NIM">
                  NIM
                </label>
                <input
                  required
                  className="px-4 py-2 border border-black focus:border-2  flex flex-col"
                  name="NIM"
                  type="text"
                  value={NIM}
                  onChange={(e) => setNIM(e.target.value)}
                  placeholder="Insert NIM here..."
                />
              </div>
              <input
                className="px-4 py-2 border-2 inline-block mt-8 border-black hover:bg-green-400 bg-green-300 hover:text-white"
                type="submit"
                value="Submit"
              />
              <div
                className="cursor-pointer select-none px-4 py-2 border-2 inline-block mt-2 border-black bg-yellow-300 hover:bg-yellow-300 text-center"
                onClick={() => navigate("/mahasiswa")}
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
