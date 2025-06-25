import { Account, Avatars, Client, ID } from 'appwrite'
import conf from '../conf/conf'

export class AuthService {
    clint = new Client()
    account;

    constructor() {
        this.clint
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId) // Your project ID
        this.account = new Account(this.clint)
        this.avatar = new Avatars(this.clint)
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
    async updatePrefs({ ...pref }) {
        try {
            return await this.account.updatePrefs({ ...pref })
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
            throw error
        }

    }

    async createEmailOtpSession(init = '') {
        try {
            return this.avatar.getInitials(
                init
                // ID.unique(),
                // 'ingleswapnil2004@gmail.com'
            )
        } catch (error) {
            console.log(error);
        }
    }
    async createMobileSession() {
        try {
            return await this.account.createVerification(
                'http://localhost:5173/verification'
            )
        } catch (error) {
            throw error
        }
    }
    async updateVerification(
        userId,
        secrete
    ) {
        try {

            return await this.account.updateVerification(
                userId,
                secrete
            )

        } catch (error) {
            throw error
        }
    }
    googleAccVerify() {
        try {
            return this.account.createOAuth2Session(
                'google',
                'http://localhost:5173/verifyOAuth',
                'http://localhost:5173/login'
            )

        } catch (error) {
            throw error
        }
    }
    async getCurrentSession() {
        try {
            return await this.account.getSession('current')
        } catch (error) {
            throw error
        }
    }
    async emailOTP(email) {
        try {
            console.log("email at email otp ", email)
            return await this.account.createRecovery(
                String(email),

                'http://localhost:5173/verifyUserEmailLink'
            )
        } catch (error) {
            throw error
        }
    }



}

const authService = new AuthService()
export default authService