import React from 'react'
import { NavLink } from 'react-router-dom'

function BottomNav() {
    return (

        // width: 67px;
        // top: 62px;
        // margin-left: 6px;
        // border-radius: 10px;
        <div
            className=' BottomNavBar lg:w-[67px] sm:w-full h-max p-1 ml-[6px] rounded-[10px] fixed sm:bottom-0  top-[62px] left-0 flex-col bg-[#212121] text-white   justify-between items-center  hidden transition-all '
        >
            <div>
                <NavLink
                    to={`/`}
                    className={
                        ({ isActive }) => ` ${isActive ? ' p-1 px-2 bg-slate-800 rounded-xl ' : ' p-1 px-2 bg-slate-950 rounded-xl'}
                        flex flex-col gap-1 items-center`
                    }

                >
                    <img src="  https://www.flaticon.com/svg/vstatic/svg/3917/3917743.svg?token=exp=1715518152~hmac=bc965fa51a00f3eaa549fe93de9bb2a1  "
                        className='w-6 h-6 invert'

                        alt="" />
                    <p>
                        Home
                    </p>
                </NavLink>
            </div>
            <div>
                <NavLink
                    to={`/all-posts`}
                    className={
                        ({ isActive }) => ` ${isActive ? ' p-1 px-2 bg-slate-800 rounded-xl ' : ' p-1 px-2 bg-slate-950 rounded-xl'}
                        flex flex-col gap-1 items-center`
                    }

                >
                    <img src="  https://www.flaticon.com/svg/vstatic/svg/3914/3914422.svg?token=exp=1715525908~hmac=9e9987b90f9f76ca2df650e0f76cf104    "
                        className='w-6 h-6 invert'

                        alt="" />
                    <p>
                        All posts
                    </p>
                </NavLink>
            </div>
            <div>
                <NavLink
                    to={`/`}
                    className={
                        ({ isActive }) => ` ${isActive ? ' p-1 px-2 bg-slate-800 rounded-xl ' : ' p-1 px-2 bg-slate-950 rounded-xl'}
                        flex flex-col gap-1 items-center`
                    }

                >
                    <img src="  https://www.flaticon.com/svg/vstatic/svg/3917/3917743.svg?token=exp=1715518152~hmac=bc965fa51a00f3eaa549fe93de9bb2a1  "
                        className='w-6 h-6 invert'

                        alt="" />
                    <p>
                        Home
                    </p>
                </NavLink>
            </div>
            <div>
                <NavLink
                    to={`/`}
                    className={
                        ({ isActive }) => ` ${isActive ? ' p-1 px-2 bg-slate-800 rounded-xl ' : ' p-1 px-2 bg-slate-950 rounded-xl'}
                        flex flex-col gap-1 items-center`
                    }

                >
                    <img src="  https://www.flaticon.com/svg/vstatic/svg/3917/3917743.svg?token=exp=1715518152~hmac=bc965fa51a00f3eaa549fe93de9bb2a1  "
                        className='w-6 h-6 invert'

                        alt="" />
                    <p>
                        Home
                    </p>
                </NavLink>
            </div>
            <div>
                <NavLink
                    to={`/`}
                    className={
                        ({ isActive }) => ` ${isActive ? ' p-1 px-2 bg-slate-800 rounded-xl ' : ' p-1 px-2 bg-slate-950 rounded-xl'}
                        flex flex-col gap-1 items-center`
                    }

                >
                    <img src="  https://www.flaticon.com/svg/vstatic/svg/3917/3917743.svg?token=exp=1715518152~hmac=bc965fa51a00f3eaa549fe93de9bb2a1  "
                        className='w-6 h-6 invert'

                        alt="" />
                    <p>
                        Home
                    </p>
                </NavLink>
            </div>
        </div>
    )
}

export default BottomNav
