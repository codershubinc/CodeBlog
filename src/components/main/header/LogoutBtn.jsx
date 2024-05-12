import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../../appwriteConfig/auth'
import { logout as Logout } from '../../../../store/features/isAuthSlice'
import { setPrefs } from '../../../../store/features/prefSlice'


function LogoutBtn() {

    const dispatch = useDispatch()
    const logout = () => {
        authService.logout()
            .then(() => {
                dispatch(Logout())
                dispatch(setPrefs({}))
              
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
