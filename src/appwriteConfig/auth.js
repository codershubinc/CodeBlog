import { Account, Client, ID } from 'appwrite'
import conf from '../conf/conf'

export class AuthService {
    clint = new Client()
    account;

    constructor() {
        this.clint
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId) // Your project ID
        this.account = new Account(this.clint)
    }

    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (userAccount) {
                //call the login method 
                await this.account.createEmailSession(email, password)
            } else return userAccount
        } catch (error) {
            console.log('Appwrite error :: creating account ', error);
            return error
        }
    }

    async login(email, password) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log('Appwrite error :: login ', error);
        }
        return error
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log('Appwrite error :: get current user ');
            return error
        }
    }
    async logout() {
        try {
            return await this.account.deleteSessions('current')
        } catch (error) {
            console.log('Appwrite error :: logout ', error);
        }
        return error
    }
    async updatePrefs({ }) {
        try {
            return await this.account.updatePrefs({})
        } catch (error) {
            console.log('Appwrite error :: update prefs ', error);
            return error
        }
    }

    async getPrefs() {
        try {
            return await this.account.getPrefs()
        } catch (error) {
            console.log('Appwrite error :: get prefs ', error);
            return error
        }
    }


}

const authService = new AuthService()
export default authService