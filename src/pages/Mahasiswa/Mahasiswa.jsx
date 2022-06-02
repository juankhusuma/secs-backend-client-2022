import React from "react";
import UserContext from "../../lib/UserContext";
import config from "../../../config.json";
import MahasiswaRow from "../../components/MahasiswaRow";
import { useNavigate } from "react-router-dom";

export default function Mahasiswa() {
  const { user } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  const [mahasiswa, setMahasiswa] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    user
      ? fetch(`${config.url}/mahasiswa`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setMahasiswa(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          })
      : setLoading(false);
  }, [user]);
  return user ? (
    <div className="mt-16 flex flex-col w-full items-center">
      <div
        onClick={() => navigate("/mahasiswa/create")}
        className="mb-10 cursor-pointer border hover:bg-green-500 border-black px-4 py-2 font-bold hover:text-white"
      >
        Add Mahasiwa
      </div>
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
                NIM
              </th>
              <th className="px-4 py-1 border border-collapse border-black bg-gray-100">
                Mata Kuliah
              </th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((item, index) => (
              <MahasiswaRow mahasiswa={item} idx={index} key={index} />
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
