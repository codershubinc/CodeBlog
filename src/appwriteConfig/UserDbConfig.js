import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class UserDbConfig {

    clint = new Client()
    databases
    bucket

    constructor() {
        this.clint
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId) // Your project ID
        this.databases = new Databases(this.clint)
        this.bucket = new Storage(this.clint)
    }
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteAvatarBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteAvatarBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteAvatarBucketId,
            fileId
        )
    }
    downloadFile(fileId) {
        return this.bucket.getFileDownload(
            conf.appwriteAvatarBucketId,
            fileId
        )
    }


}

const userDbConfig = new UserDbConfig()

export default userDbConfig