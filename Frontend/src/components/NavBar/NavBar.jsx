import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {
    const { isAuthenticated, isLoading } = useSelector(state => state.auth);
    const { loginWithRedirect, logout } = useAuth0();

    // Debugging output
    console.log("Auth State:", { isAuthenticated, isLoading });

    return (
        <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
            {isLoading ? (
                <div>Loading...</div>
            ) : isAuthenticated ? (
                <button
                    className='text-sm text-blue-600 underline'
                    onClick={() => logout({ returnTo: import.meta.env.VITE_RETURN_URL })}
                >
                    Logout
                </button>
            ) : (
                <button
                    className='text-sm text-blue-600 underline'
                    onClick={() => loginWithRedirect()}
                >
                    Register / Log In
                </button>
            )}
        </nav>
    );
};

export default NavBar;
