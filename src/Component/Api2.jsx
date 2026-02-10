import React, { useEffect, useState } from "react";

const Api2 = () => {
  const [carts, setCarts] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    fetch("https://dummyjson.com/carts")
      .then((res) => res.json())
      .then((data) => setCarts(data.carts));
  }, []);

  // 🔹 Flatten carts → products
  const allProducts = carts.flatMap((cart) =>
    cart.products.map((item) => ({
      ...item,
      cartId: cart.id,
    })),
  );

  // 🔹 DELETE PRODUCT (FIXED)
  const handleDelete = async (productId, cartId) => {
    try {
      // Dummy API delete (simulation)
      await fetch(`https://dummyjson.com/products/${productId}`, {
        method: "DELETE",
      });

      // 🔥 Update carts state
      setCarts((prevCarts) =>
        prevCarts.map((cart) =>
          cart.id === cartId
            ? {
                ...cart,
                products: cart.products.filter(
                  (product) => product.id !== productId,
                ),
              }
            : cart,
        ),
      );
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // 🔹 Pagination logic
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = allProducts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        Cart Products
      </h2>

      <button
        onClick={() => {
          setShow((prev) => !prev);
          setCurrentPage(1);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {show ? "Hide Product" : "Show Product"}
      </button>

      {show && (
        <>
          {/* RESPONSIVE TABLE WRAPPER */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2">Cart ID</th>
                  <th className="border px-3 py-2">Image</th>
                  <th className="border px-3 py-2">Product ID</th>
                  <th className="border px-3 py-2">Title</th>
                  <th className="border px-3 py-2">Price</th>
                  <th className="border px-3 py-2">Qty</th>
                  <th className="border px-3 py-2">Total</th>
                  <th className="border px-3 py-2">Discount %</th>
                  <th className="border px-3 py-2">Discounted Total</th>
                  <th className="border px-3 py-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentProducts.map((item) => (
                  <tr
                    key={`${item.cartId}-${item.id}`}
                    className="text-center hover:bg-gray-50"
                  >
                    <td className="border px-3 py-2">{item.cartId}</td>

                    <td className="border px-3 py-2">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-14 h-14 object-cover rounded mx-auto"
                      />
                    </td>

                    <td className="border px-3 py-2">{item.id}</td>
                    <td className="border px-3 py-2 font-medium">
                      {item.title}
                    </td>
                    <td className="border px-3 py-2">${item.price}</td>
                    <td className="border px-3 py-2">{item.quantity}</td>
                    <td className="border px-3 py-2">${item.total}</td>
                    <td className="border px-3 py-2 text-orange-600 font-semibold">
                      {item.discountPercentage}%
                    </td>
                    <td className="border px-3 py-2 text-green-600 font-semibold">
                      ${item.discountedTotal}
                    </td>

                    <td className="border px-3 py-2">
                      <button
                        onClick={() => handleDelete(item.id, item.cartId)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
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
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Prev
            </button>

            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Api2;
