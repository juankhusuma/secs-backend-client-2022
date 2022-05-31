import React from "react";
import { useNavigate, Link } from "react-router-dom";
import config from "../../config.json"
import UserContext from "../lib/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {setUser} = React.useContext(UserContext)
    return (
        <div>
            <div className="flex w-full h-[100vh] items-center justify-center flex-col">
                <h1 className="font-bold">Login</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    fetch(`${config.url}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username,
                            password,
                        }),
                    }).then((res) => res.json()).then(data => {
                        localStorage.setItem("auth-token", data.token);
                        setUser(data.user);
                        navigate("/")
                    });
                }} className="flex flex-col">
                    <div className="px-4 py-2  flex flex-col">
                        <label className="text-gray-700" htmlFor="username">Username</label>
                        <input required className="px-4 py-2 border border-black focus:border-2  flex flex-col" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Insert username here..." />
                    </div>
                    <div className="px-4 py-2  flex flex-col">
                        <label className="text-gray-700" htmlFor="username">Password</label>
                        <input required className="px-4 py-2 border border-black focus:border-2  flex flex-col" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Insert password here..." />
                    </div>
                    <input className="px-4 py-2 border-2 inline-block mt-8 border-black hover:bg-black hover:text-white" type="submit" value="Submit" />
                </form>
                <p>New user? <Link to="/register" className="text-blue-600 underline">register here.</Link></p>
            </div>
        </div>
    )
}