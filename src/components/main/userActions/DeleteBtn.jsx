import React, { useState } from 'react'
import appwriteService from '../../../appwriteConfig/DbConfig'
import Button from '../../main/Button'
import { useNavigate } from 'react-router-dom'


function DeleteBtn({ post }) {
    const [isDelete, setIsDelete] = useState(false)
    const navigate = useNavigate()

    const deletePost = () => {

        appwriteService.deletePost(post.$id).then(
            (status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/post");
                }
            })
    };


    return (
        <div>
            <Button
                bgColor="transparent  "
                className="mr-3 rounded-full"
                onClick={() => setIsDelete(!isDelete)}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/10065/10065140.png "
                    alt=""
                    className='w-6 h-6 invert'
                />
            </Button>
            {isDelete ?
                <div className="gap-3  absolute bg-slate-900 flex flex-col  p-2 rounded-3xl w-max  z-50">
                    <button
                        className="mr-3 rounded-full p-1  bg-red-500"
                        onClick={deletePost}
                    >Confirm Delete</button>
                    <button
                        className="mr-3 rounded-full p-1  bg-red-500"
                        onClick={() => setIsDelete(false)}
                    >Cancel</button>
                </div> : ''}
        </div>
    )
}

export default DeleteBtn
