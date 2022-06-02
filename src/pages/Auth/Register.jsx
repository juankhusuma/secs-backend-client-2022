import React from "react";
import config from "../../../config.json";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [name, setName] = React.useState("");
  const [NIP, setNIP] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <div>
      <div className="flex w-full h-[100vh] items-center justify-center flex-col">
        <h1 className="font-bold">Register</h1>
        <p className="text-red-500 mt-3 mb-3">{error ? `${error}` : ""}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetch(`${config.url}/auth/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                NIP,
                username,
                password,
              }),
            }).then((res) =>
              res.status === 200
                ? navigate("/login")
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
            <label className="text-gray-700" htmlFor="NIP">
              NIP
            </label>
            <input
              required
              className="px-4 py-2 border border-black focus:border-2  flex flex-col"
              name="NIP"
              type="text"
              value={NIP}
              onChange={(e) => setNIP(e.target.value)}
              placeholder="Insert NIP here..."
            />
          </div>
          <div className="px-4 py-2  flex flex-col">
            <label className="text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              required
              className="px-4 py-2 border border-black focus:border-2  flex flex-col"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Insert username here..."
            />
          </div>
          <div className="px-4 py-2  flex flex-col">
            <label className="text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              required
              className="px-4 py-2 border border-black focus:border-2  flex flex-col"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Insert password here..."
            />
          </div>
          <input
            className="px-4 py-2 border-2 inline-block mt-8 border-black hover:bg-black hover:text-white"
            type="submit"
            value="Submit"
          />
        </form>
        <p>
          Got an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            login here.
          </Link>
        </p>
      </div>
    </div>
  );
}
