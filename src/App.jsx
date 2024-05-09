import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwriteConfig/auth'
import { login, logout } from '../store/features/isAuthSlice'


function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  //updating State in store that isAuth is logged in or not

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ user }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return loading ? null :
    <div className=" w-full h-screen  ">
      hi
    </div>
}

export default App
