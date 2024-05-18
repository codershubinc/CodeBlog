import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from '../store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, Login, Signup, } from './components/pages/index.js'
import { AllPosts, PostForm, ViewPost, AuthLayout, EditPost, UserDashBoard, Dispatch, VerifyUser } from './components/main/index.js'
import GetByUrl from './components/pages/GetByUrl.jsx'
import VerifyOAuth from './appwriteConfig/auth/OAuth/VerifyOAuth.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      }, {
        path: '/dispatch',
        element: <Dispatch />
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false} >
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/post",
        element: (
          <AuthLayout authentication >
            {" "}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication={true}>

            <PostForm />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <ViewPost />,
      }, {
        path: '/dashboard',
        element: (
          <AuthLayout authentication>
            {" "}
            <UserDashBoard />
          </AuthLayout>
        ),

      }, {
        path: "*",
        element: <GetByUrl />
      }, {
        path: '/verification',
        element: <VerifyUser />
      }, {
        path: 'verifyOAuth',
        element: <VerifyOAuth />
      }
    ],
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider >

  </React.StrictMode>,
)
