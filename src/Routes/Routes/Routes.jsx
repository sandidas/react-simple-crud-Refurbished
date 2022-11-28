import { createBrowserRouter } from "react-router-dom";
import LayoutSeller from "../../Layouts/LayoutSeller/LayoutSeller";
import LayoutBuyer from "../../Layouts/LayoutBuyer/LayoutBuyer";
import LayoutAdmin from "../../Layouts/LayoutAdmin/LayoutAdmin";
import Main from "../../Layouts/Main";
import Blogs from "../../Pages/Blogs/Blogs";
import SellerHome from "../../Pages/Dashboard/SellerDashboard/SellerHome/SellerHome";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Registration from "../../Pages/Registration/Registration";
import BuyerHome from "../../Pages/Dashboard/BuyerDashboard/BuyerHome/BuyerHome";
import AdminHome from "../../Pages/Dashboard/AdminDashboard/AdminHome/AdminHome";
import ProductAdd from "../../Pages/Dashboard/SellerDashboard/ProductAdd/ProductAdd";
import PrivateRoute from "../../PrivateRoute/PrivateRoute";
import Categories from "../../Pages/Categories/Categories";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      }, {
        path: '/login/',
        element: <Login />
      }, {
        path: '/register/',
        element: <Registration />
      },
      {
        path: '/blogs/',
        element: <Blogs />
      }, {
        path: '/categories/:id',
        element: <Categories />
      }

    ],
  },
  // =======================
  // Seller Dashboard 
  // =======================
  {
    path: "/dashboard/seller/",
    element: <PrivateRoute><LayoutSeller></LayoutSeller></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/seller/",
        element: <PrivateRoute><SellerHome /></PrivateRoute>
      }, {
        path: "/dashboard/seller/product/add",
        element: <PrivateRoute><ProductAdd /></PrivateRoute>
      }
    ],
  },
  // =======================
  // Buyer Dashboard 
  // =======================
  {
    path: '/dashboard/buyer/',
    element: <LayoutBuyer></LayoutBuyer>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dashboard/buyer/',
        element: <BuyerHome />
      }
    ]
  },
  // =======================
  // Admin Dashboard 
  // =======================
  {
    path: '/dashboard/admin/',
    element: <LayoutAdmin></LayoutAdmin>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dashboard/admin/',
        element: <AdminHome />
      }
    ]
  },
]);
