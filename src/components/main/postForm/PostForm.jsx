import React, { useCallback, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../index";
import { RTE } from "../../pages/index";
import appwriteService from "../../../appwriteConfig/DbConfig"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        console.log(userData.user.$id);
        setLoading(true);
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            setLoading(true);
            const file = await appwriteService.uploadFile(data.image[0])
            console.log(file);

            if (file) {
                setLoading(true);
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userid: userData.user.$id }).then(
                    setLoading(false)
                ).then(console.log("post created"))

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value = "blog" + Date.now() + "l"

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-wrap justify-center items-center w-[-webkit-fill-available] h-max bg-black text-white flex-col lg:flex-row"
        >
            {loading ?
                <div
                    className="fixed flex gap-3 top-[50%] left-auto bg-black w-max p-5 rounded-3xl text-white  z-10">
                    Uploading Please Wait ......
                    <div
                        className="w-6 h-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" >
                    </div>
                </div> : ""}
            <div className=" px-2 w-[-webkit-fill-available] ">
                <Input
                    label="Title :"
                    placeholder="..Enter a Title ........"
                    className="mb-4 text-white bg-[#212121] w-auto"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 text-white bg-[#212121] w-auto"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 text-white bg-[#212121]  w-auto"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                <RTE
                    label="Content :"
                    name="content"
                    className="mb-4 text-white bg-[#212121] w-auto"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Select
                    options={["active", "inactive"]}
                    label="Status : "
                    className="mb-4 text-white bg-[#212121] w-auto"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
                {post && (
                    <div className="  mb-4">
                        <p>
                            image of this post
                        </p>
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
            </div>
        </form>
    );
}
