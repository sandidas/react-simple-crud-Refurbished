import React from 'react';
<<<<<<< HEAD
import { LoadingOverlay } from '@mantine/core';

const Loader = () => {
    return (
        <LoadingOverlay
            loaderProps={{ size: 'md', color: 'pink', variant: 'bars' }}
            overlayOpacity={0}
            overlayBlur={2}
            overlayColor="#c5c5c5"
            visible
        />
=======

const Loader = () => {
    return (
        <div className="flex justify-center items-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">...</span>
        </div>
    </div>
>>>>>>> e8b0713543b5017904102d4f1368b6620ff54b6c
    )
};

export default Loader;