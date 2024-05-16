import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import authService from '../../appwriteConfig/auth'; 
import userDbConfig from '../../appwriteConfig/UserDbConfig';
import AvatarChange  from './userActions/AvatarChange'

function UserDashBoard() {
    const user = useSelector((state) => state.auth.userData.user) || [];
    const  [imgUrl, setImgUrl] =useState( user && user.prefs.avatar ? userDbConfig.getFilePreview(user.prefs.avatar) : null)

    const [downloadFileUrl, setDownloadFileUrl] = useState('')


    useEffect(() => {
        console.log('userDashboard called useEffect');
        console.log('user', user);
        // for user avatar
        if (user != []) {
            if (user && user.prefs.avatar !== undefined) {
                setImgUrl(userDbConfig.getFilePreview(user.prefs.avatar));
            } else {
                authService.createEmailOtpSession(user && user.name).then((data) => setImgUrl(data.href));
            }
        }
        console.log(user && user.prefs);
    }, [user.prefs.avatar]);



    const DownloadFile = (fileId) => {
        console.log('fileId', fileId);
        const downloadFile = userDbConfig.downloadFile(fileId);
        setDownloadFileUrl(downloadFile.href)


    }

    return (
        <div className="w-full h-full mx-auto p-5 bg-black">
            <h1 className="text-3xl font-bold text-center mb-4">Welcome , {user ? user.name : 'User'}</h1>
            <img
                src={imgUrl}
                alt=""
                className='w-[300px] h-[300px] object-cover rounded-full mx-auto mb-4 border-white border-2 border-solid'
            />
            {/* ..................................................................................--------------------- */}
            {/* // Avatar upload form  */}
            <AvatarChange />

            <button
                onClick={() => DownloadFile(user.prefs.avatar)}
            >
                Download
            </button>
            {downloadFileUrl != '' ? <a href={downloadFileUrl} target="_blank" >Download Here</a> : ''}

            {/* ..................... ............................................................................... */}
        </div>
    );
}

export default UserDashBoard;