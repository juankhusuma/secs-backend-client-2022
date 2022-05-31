import { useNavigate } from "react-router-dom";

export default function DosenRow({ dosen, idx }) {
    const navigate = useNavigate();
    const {id, name, NIP, username, Role} = dosen;
    return (
        <>
            <tr onClick={() => {
                navigate("/dosen/" + id)
            }} className="hover:bg-stone-200 cursor-pointer">
                <td className="px-2 border border-collapse border-black text-center">{idx + 1}</td>
                <td className="px-2 border border-collapse border-black ">{name}</td>
                <td className="px-2 border border-collapse border-black ">{NIP}</td>
                <td className="px-2 border border-collapse border-black ">{username}</td>
                <td className="px-2 border border-collapse border-black ">{Role}</td>
            </tr>
        </>
    )
}