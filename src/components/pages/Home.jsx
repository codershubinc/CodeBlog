import React, { useState, useEffect } from 'react'
import authService from '../../appwriteConfig/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, logout } from '../../../store/features/isAuthSlice'
import LogoutBtn from '../main/header/LogoutBtn'

function Home() {
    const [imgUrl, setImgUrl] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    //updating State in store that isAuth is logged in or not

    useEffect(() => {
        console.log('home called  use r is' )
        authService.getCurrentUser()
            .then((user) => {
                if (user) {
                    dispatch(login({ user }))
                } else {
                    dispatch(logout())
                }
            })
            .finally(() => setLoading(false))
        console.log('dispatch at home called');
    }, [])

    const CreateEmailSession = () => {
        authService.createEmailOtpSession()
            .then((data) => setImgUrl(data))
        console.log(data);
    }



    return (
        <div className='flex flex-col'>
            Please Login
            <button
                onClick={CreateEmailSession}
            >
                Create email session
            </button>
            <LogoutBtn />
            <button>

            </button>
            <img
                src={imgUrl.href}
                className='w-[100px] h-[100px]'
                alt="" />

        </div>
    )
}

export default Home
