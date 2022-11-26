import React from 'react';
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
    )
};

export default Loader;