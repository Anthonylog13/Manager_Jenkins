import { Routes, Route } from "react-router-dom";
import { LoginPage, RegisterPage } from "../auth";
import { PublicRouter } from "./PublicRouter";
import { PrivateRouter } from "./PrivateRouter";
import { ProductHuntRouter } from "../hunt/router/ProductHuntRouter";
import { ProductHome } from "../hunt/pages/ProductHome";
import { ProductView } from "../hunt/pages/products/ProductView";
import { ProductProvider, ReviewProvider } from "../hunt/context";
import { PublicProducts } from "../hunt/pages/products/PublicProducts";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <PublicRouter>
              <ProductHome />
            </PublicRouter>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRouter>
              <LoginPage />
            </PublicRouter>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRouter>
              <RegisterPage />
            </PublicRouter>
          }
        />
        <Route
          path="/publicProducts"
          element={
            <PublicRouter>
              <PublicProducts />
            </PublicRouter>
          }
        />

        <Route
          path="/productView"
          element={
            <PublicRouter>
              <ReviewProvider>
                <ProductView />
              </ReviewProvider>
            </PublicRouter>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRouter>
              <ProductProvider>
                <ReviewProvider>
                  <ProductHuntRouter />
                </ReviewProvider>
              </ProductProvider>
            </PrivateRouter>
          }
        />
      </Routes>
    </>
  );
};
