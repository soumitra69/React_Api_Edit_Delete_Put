import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  // FETCH SINGLE PRODUCT
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setPrice(data.price);
      });
  }, [id]);

  // UPDATE
  const handleUpdate = async () => {
    await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, price }),
    });

    // 🔥 SEND UPDATED DATA BACK
    navigate("/", {
      state: {
        updatedProduct: {
          id: Number(id),
          title,
          price,
        },
      },
      replace: true,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>

        {/* TITLE */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product title"
          />
        </div>

        {/* PRICE */}
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleUpdate}
            className="w-full sm:w-1/2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Update
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-1/2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
