import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwriteConfig/DbConfig";
import { Button, Container } from "../main/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [error, setError] = useState()

    const isAuthor = post && userData ? post.userid === userData.user.$id : false;
    const isLiked = post ? post.likeId.includes(userData.user.$id) : false;
    const userid = userData.user.$id
    console.log('isLiked', isLiked);




    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {

                if (post) setPost(post);
                else setError(post);
            });
        } else navigate("/");

    }, [slug, navigate]);




    const deletePost = () => {

        appwriteService.deletePost(post.$id).then(
            (status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/all-posts");
                }
            })
    };

    const updateLike = () => {

        if (isLiked === false) {
            appwriteService.updatePost(
                post.$id,
                {
                    like: post.like + 1,
                    likeId: [...post.likeId, userid]
                }).then(() => {
                    setPost({ ...post, like: post.like + 1, likeId: [...post.likeId, userid] })

                    console.log('liked', post);
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
                    console.log('unLiked', post);
                })

        }
    }


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
                    <div>
                        {isAuthor ? (
                            <div  >
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        ) : ''}
                    </div>

                </div>
                <button
                    onClick={updateLike}
                    className={`text-white  hover:bg-blue-700 text-sm font-bold py-2 px-4 rounded-full`
                        + (isLiked ? " bg-red-500" : "bg-blue-500")}
                >
                    like {post.like}
                </button>
                <div className="    ">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
