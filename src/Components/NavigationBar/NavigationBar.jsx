import React from 'react';
import { createStyles, Group, Burger, Paper, Transition, Button, MediaQuery } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import HeaderPrivateItems from './HeaderPrivateItems';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import SwitchDarkLight from './SwitchDarkLight';
import { AuthContext } from '../../Context/UserContext';

// style 
const HEADER_HEIGHT = 60;
const useStyles = createStyles((theme) => ({
    root: {
        position: 'relative',
        zIndex: 1,
    },

    dropdown: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: 'hidden',

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    href: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        [theme.fn.smallerThan('sm')]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    hrefActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));
// # style 
const activeClass = "bg-white"

const NavigationBar = ({ sideBarOpened, setSideBarOpened }) => {
    const { userRole, user, userSignOut, setLoading } = useContext(AuthContext);
    const location = useLocation();
    const [opened, { toggle, close }] = useDisclosure(false);
    const { classes, cx } = useStyles();

    const navigate = useNavigate();

    const handleUserSignout = () => {
        userSignOut()
            .then(() => {
                // setLoading(false);
                toast.success('Log out successfully');
                return navigate('/login');
            })
            .catch((error) => {
                // setLoading(false);
                const errors = error.message + ' | ' + error.code;
                toast.error(errors);
                console.log('error');
                navigate('/');
            })
    }

    const links = [
        { label: 'Home', link: '/' },
        { label: 'Blogs', link: '/blogs' },
    ];

    const items = links.map((link) => (
        <NavLink
            key={link.label}
            to={link.link}
            className={cx(classes.href, { [classes.hrefActive]: location.pathname === link.link })}
            onClick={close}
        >
            {link.label}
        </NavLink>
    ));

    return (
        <>
            <div className='flex justify-between items-center'>
                <Link className='text-xl lg:text-2xl font-bold' to='/'>Best-Refurbished</Link>
                {/* left sidebar show or hide  */}
                <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                    <Burger
                        opened={sideBarOpened}
                        onClick={() => setSideBarOpened((o) => !o)}
                    />
                </MediaQuery>
                {/* # left sidebar show or hide  */}
                {/* desktop navigation  */}
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <div className='flex items-center'>
                    <SwitchDarkLight />
                    
                    {/* Menu items for logged in users only  */}
                    {user?.uid && <HeaderPrivateItems userRole={userRole} user={user} handleUserSignout={handleUserSignout} />}
                    {!user?.uid && <Button variant="default" component={Link} to='/login/'  > login </Button>}
                </div>
                {/* Mobile Navigation  */}
                <Burger opened={opened} onClick={toggle} className={classes.burger} size="md" />
                <Transition transition="pop-top-right" duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            {items}
                        </Paper>
                    )}
                </Transition>
                {/* # Mobile Navigation  */}
            </div>
        </>
    );
};

export default NavigationBar;