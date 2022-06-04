import React from "react";
import UserContext from "../../lib/UserContext";
import config from "../../../config.json";
import { useNavigate } from "react-router-dom";
import MataKuliahRow from "../../components/MataKuliahRow";

export default function MataKuliah() {
  const { user } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  const [mataKuliah, setMataKuliah] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    user
      ? fetch(`${config.url}/mata-kuliah`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setMataKuliah(res.data);
            console.log(res);
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
        onClick={() => navigate("/mata-kuliah/create")}
        className="mb-10 cursor-pointer border bg-green-400 hover:bg-green-500 border-black px-4 py-2 font-bold hover:text-white"
      >
        Add Mata Kuliah
      </div>
      {!loading ? (
        <>
          <h1 className="font-bold mb-3">Mata Kuliah</h1>
          <div className="w-[300px] max-h-[500px] overflow-auto lg:w-[750px] lg:max-h-[800px] border-2 border-black">
            <table className="w-full">
              <thead className="text-center">
                <tr>
                  <th className="px-4 py-1 border border-collapse border-black bg-gray-100">
                    No.
                  </th>
                  <th className="px-4 py-1 border border-collapse border-black bg-gray-100">
                    Name
                  </th>
                  <th className="px-4 py-1 border border-collapse border-black bg-gray-100">
                    Code
                  </th>
                  <th className="px-4 py-1 border border-collapse border-black bg-gray-100">
                    Jadwal
                  </th>
                </tr>
              </thead>
              <tbody>
                {mataKuliah.map((item, index) => (
                  <MataKuliahRow mahasiswa={item} idx={index} key={index} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="font-bold">Loading...</div>
      )}
    </div>
  ) : (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center">
      <p className="font-bold text-center p-5">
        Unauthorized. You must be logged in to access this page
      </p>
    </div>
  );
}
