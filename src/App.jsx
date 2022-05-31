import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import config from "../config.json"
import Home from "./pages/Home";
import UserContext from "./lib/UserContext";
import UserInfo from "./components/UserInfo";
import { Routes } from "react-router-dom";
import Dosen from "./pages/Dosen";
import Page404 from "./pages/404";
import Mahasiswa from "./pages/Mahasiswa";
import MataKuliah from "./pages/MataKuliah";
import Logout from "./pages/Logout";
import { useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DosenDetails from "./pages/DosenDetails";

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    localStorage.getItem("auth-token") ?
      fetch(config.url, { headers: {
        "Authorization": `Bearer ${localStorage.getItem("auth-token")}`
      } }).then(res => res.json()).then(res => {
        setUser(res.user);
        setLoading(false)
      }).catch(err => {
        console.log(err);
      })
    : setLoading(false)
  }, [])
  return (
    <div className="font-mono transition-colors">
      <Router>
        <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/dosen" element={<Dosen/>}/>
            <Route path="/mahasiswa" element={<Mahasiswa/>} />
            <Route path="/mata-kuliah" element={<MataKuliah/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dosen/:id" element={<DosenDetails/>} />
            <Route path="*" element={<Page404/>} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  )
}

export default App
