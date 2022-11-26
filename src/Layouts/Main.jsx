<<<<<<< HEAD
import { AppShell, Header } from '@mantine/core';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar/NavigationBar';




const Main = () => {
    return (
        <>
            <AppShell
                header={<Header height={60} p="md"> <NavigationBar /> </Header>}
            >
                <Outlet></Outlet>
            </AppShell>

        </>
    );
=======
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";

const Main = () => {
  return (
    <>
      <Header />
      <div className='dark:bg-gray-800 dark:text-gray-100 px-5 min-h-[calc(100vh-64px)] py-5'>
        <div className='max-w-[95%] mx-auto'>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
>>>>>>> e8b0713543b5017904102d4f1368b6620ff54b6c
};

export default Main;
