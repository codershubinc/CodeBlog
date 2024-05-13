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

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
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

    async CreateEmailAuthSession() {

        try {
            return await this.account.createMagicURLSession(
                ID.unique(),
                'ingleswapnil2004@gmail.com',
                'http://localhost:5173/*'


            )
        } catch (error) {
            console.log(error);
        }

    }

    async 


}

const authService = new AuthService()
export default authService