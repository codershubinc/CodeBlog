import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'

function EditBtn({ post }) {

    const [isEdit, setIsEdit] = useState(false)
    return (
        <div>

            <Button bgColor="transparent  " className="mr-3 rounded-full">
                <img src="   https://cdn-icons-png.flaticon.com/512/10426/10426353.png "
                    className="w-6 h-6 invert"
                    onClick={() => setIsEdit(!isEdit)}
                    alt="" />
            </Button>

            {isEdit ?
                <div className="gap-3  absolute e bg-slate-900 flex flex-col  p-2 rounded-3xl justify-center items-center text-center w-max z-50">
                    <Link to={`/edit-post/${post.$id}`}>
                        <button
                            className="mr-3 rounded-full p-1 w-full  bg-slate-700 "
                        >
                            Edit
                        </button>
                    </Link>
                    <button
                        className="mr-3 rounded-full p-1 w-full  bg-slate-700 "
                        onClick={() => setIsEdit(false)}
                    >Cancel</button>
                </div> : '  ' }


        </div>
    )
}

export default EditBtn
