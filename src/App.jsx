import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import config from "../config.json";
import Home from "./pages/Home";
import UserContext from "./lib/UserContext";
import { Routes } from "react-router-dom";
import Dosen from "./pages/Dosen/Dosen";
import Page404 from "./pages/404";
import Mahasiswa from "./pages/Mahasiswa/Mahasiswa";
import MataKuliah from "./pages/MataKuliah/MataKuliah";
import Logout from "./pages/Auth/Logout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CreateMahasiswa from "./pages/Mahasiswa/CreateMahasiswa";
import DosenDetails from "./pages/Dosen/DosenDetails";
import MahasiswaDetails from "./pages/Mahasiswa/MahasiswaDetails";
import CreateMataKuliah from "./pages/MataKuliah/CreateMataKuliah";
import MataKuliahDetails from "./pages/MataKuliah/MataKuliahDetails";
import DeleteDosen from "./pages/Dosen/Delete";
import DeleteMahasiswa from "./pages/Mahasiswa/Delete";
import DeleteMataKuliah from "./pages/MataKuliah/Delete";

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    localStorage.getItem("auth-token")
      ? fetch(config.url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setUser(res.user);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          })
      : setLoading(false);
  }, []);
  return (
    <div className="font-mono transition-colors">
      <Router>
        <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dosen" element={<Dosen />} />
            <Route path="/mahasiswa" element={<Mahasiswa />} />
            <Route path="/mata-kuliah" element={<MataKuliah />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dosen/:id" element={<DosenDetails />} />
            <Route path="/mahasiswa/create" element={<CreateMahasiswa />} />
            <Route path="/mahasiswa/:id" element={<MahasiswaDetails />} />
            <Route path="/mata-kuliah/create" element={<CreateMataKuliah />} />
            <Route path="/mata-kuliah/:id" element={<MataKuliahDetails />} />
            <Route path="/dosen/:id/delete" element={<DeleteDosen />} />
            <Route path="/dosen/:id/delete" element={<DeleteDosen />} />
            <Route path="/mahasiswa/:id/delete" element={<DeleteMahasiswa />} />
            <Route
              path="/mata-kuliah/:id/delete"
              element={<DeleteMataKuliah />}
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <footer className="text-center mt-20 py-1 bottom-0 relative">
            Made with <span className="animate-pulse"> ❤ </span>by Juan
            Dharmananda Khusuma
          </footer>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
