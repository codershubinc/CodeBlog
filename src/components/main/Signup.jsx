import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from '../main/index'
import { useDispatch } from 'react-redux'
import authService from '../../appwriteConfig/auth'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }



    return (
        <section className=' dark:bg-[#212627] text-black bg-[#c6c7d8]  dark:text-white w-full h-[100vh] flex justify-center items-center text-center -z-30 ' >
            <div className=' flex flex-col justify-center items-center dark:bg-[#303637]  bg-slate-600 inherit  m-2  top-[90px] rounded-2xl   bg-contain lg:bg-right    bg-no-repeat  bg-blend-difference '>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Have account already?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Log In
                    </Link>
                </p>

                <form onSubmit={handleSubmit(create)}>
                    {error && <p className='text-red-500 text-center'>{error}</p>}

                    <Input
                        className="  bg-slate-900  opacity-90 text-lg  w-full focus:outline-none   border border-solid border-black text-center m-2 rounded-3xl z-10 text-white "
                        label="Name : "
                        type="text"
                        placeholder=" Enter your  Name ........"
                        {...register("name")}
                    />


                    <Input
                        className="  bg-slate-900  opacity-90 text-lg  w-full focus:outline-none   border border-solid border-black text-center m-2 rounded-3xl z-10 text-white "
                        label="Email : "
                        type="email"
                        placeholder=" Enter your  email ........"
                        {...register("email")}
                    />


                    <Input
                        className="  bg-slate-900  opacity-90 text-lg  w-full focus:outline-none   border border-solid border-black text-center m-2 rounded-3xl z-10 text-white "
                        label="Password : "
                        type="password"
                        placeholder=" Enter your  password ........"
                        {...register("password")}
                    />

                    <Button
                        children={"Login"}
                        type='submit'
                        className="  bg-gray-900  hover:bg-gray-700 opacity-90 text-lg  w-[25%] px-4 focus:outline-none   border border-solid border-black text-center m-2 rounded-3xl z-10 text-white "
                    />

                </form>
            </div>
        </section>
    )
}

export default Signup
