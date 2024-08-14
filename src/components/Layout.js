import { AccountBox, Add, Home, LogoutOutlined } from '@mui/icons-material';
import { AppBar, Box, Button, CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../widgets/AuthModal';
import BlogPostModal from '../widgets/BlogPostModal';
import Account from './Account';
import BlogList from './BlogList';
import BlogView from './BlogView'; // New component for viewing a blog

const drawerWidth = 240;

const Sidebar = ({ currentScreen, setCurrentScreen, navigate }) => {
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // navigate('/');
        }).catch((error) => {
            console.error("Logout failed", error);
        });
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#F5F5F5', color: '#333' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto', padding: 2 }}>
                <Button variant="outlined" color="primary" fullWidth sx={{ marginBottom: 2 }}>
                    APSEDEC POSTS
                </Button>
                <Divider />
                <List>
                    {[
                        { text: 'Blog Posts', icon: <Home />, component: 'BlogPosts' },
                        { text: 'Account', icon: <AccountBox />, component: 'Account' },
                        { text: 'Logout', icon: <LogoutOutlined />, action: handleLogout },
                    ].map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            selected={currentScreen === item.component}
                            onClick={() => {
                                if (item.action) {
                                    item.action();
                                } else {
                                    setCurrentScreen(item.component);
                                }
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

const Layout = () => {
    const [currentScreen, setCurrentScreen] = useState('BlogPosts');
    const [selectedBlog, setSelectedBlog] = useState(null); // State to store the selected blog
    const [isModalOpen, setModalOpen] = useState(false);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setAuthModalOpen(false); // Close the modal when user is logged in
            } else {
                setAuthModalOpen(true); // Open the modal if the user is not logged in
            }
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, [auth]);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleViewBlog = (blog) => {
        setSelectedBlog(blog);
        setCurrentScreen('BlogView'); // Switch to the blog view screen
    };

    return (
        <>
            <AuthModal open={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
            <Box sx={{ display: 'flex', minHeight: '100vh' }} className='bg-slate-100'>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'linear-gradient(135deg, #6e8efb, #a777e3)' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h5" noWrap component="div">
                                APSEDEC Blogs
                            </Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <Sidebar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} navigate={navigate} />
                    <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh', position: 'relative' }} className='bg-slate-100'>
                        <Toolbar />
                        {currentScreen === 'BlogPosts' && <BlogList onView={handleViewBlog} />} {/* Pass handleViewBlog */}
                        {currentScreen === 'Account' && <Account />}
                        {currentScreen === 'BlogView' && <BlogView blog={selectedBlog} />} {/* Render BlogView with selected blog */}

                        {currentScreen === 'BlogPosts' && (
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Add sx={{ fontSize: '2rem' }} />}
                                sx={{
                                    position: 'absolute',
                                    bottom: 16,
                                    right: 16,
                                    marginBottom: 5,
                                    fontSize: '1.2rem',
                                    padding: '12px 24px',
                                    backgroundColor: !auth.currentUser ? '#cfcfcf' : 'primary.main', // Muted color when not logged in
                                    color: !auth.currentUser ? '#a9a9a9' : '#ffffff', // Muted text color
                                    '&:hover': {
                                        backgroundColor: !auth.currentUser ? '#cfcfcf' : 'primary.dark',
                                    },
                                }}
                                onClick={auth.currentUser ? handleModalOpen : null} // Disable functionality if not logged in
                                disabled={!auth.currentUser} // Disable button if not logged in
                            >
                                New Blog
                            </Button>
                        )}
                        <BlogPostModal open={isModalOpen} onClose={handleModalClose} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Layout;
