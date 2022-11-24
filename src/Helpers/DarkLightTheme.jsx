export const setCurrentTheme = (theme) => {
    localStorage.setItem('isDarkMode', theme)
}

export const checkCurrentTheme = () => {
    return localStorage.getItem('isDarkMode')
}
// Sounds Good