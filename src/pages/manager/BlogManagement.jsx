import { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance"; // Use a custom Axios instance with auth
import { useForm } from "react-hook-form";
import Sidebar from "../../components/ManagerSidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (editingBlog) {
      reset(editingBlog);
      setValue("content", editingBlog.content || "");
    } else {
      reset();
    }
  }, [editingBlog, reset, setValue]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
      toast.error("Failed to fetch blogs!");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingBlog) {
        await axios.put(`/api/blogs/${editingBlog._id}`, data);
        toast.success("Blog updated successfully!");
      } else {
        await axios.post("/api/blogs", data);
        toast.success("Blog created successfully!");
      }
      reset();
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog", error);
      toast.error("Failed to save blog!");
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/blogs/${blogToDelete._id}`);
      toast.success("Blog deleted successfully!");
      fetchBlogs();
      setOpenDeleteDialog(false);
      reset(); // Reset the form after deleting a blog
    } catch (error) {
      console.error("Error deleting blog", error);
      toast.error("Failed to delete blog!");
    }
  };

  const openDeleteConfirmation = (blog) => {
    setBlogToDelete(blog);
    setOpenDeleteDialog(true);
  };

  const closeDeleteConfirmation = () => {
    setOpenDeleteDialog(false);
    setBlogToDelete(null);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredAndSortedBlogs = blogs
    .filter((blog) => blog.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-4">Quản lý Blog</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-100 p-4 rounded">
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Nội dung"
            className="w-full p-2 border"
          />
          <input
            {...register("image", { required: "Image URL is required" })}
            placeholder="Ảnh URL"
            className="w-full p-2 border"
          />
          {editingBlog?.image && (
            <img
              src={editingBlog.image}
              alt="Blog Preview"
              className="w-32 h-32 object-cover mt-2 rounded-md"
            />
          )}
          <input
            {...register("description", { required: "Description is required" })}
            placeholder="Mô tả"
            className="w-full p-2 border"
          />
          <ReactQuill
            value={getValues("content") || ""}
            onChange={(value) => setValue("content", value, { shouldValidate: true })}
            placeholder="Content"
            className="w-full p-2 border"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingBlog ? "Sửa" : "Tạo"} Blog
          </button>
        </form>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Danh sách Blogs</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Tìm kiếm Blogs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={toggleSortOrder}
                className="bg-gray-500 text-white px-3 py-2 rounded transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
              >
                Sắp xếp {sortOrder === "asc" ? "Z-A" : "A-Z"}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSortedBlogs.map((blog) => (
              <div key={blog._id} className="border p-4 rounded-lg shadow-md">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt="Blog Image"
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                )}
                <h4 className="text-lg font-bold">{blog.title}</h4>
                <p>{blog.description}</p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => openDeleteConfirmation(blog)}
                    className="bg-red-500 text-white px-3 py-1 rounded transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={openDeleteDialog} onClose={closeDeleteConfirmation}>
        <DialogTitle>Xác nhận để x</DialogTitle>
        <DialogContent>Bạn có muốn xóa blog này không</DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation} color="primary">
            Đóng
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BlogManagement;
