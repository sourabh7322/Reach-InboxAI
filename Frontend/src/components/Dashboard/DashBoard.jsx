import React from 'react';
import { useSelector } from 'react-redux';

const DashBoard = () => {
    const { user, isLoading } = useSelector(state => state.auth);

    return (
        <div className='text-2xl font-bold text-center mt-20'>
            {isLoading ? (
                <span>Loading...</span>
            ) : user ? (
                <span>Hello {user.email}, you are now logged in.</span>
            ) : (
                <span>Loading user information...</span>
            )}
        </div>
    );
}

export default DashBoard;
