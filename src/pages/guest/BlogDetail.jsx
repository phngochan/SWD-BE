import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  useEffect(() => {
    setCart(cartData);
  }, []);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        setRelatedBlogs(res.data.slice(0, 2)); // Get 2 related blogs
      } catch (err) {
        console.error("Error fetching related blogs:", err);
      }
    };

    fetchRelatedBlogs();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (!blog) return <p className="text-center text-red-500 mt-10">Blog not found.</p>;



  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* Header */}
      <Navbar cart={cart} setCart={setCart} /> {/* Pass setCart to Navbar */}

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          className="bg-[#075E76] hover:bg-[#06455a] text-white py-2 px-4 rounded mb-4"
          onClick={() => navigate('/blog')}
        >
          ← Quay lại
        </button>
        <h1 className="text-4xl font-bold text-[#075E76]">{blog.title}</h1>
        <p className="text-gray-500 text-sm mt-2">{new Date(blog.createdDate).toLocaleDateString()}</p>

        <img src={blog.image} alt={blog.title} className="w-full mt-6 rounded-lg shadow-lg" />

        <div
          className="mt-6 text-gray-700 text-lg leading-relaxed tracking-wide"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Related Blogs */}
        <h2 className="text-3xl font-bold text-[#075E76] mt-12">Thông tin và sự kiện liên quan :</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {relatedBlogs.map((item) => (
            <Link key={item._id} to={`/blog/${item._id}`} className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-lg font-semibold text-[#075E76] mt-3">{item.title}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogDetail; 