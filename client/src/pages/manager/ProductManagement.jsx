import { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useForm } from "react-hook-form";
import Sidebar from "../../components/ManagerSidebar";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products", error);
            toast.error("Failed to load products.");
        }
    };

    const onSubmit = async (data) => {
        try {
            if (editingProduct) {
                await axios.put(`/api/products/${editingProduct._id}`, data);
                toast.success("Product updated successfully!");
            } else {
                await axios.post("/api/products", data);
                toast.success("Product created successfully!");
            }
            reset();
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error("Error saving product", error);
            toast.error("Failed to save product.");
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        reset();
        setTimeout(() => {
            setValue("productName", product.productName || "");
            setValue("price", product.price || "");
            setValue("imgURL", product.imgURL || "");
            setValue("description", product.description || "");
            setValue("stock", product.stock || "");
        }, 0);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/products/${productToDelete._id}`);
            toast.success("Product deleted successfully!");
            fetchProducts();
            setOpenDeleteDialog(false);
        } catch (error) {
            console.error("Error deleting product", error);
            toast.error("Failed to delete product.");
        }
    };

    const openDeleteConfirmation = (product) => {
        setProductToDelete(product);
        setOpenDeleteDialog(true);
    };

    const closeDeleteConfirmation = () => {
        setOpenDeleteDialog(false);
        setProductToDelete(null);
    };

    const filteredProducts = products
        .filter(product => product.productName.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => sortOrder === "asc" ? a.productName.localeCompare(b.productName) : b.productName.localeCompare(a.productName));

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-6 w-full">
                <ToastContainer />
                <h2 className="text-2xl font-bold mb-4">Product Management</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-100 p-4 rounded">
                    <input {...register("productName", { required: true })} placeholder="Product Name" className="w-full p-2 border" />
                    <input {...register("price", { required: true })} placeholder="Price" className="w-full p-2 border" />
                    <input {...register("imgURL")} placeholder="Image URL" className="w-full p-2 border" />
                    {editingProduct?.imgURL && <img src={editingProduct.imgURL} alt="Product Preview" className="w-32 h-32 object-cover mt-2" />}
                    <input {...register("description")} placeholder="Description" className="w-full p-2 border" />
                    <input {...register("stock", { required: true })} placeholder="Stock" className="w-full p-2 border" />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editingProduct ? "Update" : "Create"} Product</button>
                </form>

                <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Product List</h3>
                        <div className="flex space-x-2">
                            <input type="text" placeholder="Search Products" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="p-2 border rounded w-64" />
                            <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")} className="bg-gray-500 text-white px-4 py-2 rounded">
                                {sortOrder === "asc" ? "Sort Z-A" : "Sort A-Z"}
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProducts.map((product) => (
                            <div key={product._id} className="border p-4">
                                {product.imgURL && <img src={product.imgURL} alt="Product" className="w-10 h-10 object-cover mb-2" />}
                                <h4 className="text-lg font-bold">{product.productName}</h4>
                                <p className="text-gray-700">Price: ${product.price}</p>
                                <p className="text-gray-700">Stock: {product.stock}</p>
                                <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded mt-4"><FaEdit /></button>
                                <button onClick={() => openDeleteConfirmation(product)} className="bg-red-500 text-white px-3 py-1 rounded mt-4"><FaTrash /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Dialog open={openDeleteDialog} onClose={closeDeleteConfirmation}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>Are you sure you want to delete this product?</DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteConfirmation} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProductManagement;
