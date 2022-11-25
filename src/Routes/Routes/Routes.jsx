import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "../../Layouts/LayoutAdmin/LayoutAdmin";
import LayoutBuyer from "../../Layouts/LayoutBuyer/LayoutBuyer";
import LayoutSeller from "../../Layouts/LayoutSeller/LayoutSeller";
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
import PrivateRoute from "../PrivateRoute/PrivateRoute";


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
        element: <PrivateRoute><LayoutSeller></LayoutSeller></PrivateRoute>,
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
        element: <PrivateRoute><LayoutBuyer></LayoutBuyer></PrivateRoute>,
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
        element: <PrivateRoute><LayoutAdmin></LayoutAdmin></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard/admin/',
                element: <AdminHome />
            }
        ]
    },

]);