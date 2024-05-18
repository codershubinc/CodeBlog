// import React, { useEffect, useState } from 'react'
// import authService from '../auth'
// import { useNavigate } from 'react-router-dom'
// import Loading from '../../components/comp/Loading'
// Assuming you're using React and React Router
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function VerifyUser() {
 
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get('access_token'); // Extract the access token

    useEffect(() => {
        // Make an API request to Google's user profile endpoint
        // Fetch user information, including the user ID
        // Create an account for the user in your system (if needed)
        console.log(accessToken);
        console.log(queryParams);
        console.log('User authenticated with Google!');
    }, [accessToken]);

    return (
        <div>
            <p>Processing Google authentication...</p>
            {/* You can add loading spinners or other UI elements here */}
        </div>
    );





    //     const urlParams = new URLSearchParams(window.location.search)
    //     const userId = (urlParams.get('userId'))
    //     const secret = urlParams.get('secret')
    //     const navigation = useNavigate()
    //     const [error, setError] = useState('')
    //     const [loading, setLoading] = useState(false)
    //     const verify = async () => {
    //         setLoading(true)
    //         console.log('VerifyUser ::', userId, secret)
    //         try {
    //             const ver = await authService.updateVerification(userId, secret)

    //             if (ver) {
    //                 console.log('result ::', result)
    //                 setLoading(false)
    //                 navigation('/dashboard')
    //             }
    //         } catch (error) {
    //             setLoading(false)
    //             setError(error.message)

    //         }
    //     }
    //     return (
    //         <div>

    //             <button onClick={verify}>Verify</button>
    //             <Loading
    //                 loading={loading}
    //                 Status='Verifying User ...'
    //                 className='fixed flex gap-3 top-[50%] left-auto bg-black w-max p-5 rounded-3xl text-white  z-10'
    //             />
    //             <p
    //                 className='text-red-500 text-xl'
    //             >
    //                 {error}
    //             </p>
    //         </div>
    //     )
}

export default VerifyUser
