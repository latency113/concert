import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Logout = () => {
    toast.success("ออกจากระบบสำเร็จ")
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };


const Navbar = () => {
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
          ยินดีต้อนรับ
        </span>
        <button onClick={Logout} className="hover:border-b-2 pb-[5px]">
          <p className="hover:text-red-500 text-lg">ออกจากระบบ</p>
        </button>
      </div>
    </div>
    <nav>
      <ul className="flex gap-10 justify-center">
        <li><a href="/">หน้าแรก</a></li>
        <li><a href="/concert">คอนเสิร์ต</a></li>
        <li><a href="/artist">ศิลปิน</a></li>
        <li><a href="/products">สินค้า</a></li>
        <li><a href="/news">ข่าวสาร</a></li>
      </ul>
    </nav>
    <ToastContainer />
  </div>
  )
}

export default Navbar
