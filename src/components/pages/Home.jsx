import React from 'react'
import authService from '../../appwriteConfig/auth'

function Home() {

    const CreateEmailSession = () => {
        authService.CreateEmailAuthSession()
            .then((data) => console.log(data))
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

        </div>
    )
}

export default Home
