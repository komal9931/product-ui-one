import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./common/Header";
import Home from "./components/Home";
import Products from "./components/Products";
import Catalog from "./components/Catalog";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "products/:id",
          element: <Products />,
        },
        {
          path: "/catlog",
          element: <Catalog />,
        },
      ],
    },
  ]);
  return (
    <>
      {/* <Header />
      <Home />
      <Products /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
