import React from "react";
import UserContext from "../../lib/UserContext";
import config from "../../../config.json";
import DosenRow from "../../components/DosenRow";

export default function Dosen() {
  const { user } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  const [dosen, setDosen] = React.useState([]);
  React.useEffect(() => {
    user
      ? fetch(`${config.url}/dosen`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.data);
            setDosen(res.data);
            user.Role === "DOSEN" &&
              setDosen((prev) =>
                prev.filter((dosen) => dosen.Role === "DOSEN")
              );
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          })
      : setLoading(false);
  }, [user]);
  return user ? (
    <div className="mt-16   flex flex-col w-full items-center">
      {!loading ? (
        <table>
          <thead className="text-center">
            <tr>
              <th className="px-4 py-1 border border-collapse border-black bg-gray-100">
                No.
              </th>
              <th className="px-4 py-1 border border-collapse border-black bg-gray-100">
                Name
              </th>
              <th className="px-4 py-1 border border-collapse border-black bg-gray-100">
                NIP
              </th>
              <th className="px-4 py-1 border border-collapse border-black bg-gray-100">
                Username
              </th>
              <th className="px-4 py-1 border border-collapse border-black bg-gray-100">
                Role
              </th>
              <th className="px-4 py-1 border border-collapse border-black bg-gray-100">
                Mata Kuliah
              </th>
            </tr>
          </thead>
          <tbody>
            {dosen.map((item, index) => (
              <DosenRow dosen={item} idx={index} key={index} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="font-bold">Loading...</div>
      )}
    </div>
  ) : (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center">
      <p className="font-bold">
        Unauthorized. You must be logged in to access this page
      </p>
    </div>
  );
}
