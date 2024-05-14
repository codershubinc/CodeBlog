import React, { useState } from 'react'
import authService from '../../appwriteConfig/auth'

function Home() {
    const [imgUrl, setImgUrl] = useState('')

    const CreateEmailSession = () => {
        authService.createEmailOtpSession()
            .then((data) => setImgUrl(data))
            
    }

    return (
        <div className='flex flex-col'>
            Please Login
            <button
                onClick={CreateEmailSession}
            >
                Create email session
            </button>
            <button
                onClick={() => authService.logout()}
            >
                Logout
            </button>
            <button>
                
            </button>
            <img 
            src={imgUrl.href} 
            className='w-[100px] h-[100px]'
            alt="" />

        </div>
    )
}

export default Home
