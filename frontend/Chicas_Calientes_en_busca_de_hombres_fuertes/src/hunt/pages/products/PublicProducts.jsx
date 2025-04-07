import React, { useState, useEffect, useContext } from "react";
import { loadProducts } from "../../helpers/loadProducts";
import { Navbar } from "../../../ui/components/common/Navbar";
import icons from "../../../assets/icons";
import { AuthContext } from "../../../auth";
import { NavLink } from "react-router-dom";

export const PublicProducts = () => {
  const { logged } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await loadProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-4xl w-full px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full">
              <div className="flex justify-center items-center mb-4">
                <h2 className="text-2xl font-bold mr-4">All Product</h2>
                <img src={icons.icProduct} alt="Banner" className="w-12 h-12" />
              </div>
              <ul className="grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="flex flex-col items-center md:flex-row"
                  >
                    {!logged && (
                      <NavLink
                        to="/productView"
                        className="nav-link text-teal-600 mr-96"
                      >
                        <img
                          src={product.ProductURL}
                          className="w-16 h-16 mb-2 md:mr-2"
                        />
                      </NavLink>
                    )}

                    {logged && (
                      <>
                        <NavLink
                          to="/productViewlog"
                          className="nav-link text-teal-600 mr-96"
                        >
                          <img
                            src={product.ProductURL}
                            className="w-16 h-16 mb-2 md:mr-2"
                          />
                        </NavLink>
                      </>
                    )}

                    <div>
                      <h1>{product.name}</h1>
                      <p>Tage: {product.Tage}</p>
                      <p>Description: {product.ProductDescription}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
