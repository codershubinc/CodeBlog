import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from '../../../store/features/isAuthSlice'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwriteConfig/auth'

function Dispatch() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        authService.getCurrentUser()
            .then((user) => {
                console.log('user at dispatch', user)
                if (user) {
                    dispatch(login({ user }))
                } else {
                    dispatch(logout())
                }
            })
        console.log('dispatch at dispatch called');
        navigate('/dashboard')
    }, [])
    return (
        <div>
        </div>
    )
}

export default Dispatch
