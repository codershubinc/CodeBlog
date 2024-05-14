import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import authService from '../../appwriteConfig/auth';


function UserDashBoard() {
    const user = useSelector((state) => state.auth.userData.user);
    const [imgUrl, setImgUrl] = useState('')

    useEffect(() => {
        authService.createEmailOtpSession().then((data) => (setImgUrl(data.href)))
    }, [])



    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-3xl font-bold text-center mb-4">User Dashboard</h1>
            <img src={imgUrl} alt="" />
        </div>
    );
}

export default UserDashBoard;