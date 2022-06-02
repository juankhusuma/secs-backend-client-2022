import React from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../lib/UserContext";
import config from "../../../config.json";
import { useNavigate } from "react-router-dom";

export default function DosenDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = React.useContext(UserContext);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [NIP, setNIP] = React.useState("");
  const [role, setRole] = React.useState("");
  const [dosen, setDosen] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [changed, setChanged] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    user
      ? fetch(`${config.url}/dosen/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setDosen(res.data);
            setName(res.data.name);
            setNIP(res.data.NIP);
            setUsername(res.data.username);
            setRole(res.data.Role);
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
      {user && user.Role === "ADMIN" ? (
        !loading ? (
          <form>
            {dosen ? (
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
                    <td className="font-bold px-4 py-2">NIP</td>
                    <td className="px-6">
                      <input
                        className="border m-2 px-2 py-1 bg-stone-300"
                        type="text"
                        value={NIP}
                        onChange={(e) =>
                          setNIP(e.target.value) || setChanged(true)
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold px-4 py-2">Username</td>
                    <td className="px-6">
                      <input
                        className="border m-2 px-2 py-1 bg-stone-300"
                        type="text"
                        value={username}
                        onChange={(e) =>
                          setUsername(e.target.value) || setChanged(true)
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold px-4 py-2">Role</td>
                    <td className="px-6">
                      <select
                        className="border m-2 px-2 py-1 bg-stone-300"
                        value={role}
                        onChange={(e) =>
                          setRole(e.target.value) || setChanged(true)
                        }
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="DOSEN">DOSEN</option>
                      </select>
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
                onClick={() => navigate("/dosen")}
              >
                Go Back
              </div>
              <div
                className="cursor-pointer border hover:bg-yellow-400 border-black px-4 py-2 font-bold hover:text-white"
                onClick={() => {
                  setName(dosen.name);
                  setNIP(dosen.NIP);
                  setUsername(dosen.username);
                  setRole(dosen.Role);
                  setChanged(false);
                }}
              >
                Reset
              </div>
              {changed ? (
                <div
                  className="cursor-pointer border hover:bg-green-500 border-black px-4 py-2 font-bold hover:text-white"
                  onClick={() => {
                    let data = { name, NIP, username, Role: role };
                    for (const key in data) {
                      if (data[key] === dosen[key]) {
                        delete data[key];
                      }
                    }
                    fetch(`${config.url}/dosen/${id}`, {
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
                        ? navigate("/dosen")
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
                    fetch(`${config.url}/dosen/${id}`, {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "auth-token"
                        )}`,
                      },
                    }).then((res) =>
                      res.status === 200
                        ? navigate("/dosen")
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
        <p className="font-bold">
          Unauthorized. Only user with ADMIN privilidge is allowed
        </p>
      )}
    </div>
  );
}
