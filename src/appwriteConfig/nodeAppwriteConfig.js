import { Client, Users } from 'node-appwrite';
import conf from '../conf/conf';

class ndAppwrite {
    constructor() { }

    client = new Client()
        .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(conf.appwriteProjectId)
        .setKey(conf.appwriteApiKey);

    users = new Users(this.client);

    async getUserDetails(userId) {
        try {
            return await this.users.get(userId)
        } catch (error) {
            console.log("Appwrite serive :: getUserDetails :: error", error);
            return null
        }
    }
}

const NDAppwrite = new ndAppwrite();
export default NDAppwrite;