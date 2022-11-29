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
import AllSellers from "../../Pages/Dashboard/AdminDashboard/AllSellers/AllSellers";
import AllReport from "../../Pages/Dashboard/AdminDashboard/AllReport/AllReport";
import AllBuyers from "../../Pages/Dashboard/AdminDashboard/AllBuyers/AllBuyers";
import DashUsers from "../../Pages/Dashboard/AdminDashboard/DashUsers/DashUsers";
import NotForLoggedInUser from "../NotForLoggedInUser/NotForLoggedInUser";
import LayoutCommonDashboard from "../../Layouts/LayoutCommonDashboard/LayoutCommonDashboard";
import DashboardHome from "../../Pages/Dashboard/DashboardHome";
import AdminProducts from "../../Pages/Dashboard/AdminDashboard/AdminProducts/AdminProducts";

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
        element: <NotForLoggedInUser><Login /></NotForLoggedInUser>
      }, {
        path: '/register/',
        element: <NotForLoggedInUser><Registration /></NotForLoggedInUser>
      },
      {
        path: '/blogs/',
        element: <Blogs />
      }, {
        path: '/categories/:id',
        element: <PrivateRoute><Categories /></PrivateRoute>
      }

    ],
  },
  // =======================
  // Shared Dashboard 
  // =======================
  {
    path: "/dashboard",
    element: <PrivateRoute><LayoutCommonDashboard /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoute><DashboardHome /></PrivateRoute>
      },
    ],
  },
  // =======================
  // Seller Dashboard 
  // =======================
  {
    path: "/dashboard/seller",
    element: <PrivateRoute><LayoutSeller></LayoutSeller></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/seller",
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
    element: <PrivateRoute><LayoutBuyer></LayoutBuyer></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dashboard/buyer/',
        element: <PrivateRoute><BuyerHome /></PrivateRoute>
      }
    ]
  },
  // =======================
  // Admin Dashboard 
  // =======================
  {
    path: '/dashboard/admin/',
    element: <PrivateRoute><LayoutAdmin></LayoutAdmin></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dashboard/admin/',
        element: <PrivateRoute><AdminHome /></PrivateRoute>
      }, {
        path: '/dashboard/admin/sellers',
        element: <PrivateRoute><AllSellers /></PrivateRoute>
      }, {
        path: '/dashboard/admin/buyers',
        element: <PrivateRoute><AllBuyers /></PrivateRoute>
      }, {
        path: '/dashboard/admin/users',
        element: <PrivateRoute><DashUsers /></PrivateRoute>
      }, {
        path: '/dashboard/admin/reports',
        element: <PrivateRoute><AllReport /></PrivateRoute>
      }, {
        path: '/dashboard/admin/products',
        element: <PrivateRoute><AdminProducts /></PrivateRoute>
      }

    ]
  },
]);
