import React from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../lib/UserContext";
import config from "../../../config.json";
import { useParams } from "react-router-dom";

export default function DeleteMahasiswa() {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);
  const [error, setError] = React.useState("");
  const { id } = useParams();

  return user ? (
    <div className="flex w-full h-[100vh] items-center justify-center flex-col">
      <h1 className="font-bold">
        {error ? "An error occured. Retry?" : "Are you sure"}?
      </h1>
      <div className="flex">
        <div
          onClick={() => {
            fetch(`${config.url}/mahasiswa/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
              },
            }).then((res) =>
              res.status === 200
                ? navigate(`/mahasiswa`)
                : res.json().then((res) => {
                    setError(res.error.message);
                  })
            );
          }}
          className="border px-4 py-2 select-none  border-black hover:text-white bg-red-500 hover:bg-red-600 hover:font-bold  mx-2 my-5"
        >
          Yes
        </div>
        <div
          onClick={() => navigate(`/mahasiswa/${id}`)}
          className="border px-4 py-2 select-none  border-black hover:text-white bg-green-500 hover:bg-green-600 hover:font-bold  mx-2 my-5"
        >
          No
        </div>
      </div>
    </div>
  ) : (
    <p className="font-bold text-center p-5">
      Unauthorized. Only user with ADMIN privilidge is allowed
    </p>
  );
}
