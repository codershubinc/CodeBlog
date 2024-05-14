import React, { useEffect, useState } from 'react'
import dbConfig from '../../appwriteConfig/DbConfig'
import parse from "html-react-parser";
import { Link } from 'react-router-dom';
import Like from './Like';
import { useSelector } from 'react-redux';


function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const userData = useSelector((state) => state.auth.userData);
    const userid = userData && userData.user ? userData.user.$id : null;
    const isLiked = false
    console.log('isLiked', isLiked);
    console.log('userid', userid);
    console.log(userData);
    useEffect(() => {
        dbConfig.getPosts([]).then((posts) => {
            if (posts) {
                console.log(posts);
                setLoading(false)
                setPosts(posts.documents)

            } else {
                setLoading(false)
                return <div className='w-full h-full'>Something went wrong ... Please try again</div>
            }
        })
    }, [])

    return (
        <div
            className='h-max   w-full bg-[#000000] flex flex-col flex-wrap justify-center items-center  '
        >
            {loading ?
                <div
                    className="fixed flex gap-3 top-[50%] left-auto bg-black w-max p-5 rounded-3xl text-white  z-10">
                    <p className=' text-center text-lg'>Loading...</p>
                    <div
                        className="w-6 h-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" >
                    </div>
                </div> : ""}
            {posts && posts.map((post) => (

                <div
                    key={post.$id}
                >
                    <Link
                        to={`/post/${post.$id}`}

                    >
                        <div
                            key={post.$id}
                            className='flex flex-col justify-center items-center py-5 gap-2 m-2 rounded-3xl  border-2 border-solid border-[#212121]  lg:w-fit w-[-webkit-fill-available] bg-[#151a21]  text-white shadow-sm shadow-white' >
                            <h1 className='text-3xl font-bold'>
                                {post.title}
                            </h1>
                            <img
                                src={dbConfig.getFilePreview(post.featuredImage)}
                                alt=""
                                className=' sm:w-[80%]   lg:h-[70vh] lg:w-[40vw]  rounded-3xl object-cover '
                            />
                            <p className=' text-left'>
                                Post by : {post.userName}
                            </p>

                            <p
                                className='text-left cursor-pointer hover:underline text-blue-600'
                            >
                                Click to read post
                            </p>
                        </div>
                    </Link>
                    {/* <Like
                        post={post}
                        setPost={setPosts}
                        isLiked={isLiked}
                        userid={userid}
                    /> */}
                </div>
            ))}
        </div>
    )
}

export default AllPosts
