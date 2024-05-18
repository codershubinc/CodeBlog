import React, { useEffect, useState } from 'react'
import authService from '../auth';

function VerifyUserEmailLink(email) {
    console.log(email)
    const [error, setError] = useState('')
    const mobileSession = async () => {
        try {
            const data = await authService.emailOTP(
                email)
            console.log(data);
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div>
            <button
                onClick={mobileSession}
            >
                mobileSession
            </button>
            <p
                className='text-red-500'
            >
                {error}
            </p>
        </div>
    )
}

export default VerifyUserEmailLink
