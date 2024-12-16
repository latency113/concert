import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [userName, setUserName] = useState(localStorage.getItem("name") || "");

  // ตั้งค่า Base URL สำหรับ Axios
  const api = axios.create({
    baseURL: "http://localhost:4000",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      const fetchUserData = async () => {
        try {
          const res = await api.get(`/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.status === 200 && res.data) {
            setUserInfo(res.data);
          } else {
            setError("ไม่พบข้อมูลผู้ใช้");
          }
        } catch (error) {
          if (error.response?.status === 404) {
            setError("ไม่พบข้อมูลผู้ใช้");
          } else if (error.response?.status === 401) {
            setError("เซสชั่นหมดอายุ กรุณาเข้าสู่ระบบใหม่");
            navigate("/login");
          } else {
            setError("เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [api, id, navigate]);

  if (loading) {
    return <div className="text-center p-6">กำลังโหลดข้อมูล...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-6">
        <p>{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md"
        >
          กลับไปหน้าแรก
        </button>
      </div>
    );
  }

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setUserName("");
    navigate("/login");
    Swal.fire({
      title: "ออกจากระบบ",
      text: "ออกจากระบบสำเร็จ",
      icon: "success",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">โปรไฟล์ของคุณ</h1>
      <div className="mt-4 p-4 bg-white shadow-md rounded-md">
        <div className="text-lg font-semibold">ชื่อผู้ใช้งาน: {userInfo?.name}</div>
        <div className="text-lg font-semibold">อีเมล์: {userInfo?.email}</div>
        <div className="text-lg font-semibold">เบอร์โทรศัพท์: {userInfo?.phone}</div>
        <div className="text-lg font-semibold">
          รูปโปรไฟล์:{" "}
          {userInfo?.picture ? (
            <img
              src={`http://localhost:4000/images/photo/${userInfo.picture}`}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <span>ไม่มีรูปโปรไฟล์</span>
          )}
        </div>
        <button onClick={Logout} className="bg-red-500 text-white p-2 rounded-md mt-4">
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default Profile;
