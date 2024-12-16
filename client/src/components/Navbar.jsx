import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Removing useParams
import axios from "axios";


const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(localStorage.getItem("name") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  const callApi = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.get("http://localhost:4000/users/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          const { name, id } = res.data; // Adjust according to your API response structure
          if (name && id) {
            localStorage.setItem("name", name);
            localStorage.setItem("userId", id);
            setUserName(name);
            setUserId(id);
          } else {
            console.error("API response is missing 'name' or 'id'");
          }
        } else {
          console.error("API response is empty");
        }
      } else {
        console.error("No token found");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/login"); // Redirect to login on API failure
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      callApi();
    }
  }, [navigate]);

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    setUserName("");
    setUserId("");
    navigate("/login");
    Swal.fire({
      title: "ออกจากระบบ",
      text: "ออกจากระบบสำเร็จ",
      icon: "success",
    });
  };

  return (
    <div className="text-white bg-blue-500 p-5">
      <div className="flex justify-between items-center">
        <div>
          <img
            src="https://www.theconcert.com/assets/images/tcc-main-logo.svg"
            alt="Logo"
          />
        </div>
        <div className="space-x-5">
          <span className="mr-4 text-lg">
            ยินดีต้อนรับ {userName || "ยังไม่ได้เข้าสู่ระบบ"}
          </span>
          {userId && (
            <a href={`/profile/${userId}`} className="hover:underline">
              แก้ไขโปรไฟล์
            </a>
          )}
          <button onClick={Logout} className="hover:border-b-2 pb-[5px]">
            <p className="hover:text-red-500 text-lg">ออกจากระบบ</p>
          </button>
        </div>
      </div>
      <nav>
        <ul className="flex gap-10 justify-center">
          <li><a href="#">หน้าแรก</a></li>
          <li><a href="#">คอนเสิร์ต</a></li>
          <li><a href="#">ศิลปิน</a></li>
          <li><a href="#">สินค้า</a></li>
          <li><a href="#">ข่าวสาร</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
