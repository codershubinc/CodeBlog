import React, { useEffect, useState } from 'react'
import authService from '../../../appwriteConfig/auth';
import userDbConfig from '../../../appwriteConfig/UserDbConfig';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

function AvatarChange() {
    const user = useSelector((state) => state.auth.userData.user)
    const { register, handleSubmit } = useForm();
    const [showForm, setShowForm] = useState(false)
    const [isAvatarUpdating, setIsAvatarUpdating] = useState(false)
    const [Status, setStatus] = useState('')
    const navigate = useNavigate() 

    const onSubmit = async (data) => {
        // Check if file size is greater than 5MB
        if (data.avatar[0] && data.avatar[0].size > 5 * 1024 * 1024) { // 2MB in bytes
            alert('File size should not exceed 5MB');
            return; // Stop the form submission
        }
        setIsAvatarUpdating(true)
        setStatus('Checking Your Data...')
        // const prefUpdate = await authService.updatePrefs({ 'avatar': '' });
        // console.log('prefUpdate', prefUpdate);
        setStatus('Uploading your avatar...')
        const file = await userDbConfig.uploadFile(data.avatar[0]);
        console.log('file', file);
        if (file) {
            setStatus('Updating your avatar...')
            const fileId = file.$id;
            if (user.prefs.avatar !== undefined) {
                const deleteFile = await userDbConfig.deleteFile(user.prefs.avatar);
                console.log('deleteFile', deleteFile);
            }
            const updatePrefs = await authService.updatePrefs({ 'avatar': fileId });
            setStatus('Done! ...Avatar Will be updated across your device soon.')
            console.log('updatePrefs', updatePrefs);
            navigate('/dispatch')
        }

        setIsAvatarUpdating(false)
        setShowForm(false)
    };
    return (
        <div>
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
                    <div>{isAvatarUpdating ? <div className='flex'>
                        {Status}
                        <div className='w-6 h-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]' >
                        </div>
                    </div> : ''}</div>
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
        </div>
    )
}

export default AvatarChange   