import React from 'react'
import appwriteService from '../../appwriteConfig/DbConfig'

function Like({ post, setPost, isLiked, userid }) {
    const updateLike = () => {

        if (isLiked === false) {
            appwriteService.updatePost(
                post.$id,
                {
                    like: post.like + 1,
                    likeId: [...post.likeId, userid]
                }).then(() => {
                    setPost({ ...post, like: post.like + 1, likeId: [...post.likeId, userid] })


                })
        }
        if (isLiked === true) {

            appwriteService.updatePost(
                post.$id,
                {
                    like: post.like - 1,
                    likeId: post.likeId.filter((id) => id !== userid)
                }).then(() => {
                    setPost({ ...post, like: post.like - 1, likeId: post.likeId.filter((id) => id !== userid) })

                })

        }
    }
    return (
        <button
            onClick={updateLike}
            className='text-white text-sm font-bold py-2 px-4 rounded-full flex justify-center items-center text-center
        gap-2'
        >
            <img src={
                isLiked ?
                    "https://cdn-icons-png.flaticon.com/512/739/739231.png "
                    :
                    "https://cdn-icons-png.flaticon.com/512/126/126473.png "
            } alt=""
                className="w-6 h-6 invert" />
            {post.like}
        </button>
    )
}

export default Like
