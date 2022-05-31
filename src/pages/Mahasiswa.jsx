import React from "react";
import UserContext from "../lib/UserContext";
export default function Mahasiswa() {
    const {user, loading} = React.useContext(UserContext);  
    return (
        user ? <div></div>
        : (<div className="flex flex-col w-full h-[100vh] items-center justify-center">
            <p className="font-bold">Unauthorized</p>
        </div>)
    )
}