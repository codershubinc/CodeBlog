import React, { useEffect, useState } from 'react'
import authService from '../../appwriteConfig/auth'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Home() {
    const authStatus = useSelector(state => state.auth.status)
    useEffect(() => {

        console.log('authStatus is ', authStatus);


    }, [])
    return (
        <div className='flex flex-col'>
            {authStatus ?
                <button
                onClick={() => authService.logout()}
                >
                    Logout
                </button> :
                <NavLink
                    to={"/login"}
                >Please Login</NavLink>}
        </div>
    )
}

export default Home
