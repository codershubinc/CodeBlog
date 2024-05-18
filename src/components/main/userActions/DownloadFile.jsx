import React, { useState } from 'react'
import userDbConfig from '../../../appwriteConfig/UserDbConfig';
import dbConfig from '../../../appwriteConfig/DbConfig';

function DownloadFile({ fileId, fileFrom = 'posts' }) {
    const [downloadFileUrl, setDownloadFileUrl] = useState('')
    const DownloadFile = () => {
        console.log('fileId', fileId);
        console.log('fileFrom', fileFrom);
        setDownloadFileUrl(
            fileFrom === 'posts'
                ?
                dbConfig.downloadFile(fileId)
                :
                userDbConfig.downloadFile(fileId)
        )



    }
    return (
        <div>
            <button
                onClick={() => DownloadFile(fileId)}
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/7268/7268609.png"
                    alt=""
                    className='w-6 h-6 invert'
                />
            </button>
            {downloadFileUrl != '' ?
                <div
                    className='gap-3  absolute e bg-slate-900 flex flex-col  p-2 rounded-3xl justify-center items-center text-center w-max z-50'
                >
                    <a
                        href={downloadFileUrl}
                        target="_blank"
                        className='text-blue-500'
                        

                    >
                        Download Here'
                    </a>
                    <button
                        onClick={() => setDownloadFileUrl('')}
                    >
                        Cancel
                    </button>
                </div> : ''}

        </div>
    )
}

export default DownloadFile
