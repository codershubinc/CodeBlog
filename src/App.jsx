import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwriteConfig/auth'
import { login, logout } from '../store/features/isAuthSlice'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components/pages/index'
import { BottomNav } from './components/main/index'


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
    console.log('dispatch called');
  }, [])


  return loading ? null : <>
    <div className=" w-full h-screen bg-black text-white mb-11">
      <Header />
      <main   >
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  </>
}

export default App
