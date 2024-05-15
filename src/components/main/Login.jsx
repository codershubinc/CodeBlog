import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as AuthLogin } from '../../../store/features/isAuthSlice'
import { Button, Input } from '../main/index'
import { useDispatch } from 'react-redux'
import authService from '../../appwriteConfig/auth'
import { useForm } from 'react-hook-form'


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false) 

    const login = async (data) => {
        setLoading(true)
        console.log(data);
        setError('')
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                // if (userData) dispatch(AuthLogin({userData}))
                //     console.log(' login dispatch called')
                // console.log(userData);
                navigate('/dispatch')
                setLoading(false)
            }

        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }


    return (
        <section className='dark:bg-[#212627] text-black bg-[#c6c7d8] dark:text-white w-full h-screen flex justify-center items-center text-center'>
            <div className='flex flex-col justify-center items-center dark:bg-[#303637] bg-slate-600 p-4 md:p-8 lg:p-12 rounded-2xl w-full max-w-md mx-2'>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-sm md:text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                <form onSubmit={handleSubmit(login)} className="w-full">
                    {error && <p className='text-red-500 text-center'>{error}</p>}
                    <Input
                        className="bg-slate-900 opacity-90 text-base md:text-lg w-full focus:outline-none border border-solid border-black text-center m-2 rounded-3xl z-10 text-white"
                        label="Email : "
                        type="email"
                        placeholder="Enter your email ........"
                        {...register("email")}
                    />

                    <Input
                        className="bg-slate-900 opacity-90 text-base md:text-lg w-full focus:outline-none border border-solid border-black text-center m-2 rounded-3xl z-10 text-white"
                        label="Password : "
                        type="password"
                        placeholder="Enter your password ........"
                        {...register("password")}
                    />

                    <Button
                        children={loading ? <div className='w-6 h-6 mx-auto animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'></div> : 'Login'}
                        type='submit'
                        className="bg-gray-900 hover:bg-gray-700 opacity-90 text-base md:text-lg w-full md:w-3/4 lg:w-1/2 px-4 py-2 focus:outline-none border border-solid border-black text-center m-2 rounded-3xl z-10 text-white"
                    />
                </form>
            </div>
        </section>
    )
}

export default Login
