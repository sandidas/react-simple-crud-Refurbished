import { createBrowserRouter } from "react-router-dom";
import LayoutSeller from "../../Layouts/LayoutSeller/LayoutSeller";
import Main from "../../Layouts/Main";
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
    }, {
        path: '/dashboard/seller/',
        element: <LayoutSeller></LayoutSeller>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard/seller/',
                element: <SellerHome></SellerHome>
            }
        ]
    }, 
]);