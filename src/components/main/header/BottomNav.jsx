import React from 'react';
import { NavLink } from 'react-router-dom';

function BottomNav() {
    return (
        <div
            className='BottomNavBar mx-1  fixed bottom-2 w-screen h-max p-1 rounded-[10px] bg-[#212121] text-white flex  justify-between items-center transition-all z-10'
        >
            {/* Navigation Links */}
            <NavLink to="/">
                {({ isActive }) => (
                    <>
                        <img
                            src={
                                isActive
                                    ? 'https://cdn-icons-png.flaticon.com/512/1946/1946436.png '
                                    : 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png '
                            }
                            className='w-[40px] h-[40px] invert'
                            alt="Home"
                        />
                    </>
                )}
            </NavLink>
            <NavLink to="/post">
                {({ isActive }) => (
                    <>
                        <img
                            src={
                                isActive
                                    ? 'https://cdn-icons-png.flaticon.com/512/3214/3214843.png'
                                    : 'https://cdn-icons-png.flaticon.com/512/3214/3214748.png'
                            }
                            className='w-[40px] h-[40px] invert'
                            alt="All Posts"
                        />
                    </>
                )}
            </NavLink>
            <NavLink to="/dashboard">
                {({ isActive }) => (
                    <>
                        <img
                            src={
                                isActive
                                    ? '   https://cdn-icons-png.flaticon.com/512/5187/5187508.png '
                                    : '   https://cdn-icons-png.flaticon.com/512/5191/5191354.png '
                            }
                            className='w-[40px] h-[40px] invert'
                            alt="dashboard"
                        />
                    </>
                )}
            </NavLink>
        </div>
    );
}

export default BottomNav;