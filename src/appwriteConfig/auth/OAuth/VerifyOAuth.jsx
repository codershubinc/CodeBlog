import React from 'react'
import authService from '../../auth';

function VerifyOAuth() {
    const fetchGoogleUserInfo = async (accessToken) => {
        const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }
        const result = await response.json();
        console.log(result);
    };
    const verifyOAuth = async () => {
        try {
            const data = await authService.getCurrentSession();
            console.log(data);
            fetchGoogleUserInfo(data.providerAccessToken);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <button
                onClick={verifyOAuth}
            >
                Verify OAuth
            </button>
        </div>
    )
}

export default VerifyOAuth
