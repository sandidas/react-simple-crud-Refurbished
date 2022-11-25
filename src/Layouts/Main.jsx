import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";

const Main = () => {
  return (
    <>
      <Header />
      <div className='dark:bg-gray-800 dark:text-gray-100 backdrop-blur-2xl transition-colors duration-500 px-5 min-h-[calc(100vh-64px)] py-5'>
        <div className='max-w-[95%] mx-auto'>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Main;
