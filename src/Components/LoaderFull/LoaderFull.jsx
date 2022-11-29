import { Loader, LoadingOverlay } from '@mantine/core';
import React from 'react';

const LoaderFull = () => {
    return (
        // <Loader classNames='fixed left-0 top-0' variant='bars' color="white" className='mx-auto min-h-[-calc(100vh_-_681)] sm:min-h-[calc(100vh_-_659px)] md:min-h-[calc(100vh_-_601px)]' />
        <LoadingOverlay
            loaderProps={{ size: 'md', color: 'pink', variant: 'bars' }}
            overlayOpacity={0}
            overlayBlur={2}
            overlayColor="#c5c5c5"
            visible
        />
    );
};

export default LoaderFull;