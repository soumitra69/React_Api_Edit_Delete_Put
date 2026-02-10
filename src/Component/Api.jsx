import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Api = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  const itemsPerPage = 10;

  // ✅ FETCH + MERGE UPDATED PRODUCT
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        let fetchedProducts = data.products;

        // 🔥 merge edited product (DummyJSON fix)
        if (location.state?.updatedProduct) {
          const updated = location.state.updatedProduct;

          fetchedProducts = fetchedProducts.map((item) =>
            item.id === updated.id ? { ...item, ...updated } : item,
          );
        }

        setProducts(fetchedProducts);
      });
  }, [location.state]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // EDIT
  const editUser = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        Products
      </h2>

      <button
        onClick={() => {
          setShow(!show);
          setCurrentPage(1);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {show ? "Hide Products" : "Show Products"}
      </button>

      {show && (
        <>
          {/* TABLE WRAPPER FOR RESPONSIVE */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2">ID</th>
                  <th className="border px-3 py-2">Title</th>
                  <th className="border px-3 py-2">Category</th>
                  <th className="border px-3 py-2">Price</th>
                  <th className="border px-3 py-2">Rating</th>
                  <th className="border px-3 py-2">Stock</th>
                  <th className="border px-3 py-2">Delete</th>
                  <th className="border px-3 py-2">Edit</th>
                </tr>
              </thead>

              <tbody>
                {currentProducts.map((item) => (
                  <tr key={item.id} className="text-center hover:bg-gray-50">
                    <td className="border px-3 py-2">{item.id}</td>
                    <td className="border px-3 py-2 font-medium">
                      {item.title}
                    </td>
                    <td className="border px-3 py-2">{item.category}</td>
                    <td className="border px-3 py-2">₹{item.price}</td>
                    <td className="border px-3 py-2">{item.rating}</td>
                    <td className="border px-3 py-2">{item.stock}</td>

                    <td className="border px-3 py-2">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>

                    <td className="border px-3 py-2">
                      <button
                        onClick={() => editUser(item.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
            >
              Prev
            </button>

            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Api;
