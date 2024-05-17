import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwriteConfig/DbConfig";
import { Button, Container } from "../main/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Like from './userActions/Like'
import DeleteBtn from './userActions/DeleteBtn'
import Loading from '../comp/Loading'
import DownloadFile from "./userActions/DownloadFile";
import EditBtn from "./userActions/EditeBtn";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)
    const [error, setError] = useState()


    const isAuthor = post && userData ? post.userid === userData.user.$id : false;
    const isLiked = post && userData ? post.likeId.includes(userData.user.$id) : false;
    const userid = userData && userData.user ? userData.user.$id : null;
    console.log('isLiked', isLiked);     //Use it for debugging
    console.log('userid', userid);
    console.log('post', post);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else setError(post);
            });
        } else navigate("/");
    }, [slug, navigate]);


    return post ? (
        <div className="  w-full  h-full bg-black text-white flex flex-col   justify-center items-center  ">
            {error ? <div>{error}</div> : ''}
            <Container>
                <div className="w-[90%] flex justify-center items-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-[90%]"
                    />
                    {/* back button */}
                    <Button
                        onClick={() => navigate(-1)}
                        bgColor="bg-gray-500"
                        className="fixed top-[63px] left-[10px] rounded-full z-50 bg-blue-500 text-black"
                    >
                        <img
                            src="   https://cdn-icons-png.flaticon.com/512/318/318477.png "
                            alt=""
                            className="w-8 h-8 rounded-full   border border-solid border-white hover:scale-105 "
                        />
                    </Button>

                </div>
                <div className="flex justify-evenly  w-full mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                        <p>
                            {post.userid}
                        </p>
                    </div>


                </div>
                <div
                    className="  w-[90%]  flex   justify-center items-center mb-4 relative border rounded-xl p-2"
                >
                    <Like
                        post={post}
                        setPost={setPost}
                        userid={userid}
                    />
                    <DownloadFile
                        fileId={post.featuredImage}
                    />

                    {isAuthor ? (
                        <div
                            className="flex  gap-1 ml-2"
                        >
                           <EditBtn post={post} />
                            <DeleteBtn post={post} />
                        </div>
                    ) : ''}

                </div>
                <div className="    ">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : <div>
        <h3>    <Loading
            loading={true}
            Status='Loading Post ...'
            className='w-fit mx-auto'
        /> </h3>
    </div >;
}
