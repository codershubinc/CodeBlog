import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from '../main/index'
import { useDispatch } from 'react-redux'
import authService from '../../appwriteConfig/auth'
import { useForm } from 'react-hook-form'
import Loading from '../comp/Loading'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    // const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)

    const create = async (data) => {
        setLoading(true)
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                // if (userData) dispatch(login(userData));
                setLoading(false)
                navigate("/dispatch")
            }
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }



    return (
        <section className='dark:bg-[#212627] text-black bg-[#c6c7d8] dark:text-white w-full h-screen flex justify-center items-center text-center'>
            <div className='flex flex-col justify-center items-center dark:bg-[#303637] bg-slate-600 p-4 md:p-8 lg:p-12 rounded-2xl w-full max-w-md mx-2'>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold leading-tight">Sign up for an account</h2>
                <p className="mt-2 text-sm md:text-base text-black/60">
                    Have an account already?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Log In
                    </Link>
                </p>

                <form onSubmit={handleSubmit(create)} className="w-full">
                    {error && <p className='text-red-500 text-center'>{error}</p>}
                    <Input
                        className="bg-slate-900 opacity-90 text-base md:text-lg w-full focus:outline-none border border-solid border-black text-center m-2 rounded-3xl z-10 text-white"
                        label="Name : "
                        type="text"
                        placeholder="Enter your name ........"
                        {...register("name")}
                    />

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
                        children={loading ? <>
                            <Loading
                                loading={loading}
                                Status=''
                                className='mx-auto'
                            /></> : 'Signup'}
                        type='submit'
                        className="bg-gray-900 hover:bg-gray-700 opacity-90 text-base md:text-lg w-full md:w-3/4 lg:w-1/2 px-4 py-2 focus:outline-none border border-solid border-black text-center m-2 rounded-3xl z-10 text-white"
                    />
                </form>
            </div>
        </section>
    )
}

export default Signup
