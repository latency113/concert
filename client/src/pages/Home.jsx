import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
      const res = await axios.get("http://localhost:4000/products/");
      const data_format = res.data || [];
      setData(data_format);
    } catch (error) {
      setError("Error fetching data.");
    } finally {
      setLoading(false);
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

  if (loading) return <div className="text-9xl text-center">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <main className="bg-gradient-to-r from-slate-900 to-slate-800 min-h-screen flex items-center justify-center px-4">
        <div className="container max-w-5xl mx-auto flex flex-col items-center">
          {/* Logo Section */}
          <div className="flex justify-center p-4">
            <img
              src="https://www.theconcert.com/assets/images/tcc-main-logo.svg"
              className="w-[150px] sm:w-[200px] md:w-[300px] lg:w-[350px]"
              alt="The Concert Logo"
            />
          </div>

          {/* Heading Section */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center font-semibold mt-4">
            แนะนำสำหรับคุณ
          </h2>

          {/* Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 w-full">
            {data?.length > 0 ? (
              data.map((e) => <ConcertCard key={e.id} {...e} />)
            ) : (
              <p className="text-white text-center col-span-full">
                No courses available
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ConcertCard = (props) => {
  return (
    <div className="product-card p-4 bg-white shadow-lg rounded-lg">
      <div className="w-full h-48 overflow-hidden rounded-md">
        <img
          src={props.pictureUrl}
          alt={props.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-4 font-bold text-xl">{props.name}</div>
      <div className="text-xl text-gray-700">ราคา {props.price} บาท</div>
      <div className="text-sm text-gray-500 mt-2">{props.description}</div>
    </div>
  );
};

export default Home;
