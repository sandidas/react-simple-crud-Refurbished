import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import SmallSpinner from '../Spinner/SmallSpinner'

const UserNavigation = ({ uSettings, setUSettings, handleUserSignout }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <SmallSpinner />
    }
    return (
        <>
            <aside className="w-80 absolute right-0 top-16 z-20 shadow-md shadow-slate-200 dark:shadow-slate-600 rounded-md" onClick={() => setUSettings(!uSettings)}>
                <div className="divide-y divide-gray-700 dark:bg-gray-900 dark:text-gray-100 bg-white shadow-sm">
                    <ul className="pt-2 pb-4 space-y-2 text-sm">
                        <li>
                            <div className="py-4 space-y-1 flex flex-col items-center">
                                {
                                    user?.photoURL &&

                                    <img src={user?.photoURL} alt="" className="w-14 h-14 rounded-full dark:bg-gray-500" />

                                }

                                <h2 className="text-lg font-semibold overflow-hidden"> {user?.displayName ? user?.displayName : "Guest"} </h2>
                                <p className='text-gray-500'>{user?.email}</p>
                                <span className="flex items-center space-x-1">
                                    <Link rel="noopener noreferrer" to="/" className="text-xs hover:underline dark:text-gray-400">View profile</Link>
                                </span>

                            </div>
                        </li>
                    </ul>
                    <ul className="text-sm">
                        <li>
                            <button onClick={handleUserSignout} className="flex items-center pl-8 py-5 space-x-3  w-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                    <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                    <rect width="32" height="64" x="256" y="232"></rect>
                                </svg>
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
            {/* lg:min-h-[calc(100vh_-_347px)] */}
            <div className='w-full top-0 h-full overflow-hidden  fixed z-10' onClick={() => setUSettings(!uSettings)}>
            </div>
        </>
    );
};

export default UserNavigation;