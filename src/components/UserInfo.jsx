import React from "react";
import UserContext from "../lib/UserContext";

export default function UserInfo() {
    const { user, loading } = React.useContext(UserContext);
    return (
        (loading) ? (<div className="inline-block p-5">Loading...</div>)
        : (user ? (
            <table>
                <tbody>
                <tr>
                    <td className="font-bold  px-3">Name</td>
                    <td className=" px-3">{user.name}</td>
                </tr>
                <tr>
                    <td className="font-bold  px-3">NIP</td>
                    <td className=" px-3">{user.NIP}</td>
                </tr>
                <tr>
                    <td className="font-bold  px-3">Username</td>
                    <td className=" px-3">{user.username}</td>
                </tr>
                <tr>
                    <td className="font-bold  px-3">Role</td>
                    <td className=" px-3">{user.Role}</td>
                </tr>
                </tbody>
            </table>
            ) : <div className="font-bold">No Logged In User</div>)
    )
}