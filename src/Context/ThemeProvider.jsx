import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { checkCurrentTheme, setCurrentTheme } from '../Helpers/DarkLightTheme';

const ThemeProvider = ({ children }) => {
    const [colorScheme, setColorScheme] = useState(false);

    // toggle dark and light mode
    useEffect(() => {
        const currentTheme = checkCurrentTheme();
        if (currentTheme) {
            setColorScheme(currentTheme);
        } else {
            if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
                setColorScheme('dark');
                setCurrentTheme('dark');
            } else {
                setColorScheme('light');
                setCurrentTheme('light');
            }
        }

    }, []);
    // check current device status of dark / light
    useEffect(() => {
        if (colorScheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [colorScheme])

    const toggleColorScheme = () => {
        const currentTheme = checkCurrentTheme()
        if (currentTheme == 'dark') {
            setColorScheme('light');
            setCurrentTheme('light');
        } else {
            setColorScheme('dark');
            setCurrentTheme('dark');
        }
    }

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} >
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                {children}
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export default ThemeProvider;