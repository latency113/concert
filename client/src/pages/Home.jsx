import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate , useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const callApi = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:4000/products/');
      const data_format = res.data || [];
      setData(data_format);
    } catch (error) {
      setError("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      callApi();
    }
  }, [navigate]);

  if (loading) return <div className="text-9xl text-center">Loading...</div>;
  if (error) return <div>{error}</div>;


  return (
    <div className="">
      <Navbar/>
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 min-h-screen">
      <div className="px-[350px]">
        <h1 className="text-7xl text-center pt-5 text-white">TEST ระบบ</h1>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-6 p-6">
            {data.map((e) => (
              <CourseCard 
                key={e.id} {...e}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

const CourseCard = (props) => {
  return (
    <div className="product-card p-4 bg-white shadow-lg rounded-lg">
      <div className="w-full h-48 overflow-hidden rounded-md">
        <img src={props.pictureUrl} alt={props.name} className="w-full h-full object-cover" />
      </div>
      <div className="mt-4 font-bold text-xl">{props.name}</div>
      <div className="text-xl text-gray-700">ราคา {props.price} บาท</div>
      <div className="text-sm text-gray-500 mt-2">{props.description}</div>
    </div>
  );
};

export default Home;
