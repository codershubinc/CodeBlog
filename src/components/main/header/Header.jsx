import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'

function Header() {

    const BottomNavBar = ()=>{
        document.querySelector('.BottomNavBar').classList.toggle('hidden')
    }
    return (

        <header className='sticky top-0 mb-12 dark:bg-black bg-slate-300 w-full h-14 transition-all  z-10 '>
            <div className='flex    p-1 rounded-lg dark:bg-[#212121] bg-slate-300 justify-between'>
                <div className='flex'>
                    <div className='flex justify-center items-center px-1  '>
                        {/* sideBarBtn */}
                    </div>
                    <img src="https://www.flaticon.com/svg/vstatic/svg/3917/3917762.svg?token=exp=1715431056~hmac=7536e05423e2985e386af2622ca04395"
                        className='h-10 w-10 mx-2  ' 
                        onClick={BottomNavBar}
                        alt="" />
                    <div className='flex border-solid border-2 border-gray-700  p-1 rounded-2xl gap-1 '>
                        <h2 className='text-3xl dark:text-white  font-["jersey-25"]  '>Web App</h2>
                    </div>
                </div>
                <div className='flex gap-1 justify-center text-center items-center p-1 '>
                    {/*  <LogoutBtn /> */}
                    <Link
                        to="/add-post"
                        className="text-3xl dark:text-white  font-['jersey-25']  "
                    >
                        addPost
                    </Link>
                </div>
            </div>
            {/* Here is a sidebar containing links */}
        </header>
    )
}

export default Header
