import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import authService from '../../appwriteConfig/auth';
import Input from './Input';
import { useForm } from 'react-hook-form';
import dbConfig from '../../appwriteConfig/DbConfig';

function UserDashBoard() {
    const user = useSelector((state) => state.auth.userData.user) || [];
    const [imgUrl, setImgUrl] = useState('');
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    useEffect(() => {
        console.log('user', user);
        // for user avatar
        if (user != []) {
            if (user && user.prefs.avatar !== undefined) {
                setImgUrl(dbConfig.getFilePreview(user.prefs.avatar));
            } else {
                authService.createEmailOtpSession(user && user.name).then((data) => setImgUrl(data.href));
            }
        }
        console.log(user && user.prefs);
    }, []);

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const prefUpdate = await authService.updatePrefs({ 'avatar': '' });
        console.log('prefUpdate', prefUpdate);
        const file = await dbConfig.uploadFile(data.avatar[0]);
        console.log('file', file);
        if (file) {
            const fileId = file.$id;
            if (user.prefs.avatar !== undefined) {
                const deleteFile = await dbConfig.deleteFile(user.prefs.avatar);
                console.log('deleteFile', deleteFile);
            }
            const updatePrefs = await authService.updatePrefs({ 'avatar': fileId });
            console.log('updatePrefs', updatePrefs);
            setImgUrl(dbConfig.getFilePreview(fileId));
        }
    };

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
            <button
                onClick={() => setShowForm(!showForm)}
                className="mb-4"
            >
                {showForm ? 'Cancel' : 'Change Avatar'}
            </button>
            {showForm && ( // Conditionally render the form
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col justify-center items-center"
                >
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4 text-white bg-[#212121] w-auto"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("avatar", { required: true })}
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
            {/* ..................... ............................................................................... */}
        </div>
    );
}

export default UserDashBoard;