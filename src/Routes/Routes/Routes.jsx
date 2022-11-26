import { createBrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import LayoutSeller from "../../Layouts/LayoutSeller/LayoutSeller";
import LayoutBuyer from "../../Layouts/LayoutBuyer/LayoutBuyer";
import LayoutAdmin from "../../Layouts/LayoutAdmin/LayoutAdmin";
import Main from "../../Layouts/Main";
import Blogs from "../../Pages/Blogs/Blogs";
import SellerHome from "../../Pages/Dashboard/SellerDashboard/SellerHome/SellerHome";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Guest/Home/Home";
import Login from "../../Pages/Login/Login";
import Registration from "../../Pages/Registration/Registration";
import BuyerHome from "../../Pages/Dashboard/BuyerDashboard/BuyerHome/BuyerHome";
import AdminHome from "../../Pages/Dashboard/AdminDashboard/AdminHome/AdminHome";

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
      }
    ],
  },
  // =======================
  // Seller Dashboard 
  // =======================
  {
    path: "/dashboard/seller/",
    element: <LayoutSeller></LayoutSeller>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/seller/",
        element: <SellerHome />
      },
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
=======
import DashboardLayout from "../../Layouts/DashboardLayout";
import Main from "../../Layouts/Main";
import AdminHome from "../../Pages/Dashboard/AdminDashboard/AdminHome/AdminHome";
import BuyerHome from "../../Pages/Dashboard/BuyerDashboard/BuyerHome/BuyerHome";
import SellerHome from "../../Pages/Dashboard/SellerDashboard/SellerHome/SellerHome";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import ForgetPassword from "../../Pages/ForgetPassword/ForgetPassword";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Registration from "../../Pages/Registration/Registration";
import NotForLoggedInUser from "../../PrivateRoute/NotForLoggedInUser";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            }, {
                path: '/login/',
                element: <NotForLoggedInUser><Login></Login></NotForLoggedInUser>,
            }, {
                path: '/register/',
                element: <NotForLoggedInUser><Registration /></NotForLoggedInUser>,
            }
            , {
                path: '/forget-password',
                element: <ForgetPassword />,
            }

        ]
    },
    // =======================
    // Seller Dashboard 
    // =======================
    {
        path: '/dashboard/seller/',
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard/seller/',
                element: <SellerHome />
            }
        ]
    },
    // =======================
    // Buyer Dashboard 
    // =======================
    {
        path: '/dashboard/buyer/',
        element: <DashboardLayout></DashboardLayout>,
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
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard/admin/',
                element: <AdminHome />
            }
        ]
    },

]);
>>>>>>> e8b0713543b5017904102d4f1368b6620ff54b6c
