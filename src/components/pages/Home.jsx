import React, { useState, useEffect } from 'react'
import authService from '../../appwriteConfig/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, logout } from '../../../store/features/isAuthSlice'
import LogoutBtn from '../main/header/LogoutBtn'
import VerifyUserEmailLink from '../../appwriteConfig/auth/VerifyUserEmailLink'

function Home() {
    const [imgUrl, setImgUrl] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [user, setUser] = useState([])

    //updating State in store that isAuth is logged in or not

    useEffect(() => {
        console.log('home called  use r is')
        authService.getCurrentUser()
            .then((user) => {
                if (user) {
                    setUser(user)
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
        // console.log(data);
    }


    const GoogleAuth = () => {
        try {
            const data = authService.googleAccVerify()
            const queryParams = new URLSearchParams(window.location.search);
            const accessToken = queryParams.get('id_token');
            console.log(accessToken);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
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
                alt=""
            />
            <div>
                <VerifyUserEmailLink email={user.email} />
                <button
                    onClick={GoogleAuth}
                >
                    Google
                </button>

            </div>

        </div>
    )
}

export default Home
