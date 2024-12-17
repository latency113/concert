import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate for redirection
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [fullName, setFullName] = useState(""); // ชื่อผู้ใช้
  const [email, setEmail] = useState(""); // อีเมล
  const [password, setPassword] = useState(""); // รหัสผ่าน
  const [confirmPassword, setConfirmPassword] = useState(""); // ยืนยันรหัสผ่าน
  const [profile, setProfile] = useState(null); // รูปโปรไฟล์
  const [error, setError] = useState(""); // ข้อความผิดพลาด
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/auth/register",);
      if (response.status == 201) {
        localStorage.setItem("token", response.data.token);
        toast.success("สมัครเป็นสมาชิกสำเร็จ!");
        setTimeout(()=>{
           navigate("/login");
        },500);
        
      }
    } catch (err) {
      toast.error("เกิดข้อผิดพลาดในการสมัครเป็นสมาชิก")
      console.log(err)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          สมัครสมาชิก
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Error message */}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
              ชื่อผู้ใช้
            </label>
            <input
              type="text"
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              อีเมล
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              รหัสผ่าน
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirmPassword">
              ยืนยันรหัสผ่าน
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="profile">
              ใส่รูปโปรไฟล์
            </label>
            <input
              type="file"
              id="profile"
              onChange={(e) => setProfile(e.target.files[0])} // Save file to profile state
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            สมัครสมาชิก
          </button>
        </form>
          <ToastContainer />
        <br />
        <a href="/login" className="hover:text-blue-400 hover:border-b-2 border-gray-500">เป็นสมาชิกแล้ว</a>
      </div>
    </div>
  );
};

export default Register;
