import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../../appwriteConfig/auth'
import { logout as Logout } from '../../../../store/features/isAuthSlice' 
import { useNavigate } from 'react-router-dom'


function LogoutBtn() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = () => {
        authService.logout()
            .then(() => {
                dispatch(Logout())
                navigate('/login')
            })
    }


    return (
        <div>
            <button>
                <span onClick={logout}>Logout</span>
            </button>
        </div>
    )
}

export default LogoutBtn
