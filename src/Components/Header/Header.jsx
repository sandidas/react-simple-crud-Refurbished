import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg'
import { AuthContext } from '../../Context/UserContext';
import LoggedInUser from './LoggedInUser/LoggedInUser';
import MenuLinks from './MenuLinks';
import SwittchDarkLight from './SwittchDarkLight';
import UserNavigation from './UserNavigation';


const Header = () => {
    const { user, userSignout, showAlert, setLoading } = useContext(AuthContext);
    const [mobNavigation, setMobNavigation] = useState(false);
    const [uSettings, setUSettings] = useState(false); // user dropdown navigation
    const handleMobileNavigation = () => setMobNavigation(!mobNavigation);
    const navigate = useNavigate();
    const handleUserSignout = () => {
        userSignout()
            .then(() => {
                setLoading(false);
                showAlert('success', 'Log out successfully');
                return navigate('/login');
            })
            .catch((error) => {
                setLoading(false);
                const errors = error.message + ' | ' + error.code;
                showAlert('error', errors);
                console.log('error');
                navigate('/');
            })

    }

    return (
        <>

            {/* Logged In user Navigation container  uSettings, setUSettings */}
            {user?.uid && uSettings &&
                <UserNavigation handleUserSignout={handleUserSignout} uSettings={uSettings} setUSettings={setUSettings}  > </UserNavigation>
            }

            {/* Mobile Navigation container  */}
            <div className={mobNavigation ? 'relative' : 'hidden relative'} onClick={() => setMobNavigation(!mobNavigation)}>
                <div className="absolute pt-16 top-[0px] right-0 content-center p-3 space-y-2 w-full z-50  dark:bg-gray-900 dark:text-gray-100 bg-gray-200">
                    <div className="p-2 space-x-4">

                    </div>

                    <div className="divide-y divide-gray-700">
                        <ul className="pt-2 pb-4 space-y-6">
                            <MenuLinks />
                        </ul>
                        <ul className="pt-4 pb-2 space-y-6">
                        </ul>
                    </div>
                </div>
            </div>


            <header className='dark:bg-gray-900 dark:text-gray-100 bg-slate-100 top-0 sticky backdrop-blur-2xl transition-colors duration-500 z-50'>
                <div className="flex justify-between h-16 mx-auto w-[97%]">

                    <div className='flex justify-between items-center content-center space-x-8'>
                        <Link to='/' className="flex gap-2 items-center font-bold  text-2xl"><img src={Logo} alt="" width="32px" height="32px" /> WEBSITE TITLE</Link>

                        {/* Large navigations  */}
                        <ul className="hidden space-x-3 lg:flex items-center uppercase">
                            <MenuLinks></MenuLinks>
                        </ul>

                    </div>

                    {/* right  side  */}
                    <div className='flex justify-between items-center content-center space-x-5'>
                        {/* Dashboard Button  */}
                        <LoggedInUser />

                        {/* Theme Switcher  */}
                        <SwittchDarkLight></SwittchDarkLight>
                        {/* mobile navigation toggler lg:hidden  */}
                        <button className="p-4 toggler lg:hidden" onClick={handleMobileNavigation}>
                            {!mobNavigation ?
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width={28} height={28} x={0} y={0} viewBox="0 0 512 512" style={{ "enableBackground": "new 0 0 128 128" }} xmlSpace="preserve"><g><path d="m128 102.4c0-14.138 11.462-25.6 25.6-25.6h332.8c14.138 0 25.6 11.462 25.6 25.6s-11.462 25.6-25.6 25.6h-332.8c-14.138 0-25.6-11.463-25.6-25.6zm358.4 128h-460.8c-14.138 0-25.6 11.463-25.6 25.6 0 14.138 11.462 25.6 25.6 25.6h460.8c14.138 0 25.6-11.462 25.6-25.6 0-14.137-11.462-25.6-25.6-25.6zm0 153.6h-230.4c-14.137 0-25.6 11.462-25.6 25.6 0 14.137 11.463 25.6 25.6 25.6h230.4c14.138 0 25.6-11.463 25.6-25.6 0-14.138-11.462-25.6-25.6-25.6z" fill="#b95555" data-original="#000000" /></g></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#b95555" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            }
                        </button>

                        {user?.uid &&
                            <button onClick={() => setUSettings(!uSettings)}>
                                {user?.photoURL ?
                                    <img src={user?.photoURL ? user?.photoURL : ""} alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                    </svg>

                                }
                            </button>
                        }
                    </div>


                </div>
            </header>
        </>
    );
};

export default Header;